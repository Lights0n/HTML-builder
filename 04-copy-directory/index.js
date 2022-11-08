const fs = require('fs');
const path = require('path');
const mkdir = require('node:fs/promises')
const { copyFile, readdir } = require('node:fs/promises')
function copyDir() {

  async function makeDirectory() {
    // create dorectory
    const projectFolder = path.join(__dirname, 'files-copy');
    const dirCreation = await fs.mkdir(projectFolder, { recursive: true }, (err) => {

      if (err) { console.log(err); }
    });
  }
  makeDirectory().catch(console.error);

  fs.readdir(path.join(__dirname, "./files"), { withFileTypes: true }, function showFiles(err, directory) {

    if (err) {
      console.log(err);
    }
    directory.forEach(file => {

      fs.copyFile(path.join(__dirname, 'files',file.name), path.join(__dirname, 'files-copy', file.name), (err) => {
        if (err) {
          console.log("Oops! An Error Occured:", err);
        }
      });
    })
  })

}

copyDir()
