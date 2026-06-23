const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');

const fixes = {
  467: 'https://github.com/E-Tech070/calm-pressure-clothing',
  512: 'https://github.com/E-Tech070/janelle-luxury-hairs',
  540: 'https://github.com/E-Tech070/janelle-luxury-hairs',
  565: 'https://github.com/E-Tech070/glownest-skincare',
  593: 'https://github.com/E-Tech070/glownest-skincare',
  618: 'https://github.com/E-Tech070/emperors-kitchen',
  647: 'https://github.com/E-Tech070/emperors-kitchen',
  672: 'https://github.com/E-Tech070/emperor-airline',
  701: 'https://github.com/E-Tech070/emperor-airline',
  726: 'https://github.com/E-Tech070/emperor-boost',
  755: 'https://github.com/E-Tech070/emperor-boost',
  780: 'https://github.com/E-Tech070/random-color-generator',
  808: 'https://github.com/E-Tech070/random-color-generator',
  829: 'https://github.com/E-Tech070/dice-roller',
  857: 'https://github.com/E-Tech070/dice-roller',
};

Object.entries(fixes).forEach(([lineNum, newUrl]) => {
  const index = parseInt(lineNum) - 1;
  lines[index] = lines[index].replace(
    'https://github.com/E-Tech070',
    newUrl
  );
});

fs.writeFileSync('index.html', lines.join('\n'), 'utf8');
console.log('GitHub links fixed!');