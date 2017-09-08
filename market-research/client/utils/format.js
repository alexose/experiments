module.exports = {
  date : formatDate,
  size : formatSize,
}

// via http://stackoverflow.com/questions/5416920
function formatDate() {
  var date = new Date();

  var month = date.getMonth() + 1;
  var day = date.getDate();

  month = (month < 10 ? "0" : "") + month;
  day = (day < 10 ? "0" : "") + day;

  var str = month + "-" + day + "-" + date.getFullYear();

  return str;
}

// via http://stackoverflow.com/questions/10420352
function formatSize(bytes, si) {
  var thresh = si ? 1000 : 1024;
  if(Math.abs(bytes) < thresh) {
      return bytes + ' B';
  }
  var units = si
      ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
      : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
  var u = -1;
  do {
      bytes /= thresh;
      ++u;
  } while(Math.abs(bytes) >= thresh && u < units.length - 1);
  return bytes.toFixed(1)+' '+units[u];
}
