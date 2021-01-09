const fs = require('fs');
const { join } = require('path');
const cheerio = require('cheerio');
const $ = cheerio.load(fs.readFileSync('./template.html'));

const main = () => {
  const container = $('#tree');
  const baseDir = container.attr('base');
  const absdir = container.attr('dir');
  const dir = getAllFiles(absdir);

  const out = makeUL(dir, baseDir);
  container.append(out);
  fs.writeFileSync('index.html', $.html());
};

const only_ending = (str) => str.split('/')[str.split('/').length - 1];
const abs_fix = (href, baseDir) =>
  href
    .split('/')
    .slice(baseDir.split('/').length - 1)
    .join('/');

const $$ = (tag = 'div', str = '') => $(`<${tag}>${str}</${tag}>`);

const makeUL = (dir, baseDir = '.') => {
  let main = $$('ul');
  for (path in dir) {
    let li = $$('li');
    let a = $$('a');
    if (dir[path] == path) {
      li.append(a.attr('href', abs_fix(path, baseDir)).text(only_ending(path)));
      main.append(li);
    } else {
      li.text(only_ending(path));
      li.append(makeUL(dir[path], baseDir));
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
