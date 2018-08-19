const pos = require('pos');
const jsonata = require('jsonata');
const sharp = require('sharp');
const crypto = require('crypto');
const mkdirp = require('mkdirp');
const videoshow = require('videoshow')
const sieve = require('sievejs');

if (process.argv.length < 3) {
  console.log('Usage:');
  process.exit();
} else {
  begin(process.argv.slice(2, process.argv.length));  
}

function begin(arr){

  // Create directory for images
  const hash = crypto.createHash('md5').update(arr.join(' ')).digest('hex');
  mkdirp(`./images/${hash}`);

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
  const promises = searches.map((d, i) => new Promise((resolve, reject) => {
    getImage(d, i, resolve, reject);
  }));
  const images = [];
  Promise
    .all(promises)
    .then(results => {
      // Resize all images and write to disk
      results.forEach(results => {
        
        const image = `./images/${hash}/${results.i}.jpg`;
        images.push({
          path: image,
          caption: words[results.i] 
        });

        sharp(results.buffer)
          .resize(320, 240)
          .max()
          .toFormat('jpeg')
          .toFile(image)
      });

      makeSlideshow(hash, images);
    });
}

async function makeSlideshow(hash, images){
  
  var videoOptions = {
    fps: 25,
    loop: 5, // seconds
    transition: true,
    transitionDuration: 1, // seconds
    videoBitrate: 1024,
    videoCodec: 'libx264',
    size: '320x?',
    audioBitrate: '128k',
    audioChannels: 2,
    format: 'mp4',
    pixelFormat: 'yuv420p'
  }

  videoshow(images, videoOptions)
    .audio('song.mp3')
    .save(`./videos/${hash}.mp4`)
    .on('start', function (command) {
      console.log('ffmpeg process started:', command)
    })
    .on('error', function (err, stdout, stderr) {
      console.error('Error:', err)
      console.error('ffmpeg stderr:', stderr)
    })
    .on('end', function (output) {
      console.error('Video created in:', output)
    })
}


// TODO: caching
async function getImage(term, i, cb, reject){
  sieve({
    url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch={{term}}&srnamespace=6&srinfo=totalhits%7Csuggestion&srlimit=10&generator=images&titles=Wikipedia%3APublic_domain&gimlimit=1',
    data: {term},
    selector: '.title'
  }, result => {
    const title = result[0];
    sieve({
      url: 'https://commons.wikimedia.org/w/api.php?action=query&titles={{title}}&prop=imageinfo&iiprop=url&format=json',
      data: {title},
      selector: '.url',
    }, result => {
      console.log(result[1][0]);
      sieve({
        url: result[1][0]
      }, result => {
        cb({i, buffer: result}); 
      });
    });
  });
}
