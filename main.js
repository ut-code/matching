const fs = require("fs");
const express = require("express");
const ejs = require("ejs");
const app = express();
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

class Deck{
    deckName;
    wordList = [];
};

class Word{
    deutsch;
    meaning;
    date = new Date();
    point = 0;

    constructor(deutsch,meaning){
        this.deutsch = deutsch;
        this.meaning = meaning;
    };
};

let deckList = [];

//test用
deckList.push(new Deck());
deckList[0].deckName = "test";
deckList[0].wordList.push(new Word("Nacht", "night"));
deckList[0].wordList.push(new Word("Morgen", "morning"));
//

// ドイツのことわざを読み込む
const readline = require('readline');
const rs = fs.createReadStream('text/proverb.txt');
const rl = readline.createInterface({ input: rs });
let proverbNo;
let rlList = [];
rl.on("line", (data) => {rlList.push(data);});

app.get("/", (request, response) => {
    const template = fs.readFileSync("select.ejs", "utf-8");
    
    // ドイツのことわざをランダムで表示
    proverbNo = Math.floor(Math.random() * rlList.length);
    if (proverbNo % 2 == 1) proverbNo -= 1;
    console.log(proverbNo);
    let todaysproverb = rlList[proverbNo];
    let todaysproverbTL = rlList[proverbNo + 1];

    // デッキリストを送信
    const html = ejs.render(template, {
        deckList: deckList,
        todaysproverb,
        todaysproverbTL
    });
    
    response.send(html);
});

app.post("/practice", (request, response) => {
    const template = fs.readFileSync("practice.ejs", "utf-8");
    // デッキ内の単語データを送信
    const html = ejs.render(template, {
        wordList: deckList[request.body.deckId].wordList,
    });
    response.send(html);
});

app.listen(3000);