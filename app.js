const express = require('express')
var bodyParser = require('body-parser')
const app = express()
var cors = require('cors')
const fs = require('fs')
const port = 3000
var urlencodedParser = bodyParser.json()
var infilepath = 'in.txt'
var outfilepath = 'out.txt'


app.use(cors())
function capitalize(index, txt) {
    return txt.substring(0, index) + txt[0].toUpperCase() + txt.substring(index + 1);
}

function writetofile(url, data){

    fs.appendFile(url, data, (err) => {
        if (err) {
            console.error(err)
            return
        }
    })
}


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/', urlencodedParser, (req, res) => {
    let text = String(req.body.text).split('\n')
    let serializedtext = []

    text.forEach(element => {
        writetofile(infilepath, element + '\n');
        serializedtext.push(capitalize(0, element))
    })

    serializedtext = serializedtext.sort()
    serializedtext.forEach(currentItem => {
        writetofile(outfilepath, currentItem + '\n');
    });

    console.log(serializedtext)

})

app.get('/getbefore', (req, res) =>{
    console.log("/getbefore request getted")
    fs.readFile(infilepath, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        res.send(data)
      });
    
})

app.get('/getafter', (req, res) =>{
    console.log("/getafter request getted")
    fs.readFile(outfilepath, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        res.send(data)
      });
    
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})