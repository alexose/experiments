const pos = require('pos');
const jsonata = require('jsonata');
const sharp = require('sharp');
const crypto = require('crypto');
const mkdirp = require('mkdirp');
const videoshow = require('videoshow')
const request = require('superagent');
const Unsplash = require('unsplash-js').default;
const fetch = require('isomorphic-fetch');
const toJson = require('unsplash-js').toJson;

var unsplash;
try {
  const config = require('./config');
  unsplash = new Unsplash({ ...config });
} catch(e) {
  console.log('Could not find config.');
  console.log('cp config.js.example config.js');
  process.exit(1);
}

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
  const searches = [[]];
  const words = [[]];
  let index = 0;
  tagged.forEach((arr, i) => {
    const part = arr[1].substr(0,2);
    words[index].push(arr[0]);
    if (part === 'NN' && searches[index].length < 3) {
      searches[index].push(strip(arr[0]));
    }
    // if ((part === 'VB' || part === 'IN' || part === 'CC') && words[index].length > 4){
    if (
      ( part === '.' )
      || ( part === '!' )
      || ( part === ':' )
      || (( part === ',' ) && words[index].length > 8)
      || i === tagged.length-1
    ){
      if (i < tagged.length-1) {
        words.push([]);
        searches.push([]);
      }

      // If there's no nouns in the slide, just use all the text?
      if (!searches[index].length || searches[index][0].length < 3){
        const text = smoosh(words[index]);
        searches[index].push(text.length > 3 ? text : 'blah');
      }
      index++;
    }
  });

  const slides = words.map(arr => smoosh(arr));

  promiseSerial(
    searches,
    (d, i) => () => {
      console.log(`Getting ${i+1} of ${searches.length}... "${d.join(' ')}"`);
      return getImage(d, i);
    },
    (results) => {

      // Resize all images and write to disk
      const images = [];
      results.forEach(result => {
        const image = `./images/${hash}/${result.i}.jpg`;
        images.push({
          path: image,
          caption: slides[result.i]
        });

        sharp(result.buffer)
          .resize(640, 480)
          .min()
          .crop()
          .toFormat('jpeg')
          .toFile(image)
      });

      setTimeout(() => {
        console.log('Creating slideshow...');
        makeSlideshow(hash, images)
      }, 2000);
    }
  );
}

function smoosh(arr){
  let str = arr.join(' ');
  str = str.split(' ,').join(',');
  str = str.split(' .').join('.');
  str = str.split(' !').join('!');
  str = str.split(' -').join('-');
  str = str.split(' \' ').join('\'');
  return str;
}

function strip(str){
  return str.replace(/[^\w\s]/gi, '')
}

async function makeSlideshow(hash, images){
  
  var videoOptions = {
    fps: 25,
    loop: 5, // seconds
    transition: true,
    transitionDuration: 1, // seconds
    videoBitrate: 1024,
    videoCodec: 'libx264',
    size: '640x?',
    audioBitrate: '128k',
    audioChannels: 2,
    subtitleStyle: {
      Fontsize: '40',
      //PrimaryColour: '16777215'
    },
    format: 'mp4',
    pixelFormat: 'yuv420p'
  }

  videoshow(images, videoOptions)
    .audio('song.mp3')
    .save(`./videos/${hash}.mp4`)
    .on('end', function (output) {
      console.error('Video created in:', output)
    })
}


// TODO: caching
async function getImage(term, i){
  return new Promise(resolve => {
    unsplash.search.photos(term.join(' '), 1)
      .then(toJson)
      .then(d => {
        request.get(d.results[0].urls.regular)
          .then(d => {
            resolve({i, buffer: d.body});
          });
      });
  });
}

// via https://hackernoon.com/7aac18c4431e
function promiseSerial(arr, step, callback) {
  const funcs = arr.map(step);

  const promiseList = funcs =>
    funcs.reduce((promise, func) =>
      promise.then(result =>
        func().then(Array.prototype.concat.bind(result))),
        Promise.resolve([]))

  return promiseList(funcs)
    .then(callback)
}
