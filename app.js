const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');
const fs = require('fs');
const opn = require('opn');
const app = express();
const PORT = 3000;
const TOKEN = '6491363940:AAFlnuI1YfyPPP9yPgLO6goKo8Hl67qIPi8';
const chatid = '6030095504';
const bot = new TelegramBot(TOKEN, { polling: false });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


app.post('/submit', (req, res) => {
    let data = req.body;
    let date = new Date();

    let msg = `Замовллення на сайті: ${date.toLocaleString()} | ${JSON.stringify(data)}\n`;

    fs.appendFile(`orders.txt`, msg, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Замовлення збережено`)
        }
    })
    res.send(data);
})

app.post('/sendproduct', (req, res) => {
    const data = req.body;
    console.log(data);
    bot.sendMessage(chatid, `Name: ${data.name}, Price: ${data.price}`);
    res.sendStatus(200); 
});

app.listen(PORT, () => {
    console.log(`Server work on port: ${PORT}`);
    opn(`http://localhost:${PORT}`);
})




