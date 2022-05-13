function hexToArray(inputHex) {
  let hexValues = new Map ([
  ["A",10], ["B",11], ["C",12], 
  ["D",13], ["E",14], ["F",15] ]);
  
  let hexString = inputHex;
  let decimalArray = [];
  let msg = "";
  
  for (let i=0; i < hexString.length; i++) {
    let x = hexString[i];
    
    if (hexValues.has(x)) {      
      decimalArray.push(hexValues.get(x));
      msg += (x + "=" + hexValues.get(x));
      msg += ' ';
    } else {      
      decimalArray.push(Number(x));
    }    
  }  
  console.log(msg);
  console.log("So we have: " + decimalArray);
  return decimalArray;
}

function arrayToBinary(decimals) {
  let finalBinary = "";

  for (let i = 0; i < decimals.length; i++) {
    let decimal = decimals[i];
    let fourBitBinary = decimalToBinary(decimal);
    
    finalBinary += fourBitBinary.join('');    
  }
  return finalBinary;
}

function arrayToDecimal(decimals) {
  let finalDecimal = 0;
  //for each: value * (16^i). Making sure to go right to left in Array
  for (let i = 0; i < decimals.length; i++) {
    let decimal = parseInt(decimals[decimals.length-1-i]);
    finalDecimal += decimal * (16 ** i);
  }
  return finalDecimal;
}

function decimalToBinary(decimal) {
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

function explain(decimal) {
  let msg = "";
  let binary = [];
  for (let i = 3; i >= 0; i--) {
    let roundDown = Math.floor(decimal);
    let remainder = roundDown % 2;
   //same function as decimalsToBinary but logs calculations
    if (remainder > 0) {
      binary.push('1');
      msg += ("\n1 since: " + roundDown 
                  + " / 2 = " + Math.floor(roundDown / 2) 
                  + " R " + remainder);
    } else {
      binary.push('0');
      msg += ("\n0 since: " + roundDown 
                  + " / 2 = " + Math.floor(roundDown / 2) 
                  + " R " + remainder);
    }
    decimal /= 2;
  }
  binary.reverse();
  return msg;
}

function chooseConverter() {
  let options = ["hex", "decimal", "binary"];
  let choice = prompt("Choose between 1-3");
  try {
    if (typeof options[choice-1] == "undefined") throw "Invalid";
  } catch (err) {
    console.log("Error: " + err + " value chosen");
    chooseConverter();
  }

  return options[choice-1];
  

  /*
  let list = ["Hex", "Decimal", "Binary"];
  
  console.log("Convert:\n" + "(1) Hex (2) Decimal (3) Binary");
  
  let c1 = Number(prompt("Pick a number"));
  
  console.log("\nto:\n" + "(1) Hex (2) Decimal (3) Binary");
  
  let c2 = Number(prompt("Pick a number"));
    
  if (c1 != c2 && Math.min(c1,c2) > 0 && Math.max(c1,c2) < 4) {
    console.log(list[c1 - 1] + " to " + list[c2 - 1]);  
  } else {
    console.log("\nPlease pick a valid converter\n");
    chooseConverter();
  }
  */
}

function removeLeadingZeros(value) {
  let x = value.split('');
   
  while (x[0] == '0') {
    x.shift();
  }
  
  return x.join("");
}

//----------------------------------------------------------

let calculate = require("./calculate.js");

console.log("What are you converting from?\n");
console.log("(1) Hex (2) Decimal (3) Binary\n");
let choice = chooseConverter();
let msg = "Enter a " + choice + " value";
let user = removeLeadingZeros(prompt(msg));

if (choice == "decimal") {
  //DECIMAL TO BINARY AND HEX
  console.log("DECIMAL TO HEX:" + calculate.decimalTo(user, 16));
  console.log("DECIMAL TO BINARY:" + calculate.decimalTo(user, 2));
}

if (choice == "hex") {
  //HEX TO BINARY AND DECIMAL
console.log("\nHEX TO DEC/BIN\n");
let decimals = hexToArray(user);

console.log("\nLet's calculate the binary values of each below.")

decimals.forEach(x => console.log("\ntake number " + x + explain(x)));

console.log("\nRead the 1's and 0's from bottom to top to get the binary of each number.\nThen we can put the binaries together to get your hex value as a binary, finally!");

let hexAsBinary = arrayToBinary(decimals);
let hexAsDecimal = arrayToDecimal(decimals);

console.log("\nYour Hex value as a binary is:\n" + hexAsBinary);
console.log("\nYour Hex value as a decimal is:\n" + hexAsDecimal);
}

