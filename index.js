const fs = require('fs');

function doingJSON(path) {
  try {
    let jsonString = fs.readFileSync(path)
    let obj = JSON.parse(jsonString);
    let res = new Set();
    getPathAndValues(obj, res);
    return res;
  } catch (err) {
    console.log('Cant read this file', err);
    throw err;
  }
}

function getPathAndValues(obj, res, prevKey) {
  if (!obj || typeof (obj) != "object") {
    return;
  }
  for (let key in obj) {
    let keyPath = prevKey ? [...prevKey] : [];
    keyPath.push(key);
    if (typeof (obj[key]) == 'object') {
      getPathAndValues(obj[key], res, keyPath);
    } else {
      if (typeof (obj[key]) == 'string') {
        if (!res.has(obj[key]))
          res.add([keyPath, obj[key]]);
      }
    }
  }
}

module.exports = {
  doingJSON,
};