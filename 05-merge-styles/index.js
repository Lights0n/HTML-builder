const fs = require('fs');
const path = require('path');
let writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), { flags: 'w' });

fs.readdir(path.join(__dirname, "./styles"), { withFileTypes: true }, function showFiles(err, directody) {

  if (err) { console.log(err); 
  }else {

    directody.forEach(async file => {

      if (file.isFile() && path.extname(file.name) == ".css") {

        fs.readFile(path.join(__dirname, `./styles/${file.name}`), 'utf-8', async function (err, data) {

          if (err) {
            console.log(err);
          }else {
            // 
            writeStream.write(data)
          }
        });
      }

    })

  }
})


