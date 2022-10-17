const express = require('express');

const app = express();
//serve static files
app.use(express.static('public'));

app.use(express.urlencoded({"extended": true }));
app.use(express.json());

app.use(express.static("entites"));

app.get('/', function (req, res) {
    res.send('Hello World')
});



app.get('/hello', function (req, res) {
    const name = req.query.name;
    console.log(req.query);
    res.send('Hello ' + name + "!");
});

const WORD = {
    '네': 'yes',
    '아니요': 'no'
}

app.get('/words', (req, res) => {
    res.json(WORD);
});



app.post('/addwords', (req, res) => {
    const word = req.body.word;
    const def = req.body.def;


    if (word in WORD) {
        return res.status(409).send('Word already exists');
    }
    WORD[word] = def;
    res.send("added words");
    return res.status(201).json({ [word]: def });
})


app.listen(3000, function () {
    console.log("Listening on port 3000");
})