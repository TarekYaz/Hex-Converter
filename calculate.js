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

function binaryToDecimal(binary) {
  let decimal = 0;
  let len = binary.length - 1;
  for (let i = 0; i <= len; i++) {
    decimal += binary[len-i] * (2 ** i);
  }
  return decimal;
}

function binaryToNibbles(binary) {
  let bits = binary.split("")
  
  for (let i = bits.length; i > 0; i -= 4) {
    if (i != bits.length) {
      bits.splice(i, 0, ",");
    }
  }
  return bits.join("");
  /*
  let bits = binary.split("")
  let nibble = [];
  let finalBin = [];
  //start off with leading 0's if length not divisible by 4
  if (binary.length % 4 != 0) {
    nibble = ['0', '0', '0', '0'];
    nibble.splice(0, binary.length % 4);
  }
  
  while (bits.length > 0) {
    nibble.push(bits.shift());
    if (nibble.length == 4) {
      finalBin.push(nibble.join(""));
      nibble = []
    }
  }

  return finalBin;
  */
  /*
  let bits = binary.split("");
  let nibble = [];
  let finalBin = [];
  
  while (bits.length > 0) {
    nibble.push(bits.shift());
    if (nibble.length == 4) {
      finalBin.push(nibble.join(""));
      nibble = []
    }
  }

  let lastNibble = "";
  if (nibble.length > 0) {
    lastNibble = (nibble.join("")).padStart(4,0);
    finalBin.push(lastNibble);      
  }
   
  return finalBin;  */
}

function binaryToHex(binary) {
  let nibbles = binaryToNibbles(binary).split(',');
  let finalHex = '';
  
  for (let i in nibbles) {
    let decimal = binaryToDecimal(nibbles[i]);
    console.log(decimal);
    finalHex += toHexChar(decimal);
  }

  return finalHex
}

function hexToArray(hex) {
  let hexValues = new Map ([
  ["A",10], ["B",11], ["C",12], 
  ["D",13], ["E",14], ["F",15] ]);
  
  let hexString = hex.toString().toUpperCase();
  let decimalArray = [];
  
  for (let hexChar of hexString) {
    if (hexValues.has(hexChar)) {      
      decimalArray.push(hexValues.get(hexChar));
    } else {      
      decimalArray.push(Number(hexChar));
    }
  }
  
  return decimalArray;
}

function hexToBinary(hex) {
  let decimals = hexToArray(hex);
  let finalBinary = "";

  for (let decimal of decimals) {
    let fourBitBinary = digitToBinary(decimal);
    
    finalBinary += fourBitBinary.join('');    
  }
  return finalBinary;
}

function hexToDecimal(hex) {
  let decimals = hexToArray(hex);
  let finalDecimal = 0;
  //for each: value * (16^i). Making sure to go right to left in Array
  for (let i = 0; i < decimals.length; i++) {
    let decimal = parseInt(decimals[decimals.length-1-i]);
    finalDecimal += decimal * (16 ** i);
  }
  return finalDecimal;
}

function digitToBinary(decimal) {
  let binary = ['0', '0', '0', '0'];  

  for (let i = 3; i >= 0; i--) {
    let remainder = Math.floor(decimal) % 2;
   //if a remainder exists, flip the bit. Print the solution.
    if (remainder > 0) {
      binary[i] = '1';
    }
    //Halve the stored decimal for the next calculation
    decimal /= 2;
  }
  return binary;
}

//Export
module.exports = {
  toHexChar,
  decimalTo,
  binaryToDecimal,
  binaryToNibbles,
  binaryToHex,
  hexToArray,
  hexToBinary,
  hexToDecimal
};