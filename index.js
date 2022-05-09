const hexValues = new Map ([
  ["A",10], ["B",11], ["C",12], ["D",13], ["E",14], ["F",15]
])

function hexToDecimals(inputHex) {
  //Make sure to store as a string
  let hexAsString = inputHex.toString();
  let decimalArray = [];
  let msg = "";
  //loop for each character in hex string
  for (let i=0; i < hexAsString.length; i++) {
    //check if hex character matches a key in the A-F map
    if (hexValues.has(hexAsString[i])) {
      //if A-F, add the mapped value of it to an array
      decimalArray.push(hexValues.get(hexAsString[i]));
      msg += (hexAsString[i] + "=" + hexValues.get(hexAsString[i]));
      msg += ' ';
    } else {
      //else, 0-9 values go straight into the array
      decimalArray.push(Number(hexAsString[i]));
    }    
  }
  //return an array of individual decimal values
  console.log(msg);
  console.log("So we have: " + decimalArray);
  return decimalArray;
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

function arrayToBinary(decimals) {
  let finalBinary = "";

  for (let i = 0; i < decimals.length; i++) {
    let decimal = decimals[i];
    let fourBitBinary = decimalToBinary(decimal);
    
    //console.log("\nTake number " + decimal);
    finalBinary += fourBitBinary.join("");    
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

//store user input
let user = prompt("Enter any hex value");
let decimals = hexToDecimals(user);

console.log("\nLet's calculate the binary values of each below.")

decimals.forEach(x => console.log("\ntake number " + x + explain(x)));

console.log("\nRead the 1's and 0's from bottom to top to get the binary of each number.\nThen we can put the binaries together to get your hex value as a binary, finally!");

let hexAsBinary = arrayToBinary(decimals);
let hexAsDecimal = arrayToDecimal(decimals);

console.log("\nYour Hex value as a binary is:\n" + hexAsBinary);
console.log("\nYour Hex value as a decimal is:\n" + hexAsDecimal);


