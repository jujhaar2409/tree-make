const fs = require('fs');
const { join } = require('path');
const cheerio = require('cheerio');
const $ = cheerio.load(fs.readFileSync('./template.html'));

const main = () => {
  const dir = getAllFiles('./hello');
  const container = $('#tree');

  const out = makeUL(dir);
  container.append(out);
  fs.writeFileSync('index.html', $.html());
};

const $$ = (tag = 'div', str = '') => $(`<${tag}>${str}</${tag}>`);

const makeUL = (dir) => {
  let main = $$('ul');
  for (path in dir) {
    let li = $$('li');
    let a = $$('a');
    if (dir[path] == path) {
      li.append(a.attr('href', path).text(path));
      main.append(li);
    } else {
      li.text(path);
      li.append(makeUL(dir[path]));
      main.append(li);
    }
  }
  return main;
};

const printdir = (dir, ind = '', indsize = 4) => {
  for (path in dir) {
    if (dir[path] == path) {
      console.log(ind + path);
    } else {
      console.log(ind + path);
      printdir(dir[path], ind + ' '.repeat(indsize));
    }
  }
};

const isDirectory = (source) => fs.lstatSync(source).isDirectory();
const isFile = (source) => fs.lstatSync(source).isFile();

const getDirectories = (basePath) =>
  fs
    .readdirSync(basePath)
    .map((name) => join(basePath, name))
    .filter(isDirectory);

const getFiles = (basePath) =>
  fs
    .readdirSync(basePath)
    .map((name) => join(basePath, name))
    .filter(isFile);

const getAllFiles = (basePath = '.', agr = {}) => {
  const dirs = getDirectories(basePath);
  const files = getFiles(basePath);
  for (file of files) {
    agr[file] = file;
  }
  for (dir of dirs) {
    agr[dir] = {};
    getAllFiles(dir, agr[dir]);
  }
  return agr;
};

main();
