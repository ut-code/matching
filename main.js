const fs = require("fs");
const express = require("express");
const ejs = require("ejs");
const app = express();
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

let deckNumber=0;//現在見ているデッキの番号を格納

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
    deckNumber=request.body.deckId;
    const template = fs.readFileSync("practice.ejs", "utf-8");
    // デッキ内の単語データを送信
    const html = ejs.render(template, {
        wordList: deckList[deckNumber].wordList,
    });
    response.send(html);
});

app.post("/eval_response",(request,response)=>{
    let eval=request.body.point;//i=0 => ×  i=1 => △  i=2 => 〇
    let point=deckList[deckNumber].wordList[wordList.length-1].point;
    point=(eval===2?point+1:0);
});

app.listen(3000);