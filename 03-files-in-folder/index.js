const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, "./secret-folder"), { withFileTypes: true }, function showFiles(err, directody) {

  if (err) {
    console.log(err);
  }

  directody.forEach(file => {

    if (file.isFile()) {

      fs.stat(path.join(__dirname, `./secret-folder/${file.name}`), (err, stats) => {
        const fileName = file.name.slice(0, file.name.length - path.extname(file.name).length)
        const fileFormat = path.extname(file.name)
        console.log(fileName, " - ", fileFormat, ' - ', stats.size + 'b');
      });

    }

  })
})
