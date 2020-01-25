const fs = require('fs');

export function doingJSON(path) {
  try {
    let jsonString = fs.readFileSync(path)
    let obj = JSON.parse(jsonString);
    let res = {};
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
        if (!res[obj[key]])
          res[obj[key]] = keyPath;
      }
    }
  }
}