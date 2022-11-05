const fs = require('fs');
const path = require('path');
const mkdir = require('node:fs/promises')
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
      console.log(file.name);
      console.log(path.join(__dirname, 'files-copy'));
      // TODO its all about true pathes
      // https://www.itsolutionstuff.com/post/how-to-copy-file-to-another-directory-in-node-jsexample.html
      try {
        fs.copyFile(path.join(__dirname, file.name.toString()), path.join(__dirname, 'files-copy'), (err) => {
          if (err) {
            throw err
          }
        })
        console.log('SUCCESS');
      }
      catch {
        console.log('The file could not be copied');
      }
      // fs.mkdir(file.name, path.join(__dirname, 'files-copy'), (err) => { });
      /* if (file.isFile()) {
        console.log(file.name);
      } */

    })
  })

}

copyDir()
