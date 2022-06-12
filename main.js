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

    constructor(name){
        this.deckName = name;
    }
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
deckList.push(new Deck("test"));
deckList[0].wordList.push(new Word("Nacht", "night"));
deckList[0].wordList.push(new Word("Morgen", "morning"));

deckList.push(new Deck("test2"));
deckList[1].wordList.push(new Word("zwei", "2"));
//

// .txt形式のデッキを読み込む
const readline = require('readline');
const { response } = require("express");

function readDecks(txtfile) {
    let rs = fs.createReadStream(txtfile);
    let rl = readline.createInterface({ input: rs });
    let rlList = [];
    rl.on("line", (data) => {rlList.push(data);});
}

// text/decks内を読み込む
// 関数が使えなかったのでとりあえずただ読み込んだ
const rs0 = fs.createReadStream('text/decks/noun_1A.txt');
const rl0 = readline.createInterface({ input: rs0 });
let rlList0 = [];
rl0.on("line", (data) => {rlList0.push(data);});

deckList.push(new Deck("noun_1A"));
for (let i=0; i<rl0.length/2; i++)
{
    deckList[deckList.length - 1].wordList.push(new Word(rlList0[i*2], rlList0[i*2 + 1]));
} 

// ドイツのことわざを読み込む
const rs = fs.createReadStream('text/proverb.txt');
const rl = readline.createInterface({ input: rs });
let proverbNo;
let rlList = [];
rl.on("line", (data) => {rlList.push(data);});


// let proverbList = readDecks('text/proverb.txt');
// console.log(proverbList.length);

//let deckNumber=0;//現在見ているデッキの番号を格納

//let DeckId=0;//現在見ているデッキのidを格納


app.get("/", (request, response) => {
    const template = fs.readFileSync("select.ejs", "utf-8");
    
    // ドイツのことわざをランダムで表示
    proverbNo = Math.floor(Math.random() * rlList.length);
    if (proverbNo % 2 == 1) proverbNo -= 1;
    // console.log(proverbNo);
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
    const deckId = request.body.deckId;
    // デッキ内の単語データを送信　→ deckIdのみ送信に変更
    const html = ejs.render(template, {
        deckId: deckId,
        numberOfWords: deckList[deckId].wordList.length
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

app.post("/eval_response",(request,response)=>{
    const eval=request.body.point;//i=0 => ×  i=1 => △  i=2 => 〇
    const deckId = request.body.deckId;
    const wordId = request.body.wordId;
    if(eval===2){
        deckList[deckId].wordList[wordId].point++;
    }
    response.end();
});

app.listen(3000);
