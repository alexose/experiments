const unsplash = require('unsplash-js');
const pos = require('pos');
const request = require('superagent');
const jsonata = require('jsonata');

if (process.argv.length < 2) {
  console.log('Usage:');
  process.exit();
} else {
  begin(process.argv.slice(2, process.argv.length));  
}

function begin(arr){
  
  // via https://stackoverflow.com/questions/21321044
  const lexed = new pos.Lexer().lex(arr.join(' '));
  const tagged = new pos.Tagger().tag(lexed);
  
  // Extract verb combos
  const words = [[]];
  const searches = [[]];
  let index = 0;
  tagged.forEach(arr => {
    const part = arr[1].substr(0,2);
    words[index].push(arr[0]);
    if (part === 'NN' && searches[index].length < 3) {
      searches[index].push(arr[0]);
    }
    // if ((part === 'VB' || part === 'IN' || part === 'CC') && words[index].length > 4){
    if ((part === 'NN' || part === 'IN' || part === 'CC') && words[index].length > 6){
      words.push([]);
      searches.push([]);

      // If there's no nouns in the slide, just use all the text?
      if (!searches[index].length){
        searches[index].push(words[index].join(' '));
      }
      index++;
    }
  });

  const slides = words.map(arr => arr.join(' '));
  const promises = searches.map(d => new Promise((resolve, reject) => {
    getImage(d, resolve);
  }));

  Promise
    .all(promises)
    .then(results => {
      console.log(results);
    });
}


// TODO: caching
async function getImage(term, cb){
  request
    .get(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=${term}&srnamespace=6&srinfo=totalhits%7Csuggestion&srlimit=10&generator=images&titles=Wikipedia%3APublic_domain&gimlimit=1`)
    .then(res => {
      const files = jsonata('**.title').evaluate(res.body);
      request
        .get(`https://commons.wikimedia.org/w/api.php?action=query&titles=${files[1]}&prop=imageinfo&iiprop=url&format=json`)
        .then(res => {
          const url = jsonata('**.url').evaluate(res.body);
          request
            .get(url)
            .then(res => cb(res.text))
        });
    });
}
