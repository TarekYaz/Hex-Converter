function explain(decimal) {
  let msg = "";
  let binary = [];
  for (let i = 3; i >= 0; i--) {
    let roundDown = Math.floor(decimal);
    let answer = Math.floor(roundDown / 2);
    let remainder = roundDown % 2;
   
    if (remainder > 0) {
      binary.push('1');
      msg += ("\n1 since: " + roundDown + " / 2 = " 
              + answer + " R " + remainder);
    } else {
      binary.push('0');
      msg += ("\n0 since: " + roundDown + " / 2 = " 
              + answer + " R " + remainder);
    }
    decimal /= 2;
  }
  binary.reverse();
  return msg;
}

function chooseConverter() {
  let options = ["hex", "decimal", "binary"];

  do {
    
    var choice = options[prompt("Choose between 1-3")-1];
      
    try {
      if (typeof choice == "undefined") throw "Invalid";
    } catch (err) {
      console.log("Error: " + err + " value chosen");
    }
    
  } while (typeof choice == "undefined");
  
  return choice;
}

function removeLeadingZeros(value) {
  let x = value.split('');

  if(value != 0) {
    while (x[0] == '0') {
      x.shift();
    }
  }
  
  return x.join("");
}

//----------------------------------------------------------

let calculator = require("./calculate.js");

console.log("What are you converting from?\n");
console.log("(1) Hex (2) Decimal (3) Binary\n");
let choice = chooseConverter();
let msg = "Enter a " + choice + " value";

do {
  var value = removeLeadingZeros(prompt(msg));
  var validation = /^[a-f0-9]+$/i;  
} while (!validation.test(value));


if (choice == "hex") {
  //solution
  console.log("\nHEX TO BINARY:\n" + calculator.hexToBinary(value));
  console.log("\nHEX TO DECIMAL:\n" + calculator.hexToDecimal(value));
  //working out
  console.log("\nEXPLANATION:\nEach digit as a decimal: " + calculator.hexToArray(value));
  
  console.log("\nLet's calculate the binary values of each below, \nstarting with the least significant figure.");
    
  let decimals = calculator.hexToArray(value);
  decimals.reverse();
  decimals.forEach(x => console.log("\ntake number " + x + explain(x)));
  
  console.log("\nRead the remainders of each calculation from bottom to top to get your binary.");

}

//Work In Progress
if (choice == "decimal") {
  //DECIMAL TO BINARY AND HEX
  console.log("DECIMAL TO HEX: " + calculator.decimalTo(value, 16));
  console.log("DECIMAL TO BINARY: " + calculator.decimalTo(value, 2));
}

//Work In Progress
if (choice == "binary") { 
  console.log("BINARY TO DECIMAL: " + calculator.binaryToDecimal(value));
  console.log(calculator.binaryToNibbles(value).split(",").toString());
  console.log(calculator.binaryToHex(value));
}

