// 
const fs = require('fs');
const path = require('path')
const readableStream = fs.createReadStream(path.join(__dirname, './text.txt'), 'utf-8');
readableStream.on('data', function (data) {
  console.log(data)});
