import fs from 'node:fs';

const iconFolder = 'src/assets/icons';
const outputFile = 'src/types/icon.d.ts';

fs.readdir(iconFolder, (error, files) => {
  const iconList = `type Icon = ${files.map(file => `'${file.replace('.svg', '')}'`).join(' |\n  ')};\n`;

  fs.writeFile(
    outputFile,
    `// Don't edit this file. Use the NPM script 'build:icons' instead.\n${iconList}`,
    () => console.error
  );
});

