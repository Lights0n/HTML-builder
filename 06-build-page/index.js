const fs = require('fs');
const path = require('path');

async function makeDirectory() {
  // create directory
  const projectFolder = path.join(__dirname, "project-dist");
  await fs.mkdir(projectFolder, { recursive: true }, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
}
// makeDirectory().catch(console.error);

// copy to 
async function copyTemplate() {
  const { copyFile, readdir } = require('node:fs/promises');
  await fs.readdir(path.join(__dirname), { withFileTypes: true }, async function showFiles(err, directory) {

    if (err) {
      console.log(err);
      return;
    }

    await fs.copyFile(path.join(__dirname, "./template.html"), path.join(__dirname, "project-dist", "index.html"), (err) => {

      if (err) {
        console.log("Oops! An Error Occured:", err);
        return;
      }
    });

  })

}
// copyTemplate()

// replacement
const pathFileToChange = path.join(__dirname, "project-dist", "index.html")

async function replaceExes(pathFileToChange, regEX, inputInstead) {
  // const fs = require('fs').promises;
  await fs.readFile(pathFileToChange, 'utf-8', (errOuter, contents) => {
    if (errOuter) {
      return console.error(errOuter)
    }

    // Replace string occurrences
    const updated = contents.replace(regEX, inputInstead)

    // Write back to file
    fs.writeFile(pathFileToChange, updated, 'utf-8', errInner => {
      if (errInner) {
        console.log(errInner)
      }
    })
  })


}



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

              await writeStream.write(data)
            }
          });
        }

      })

    }
  })
}


async function main() {
  let stylesDirectFrom = path.join(__dirname, "./styles")
  let stylesDirectTo = path.join(__dirname, "./project-dist")
  await makeDirectory().catch(console.error);
  await copyTemplate();
  replaceExes(pathFileToChange, "{{header}}", "hohohoho")
  bundleStyles(stylesDirectFrom, stylesDirectTo, "style.css")
}
main()