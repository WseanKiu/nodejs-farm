// ref: https://devhints.io/es6 
// Exports -> aka: module.exports.mymethod = ··· 
// es6 -> export function mymethod () { ··· }

module.exports = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTREINTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  
  if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

  return output;
}