#!/usr/bin/env node

/* eslint-disable */
/**
 * Module dependencies.
 */

const child_process = require('child_process');
const program = require('commander');
const sgf = require("staged-git-files");

const argv = process.argv;
program
  .version('0.1.0')
  .usage('npm run pretty [-option] <value>')
  .option('-s, --staged', 'Pretty staged js & vue files')
  .option('-a, --all', 'pretty all js & vue files')
  .option('-f, --files [files]', 'pretty file by name')
  .option('-d, --directory [directory]', 'pretty files by directory')
  .on('--help', () => {
      console.log('  Examples:\n');
      console.log('     npm run pretty -- -s');
      console.log('     npm run pretty -- -a');
      console.log('     npm run pretty -- -f src/index.js');
      console.log('     npm run pretty -- -d packages/date-picker/src\n');
  })
  .parse(argv);

if (argv.length === 2) {
    program.help();
}

if(program.staged) {
    // get staged files
    // res = {
    //     filename: 'xxxxx',
    //     status: 'ADDED'
    // }
    sgf((err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        let files = res.filter((item) => {
            return item.filename.search(/.js$|.vue$/) !== -1;
        }).map((file) => {
            return file.filename;
        });
        fileStr = files.join(' ');

        console.log('Prettying staged js & vue files in the project:');
        child_process.exec(`npm run lint-fix ${fileStr}`, (err, stdout, stderr) => {
            console.log(stdout);
            console.log('Pretty by eslint commpleted\n');
        });
    });
}

if (program.all) {
    console.log('Prettying all js & vue files in the project:');
    child_process.exec(`npm run lint-fix src/**/* test/**/* packages/**/*.{js,vue} build/**/*`, (err, stdout, stderr) => {
        console.log(stdout);
        console.log('Pretty by eslint commpleted\n');
    });
}

if(program.files) {
    if (argv.length === 3) {
        program.help();
    }
    console.log('Prettying file(s) by name:');
    child_process.exec(`npm run lint-fix ${program.files}`, (err, stdout, stderr) => {
        console.log(stdout);
        console.log('Pretty by eslint commpleted\n');
    });
}

if(program.directory) {
    if (argv.length === 3) {
        program.help();
    }
    console.log('Prettying file by directory:');
    child_process.exec(`npm run lint-fix ${program.directory}/**/*.{js,vue}`, (err, stdout, stderr) => {
        console.log(stdout);
        console.log('Pretty by eslint commpleted\n');
    });
}
