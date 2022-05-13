function toHexChar(x) {
  let hexChars = "ABCDEF";
  if (x > 9 && x < 16) {
    x = hexChars[x - 10];
  }
  return x;
}

function decimalTo(decimal, base) {
  let numbers = [];
  
  while(Math.floor(decimal) != 0) {
    let remainder = Math.floor(decimal) % base;
    
    numbers.push(toHexChar(remainder));
    
    decimal /= base;
  }
  return numbers.reverse().join('');
}

//Export
module.exports = {
  decimalTo,
  toHexChar
};