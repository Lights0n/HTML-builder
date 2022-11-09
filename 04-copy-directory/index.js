const fs = require('fs');
const path = require('path');
const mkdir = require('node:fs/promises')
const { copyFile, readdir } = require('node:fs/promises')
const projectFolder = path.join(__dirname, 'files-copy');
const folder = path.join(__dirname, 'files');
function copyDir() {

  fs.stat(projectFolder, async function (err, stats) {
    // если папка есть
   /*  if (!err) {
      console.log('Ё Надо удалить и создать!');
      async function lalo() {
        await fs.readdir(projectFolder, { withFileTypes: true }, async function showFiles(err, directory) {

          if (err) {
            console.log(err);
          }
          for (let file of directory) {

            try {
              await fs.rm(path.join(projectFolder, file.name), (err) => {
                console.log(err);
              });
            } catch (err) {
              console.log(directory);
            }

          }

        })
        await fs.rmdir(projectFolder, (err) => {
          if (err) console.log(err);;
        });
      }
      await lalo();



    } */

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
