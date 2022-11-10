const fs = require('fs');
const path = require('path');
const mkdir = require('node:fs/promises')
const { copyFile, readdir } = require('node:fs/promises')
const projectFolder = path.join(__dirname, 'files-copy');
const folder = path.join(__dirname, 'files');
async function copyDir() {

  await fs.stat(projectFolder, async function (err) {
    // если папка есть
    if (!err) {
      console.log('Ё Надо удалить и создать!');

      await fs.readdir(projectFolder, { withFileTypes: true }, function showFiles(err, directory) {
        if (err) {
          console.log(err);
        }
        for (let file of directory) {
          fs.unlink(path.join(projectFolder, file.name), (err) => {
            if (err) {
              console.log(err);
            }
          });
        }

      })
      // await fs.rmdir(projectFolder, (err) => {
      //   if (err) console.log(err);;
      // });



    }
    else {
      console.log('Heh');
    }
    /* console.log('НЯМА'); */
    async function makeDirectory() {
      // create dorectory
      const dirCreation = await fs.mkdir(projectFolder, { recursive: true }, (err) => {

        if (err) { console.log(err); }
      });
    }
    await makeDirectory().catch(console.error);

    fs.readdir(path.join(__dirname, "./files"), { withFileTypes: true }, function showFiles(err, directory) {

      if (err) {
        console.log(err);
      }
      directory.forEach(file => {

        fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name), (err) => {
          if (err) {
            console.log("Oops! An Error Occured:", err);
          }
        });
      })
    })

  });

}

copyDir()
