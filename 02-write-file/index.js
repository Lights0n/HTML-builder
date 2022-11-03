const fs = require('fs');
const path = require('path');
const readline = require('readline');
const process = require('process');
const filename = './text.txt';

// create file
fs.open(path.join(__dirname, filename), 'a+', (err) => {
  if (err) throw err;
});

process.stdout.write('\nGreetings! Lets write some lines in ' + filename.toString().slice(2) + '\n-Input text and press Enter\n-Input "exit" or press Ctrl + C to exit\n');

function byeFrase() {
  process.stdout.write(`\nOK, we did some work together! Now lets see what we got!\nSayōnara\n`);
  process.exit();
}

// oninput eventts
process.stdin.on('data', function (data) {
  if (data.toString().trim() == 'exit') { byeFrase() };
  // write in file
  fs.writeFile(path.join(__dirname, filename), data.toString(), { flag: 'a+' }, (err) => {
    if (err) throw err;
  });
  process.stdout.write(`You whote "${data.toString().trim()}" ${filename.toString().slice(2)}\n`);
})

// oncancel events
process.on('SIGINT', () => {
  byeFrase();
});
