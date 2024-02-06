const RED = 0.2126;
const GREEN = 0.7152;
const BLUE = 0.0722;
const GAMMA = 2.4;

function luminance(r, g, b) {
  var a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA);
  });
  return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
}

function contrast(rgb1, rgb2) {
  var lum1 = luminance(...hexToRgbArr(rgb1));
  var lum2 = luminance(...hexToRgbArr(rgb2));
  var brightest = Math.max(lum1, lum2);
  var darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

function hexToRgbArr(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}

// console.log(contrast("#ffffff", "#ffff00")); // 1.074 for yellow
// console.log(contrast("#ffffff", "#ffffff")); // 8.592 for blue

export default contrast;
