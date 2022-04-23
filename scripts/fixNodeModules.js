const os = require('os');
const path = require('path');
const child_process = require('child_process');
const fs = require('fs');

const root = path.resolve(__dirname, '..');
console.log(root);

const options = {
  cwd: process.cwd(),
  env: process.env,
  stdio: 'inherit',
  encoding: 'utf-8',
};

if (os.type() === 'Windows_NT') {
  options.shell = true
}


let modules = ["native-base"];
let fileEndings = [".tsx", ".ts"];

console.log("Fix modules before building")

for(let module of modules){
  const brokenLib = path.resolve(root, 'node_modules', module);
  console.log("Fix module: "+module)
  handleDir(brokenLib);
}


function handleDir(dirFile){
  let files = fs.readdirSync(dirFile);
  files.forEach(function (fileName, index) {
    const file = path.resolve(dirFile, fileName);

    // Stat the file to see if we have a file or dir
    try{
      const stat = fs.statSync(file);
      if(stat.isFile()){
        // Make one pass and make the file complete
        for(let ending of fileEndings){
          if(file.endsWith(ending)){
            //console.log(file);
            const data = fs.readFileSync(file).toString().split("\n");
            if(!data[0].includes("@ts-nocheck")){
              data.splice(0, 0, "// @ts-nocheck" );
              const text = data.join("\n");
              fs.writeFileSync(file, text);
            }
          }
        }
      } else {
        handleDir(file);
      }
    } catch (err){
      // no such file or directory, sta
    }

  });
}


process.exitCode = 0;
