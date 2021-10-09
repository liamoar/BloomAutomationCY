const fs = require('fs');
const path = require("path");
const myFolder = path.join(__dirname + "/../", "fixtures/client/logo");
const downloadDirectory = path.join(__dirname, '..', 'downloads')
const isFirefox = (browser) => browser.family === 'firefox'

module.exports = (on, config) => {
  on("task", {
    checkFileExists(filename) {
      if (fs.existsSync(filename)) {
        return true;
      }
      return false;
    },
  });

  on("task", {
    getFilesdata(filepath) {
      return new Promise(function (resolve, reject) {
        fs.readdir(myFolder, function (err, files) {
          if (err) {
            reject("file not found", err);
          } else {
            resolve(files);
          }
        });
      });
    },
  });

  on('task', {
    renameFile(oldPath, newPath) {
      return new Promise((resolve, reject) => {
        fs.rename(oldPath, newPath, (files) => {
          if (err) {
            reject('file not found', err);
          } else {
            resolve(files);
          }
        })
      })
    }
  })
}