const fs = require('fs'); // import fs from 'fs'; FILE SYSTEM
const http = require('http');
const url = require('url');


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const productData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const productDataObj = JSON.parse(productData); // parsing json data

const replaceTemplate = (temp, product) => {
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

// SERVER
// 1 create a server
// 2 start a server
const server = http.createServer((request, response)=> {
  console.log(request.url);
  const pathName = request.url;

  // Overview Page
  if (pathName === '/' || pathName === '/overview') {

    response.writeHead(200, { 'Content-type': 'text/html' });
    const cardsHtml = productDataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    response.end(output);
    // response.end('this is the Overview');

  // Product Page
  } else if (pathName === '/product') {
    response.end('this is the product');

  // API
  } else if (pathName === '/api') {
    response.writeHead(200, { 'Content-type': 'application/json' });
    response.end(productData);
    // optimized as a sync approach above! so that it will be read only once!
    // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
    //   const productData = JSON.parse(data);
    //   console.log(productData);
    //   response.writeHead(200, { 'Content-type': 'application/json' }); // sort of Return type of the browser
    //   response.end(data);
    // });

  } else {
    response.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'Hello-world!'
    });
    response.end('<h1>page not found!</h1>');
  }

  // response.end('Hello, world!\nfrom the server.');
});

server.listen(8000, '127.0.0.1', () => {  // default for localhost port 8000 http://localhost:8000/
  console.log('Listening to requests on port 8000');
});


// FILES
// Blocking Code, Synchronous way
// const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textInput);
// const textOutput = `This is what we know about avocado: ${textInput}. \nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOutput);
// console.log('File has been created!');

// Non-blocking, but with CALLBACK HELL HAHA
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => { // LEXICAL STYLE
//   if (err) return console.log('ERROR!');
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2); // will show 2nd
//     fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//       console.log(data3); // will show 3rd
      
//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`,'utf-8', err => {
//         console.log('File has been written!'); // will run 4th
//       })
//     });
//   });
// });
// console.log('Will read file!'); // will show 1st

// const hello = 'Hello, world!';
// console.log(hello);