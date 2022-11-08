const fs = require('fs');
const path = require('path');

async function makeDirectory() {
  // create directory
  const projectFolder = path.join(__dirname, "project-dist");
  const dirCreation = await fs.mkdir(projectFolder, { recursive: true }, (err) => {
    if (err) { console.log(err); }
  });
}
makeDirectory().catch(console.error);


// copy to 
async function copyTemplate() {
  const { copyFile, readdir } = require('node:fs/promises');
  let inner = await fs.readdir(path.join(__dirname), { withFileTypes: true }, function showFiles(err, directory) {

    if (err) {
      console.log(err);
    }

    fs.copyFile(path.join(__dirname, "./template.html"), path.join(__dirname, "project-dist", "index.html"), (err) => {
      if (err) {
        console.log("Oops! An Error Occured:", err);
      }
    });

  })
  // replacement
  async function replaceExes(pathFileToChange, regEX, inputInstead) {
    const fs = require('fs').promises;
    const data = await fs.readFile(pathFileToChange, 'utf8', (err) => { console.log(err); });
    // let data = 
    const result = data.replace(regEX, inputInstead);
    await fs.writeFile(pathFileToChange, result, 'utf8');
  }
  const pathFileToChange = path.join(__dirname, "project-dist", "index.html");
  replaceExes(pathFileToChange, "{{header}}", "hohohoho");

}
copyTemplate()




// bundle styles (6)
async function bundleStyles(directFrom, directTo, bundleName) {
  let writeStream = fs.createWriteStream(path.join(directTo, bundleName), { flags: 'w' });
  fs.readdir(directFrom, { withFileTypes: true }, function showFiles(err, directody) {

    if (err) {
      console.log(err);
    } else {

      directody.forEach(async file => {

        if (file.isFile() && path.extname(file.name) == ".css") {

          fs.readFile(path.join(__dirname, `./styles/${file.name}`), 'utf-8', async function (err, data) {

            if (err) {
              console.log(err);
            } else {

              writeStream.write(data)
            }
          });
        }

      })

    }
  })
}

let stylesDirectFrom = path.join(__dirname, "./styles")
let stylesDirectTo = path.join(__dirname, "./project-dist")
bundleStyles(stylesDirectFrom, stylesDirectTo, "style.css")