const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const replacements = [
  ['Calm Pressure Clothing/index.html', 'calm-pressure-clothing/index.html'],
  ['Janelle-Luxury-Hairs/index.html', 'janelle-luxury-hairs/index.html'],
  ['Glownest skincare/index.html', 'glownest-skincare/index.html'],
  ["./Emperor'S Kitchen/index.html", './emperors-kitchen/index.html'],
  ['./Emperor Airline/index.html', './emperor-airline/index.html'],
  ['./Emperor Boost/index.html', './emperor-boost/index.html'],
  ['./random-color-generator/random_color.html', './random-color-generator/random_color.html'],
  ['./Dice Roller/index.html', './dice-roller/index.html'],
];

replacements.forEach(([find, replace]) => {
  html = html.split(find).join(replace);
});

fs.writeFileSync('index.html', html, 'utf8');
console.log('Links updated!');