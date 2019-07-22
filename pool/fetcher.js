const Path = require('path');
const {writeFile} = require('fs');
const https = require('https');
const {parse} = require('node-html-parser');

// Argument
const argumentRequest = https.request(`https://www.ets.org/gre/revised_general/prepare/analytical_writing/argument/pool`, res => {
  let documentData = "";
  res.on('data', raw => {
    documentData += raw.toString();
  })
  res.on('end', () => {
    const document = parse(documentData);
    let content = document.querySelector("#main-contents .left").innerHTML;
    content = content.replace(/<h2\>See also(.|\n)*/g, ""); // Trim tailing
    content = content.substring(content.indexOf("<div class=\"divider-50\">")); // Trim leading
    let paragraphs = content.split("<div class=\"divider-50\"><hr /><\/div>");
    paragraphs.shift();
    paragraphs = paragraphs.map((str, id) => {
      return {
        id,
        description: str.substring(0, str.indexOf("<div class=\"indented\">")),
        intent: str.match(/<div class=\"indented\"\>((.|\n)*)<\/div>/)[1],
      }
    })
    writeFile(Path.resolve(__dirname, 'argument.js'),  `module.exports = ${JSON.stringify(paragraphs, null, " ")}`, err => {
      if(err){
        console.error(`Error fetching arguments: ${err.toString()}`);
      }else{
        console.log(`Argument fetched`);
      }
    });
  })
})
argumentRequest.end();

// Issue
const issueRequest = https.request(`https://www.ets.org/gre/revised_general/prepare/analytical_writing/issue/pool`, res => {
  let documentData = "";
  res.on('data', raw => {
    documentData += raw.toString();
  })
  res.on('end', () => {
    const document = parse(documentData);
    let content = document.querySelector("#main-contents .left").innerHTML;
    content = content.replace(/<h2\>See also(.|\n)*/g, ""); // Trim tailing
    content = content.substring(content.indexOf("<div class=\"divider-50\">")); // Trim leading
    let paragraphs = content.split("<div class=\"divider-50\"><hr /><\/div>");
    paragraphs.shift();
    paragraphs = paragraphs.map((str, id) => {
      return {
        id,
        description: str.substring(0, str.indexOf("<div class=\"indented\">")),
        intent: str.match(/<div class=\"indented\"\>((.|\n)*)<\/div>/)[1],
      }
    })
    writeFile(Path.resolve(__dirname, 'issue.js'), `module.exports = ${JSON.stringify(paragraphs, null, " ")}`, err => {
      if(err){
        console.error(`Error fetching issue: ${err.toString()}`);
      }else{
        console.log(`Issue fetched`);
      }
    });
  })
})
issueRequest.end();