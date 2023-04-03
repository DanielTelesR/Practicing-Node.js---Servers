const http = require('http') // I imported the modules
const fs = require('fs')
const readline = require('readline')

const porta = 443 // Added variable to store port 443

// Created the server

const servidor = http.createServer((req, res) => {
  // Reading the HTML file
  fs.readFile('index.html', (err, file) => {
    if (err) {
      res.writeHead(400, { 'Content-type': 'text/plain' })
      res.write('Ops! Internal error on the server')
      res.end()
      return
    }
    res.writeHead(200, { 'Content-type': 'text/html' })
    res.write(file)
    // Creating the txt file
    fs.appendFile('test.txt', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque neque ante, eleifend non lacus ac,         placeorrat pttitor enim. Donec consequat ex ut bibendum dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.       Etiam ullamcorper augue vehicula, egestas lacus nec, convallis arcu. Ut lobortis eros eget odio condimentum, quis facilisis     enim pellentesque. Pellentesque convallis ex in purus elementum eleifend. Etiam ullamcorper varius nunc, ac ultricies ipsum     scelerisque nec. Sed in feugiat ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi aliquet purus in     ultrices egestas. Fusce non mollis tortor. Mauris sed turpis nisi.', (err) => {
      if (err) {
        throw err;
      }
      console.log(`File succesfully created\n`)
    })
    readFileByLine('test.txt') // Called the function to read the txt file
    res.end()
  })
})

// Function to read and log each line of the txt file on the console

async function readFileByLine(file) {
  const fileStream = fs.createReadStream(file)
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })
  for await (const line of rl) {
    console.log(line)
  }
}

// I ran the server

servidor.listen(porta, () => {
  console.log(`The server is live\n`)
})
