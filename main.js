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

// ドイツのことわざをランダムで表示
// const text = fs.readFileSync("text/proverb.txt", 'utf-8');
// const lines = text.toString().split('¥n');
const readline = require('readline');
const { response } = require("express");
const rs = fs.createReadStream('text/proverb.txt');
const rl = readline.createInterface({ input: rs });
let proverbNo;
let rlList = [];
rl.on("line", (data) => {rlList.push(data);});

app.get("/", (request, response) => {
    const template = fs.readFileSync("select.ejs", "utf-8");
    
    proverbNo = Math.floor(Math.random() * rlList.length);
    if (proverbNo % 2 == 1) proverbNo -= 1;
    console.log(proverbNo);
    let todaysproverb = rlList[proverbNo];

    // デッキリストを送信
    const html = ejs.render(template, {
        deckList: deckList,
        todaysproverb,
    });
    
    response.send(html);
});

app.post("/practice", (request, response) => {
    const template = fs.readFileSync("practice.ejs", "utf-8");
    // デッキ内の単語データを送信　→ deckIdのみ送信に変更
    const html = ejs.render(template, {
        deckId: request.body.deckId,
    });
    response.send(html);
});

//問題や答えを送信
app.post("/getword", (request, response) => {
    const deckId = request.body.deckId;
    const wordId = request.body.wordId;
    const type = request.body.type;
    let res;
    //type 0は問題を送信、1は答えを送信
    if(type === "0"){
        res = deckList[deckId].wordList[wordId].deutsch;
    }
    if(type === "1"){
        res = deckList[deckId].wordList[wordId].meaning;
    }
    response.send(res);
});

app.listen(3000);