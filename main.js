const fs = require("fs");
const express = require("express");
const ejs = require("ejs");
const app = express();
app.use(express.static("static"))

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
deckList[0].wordList.push(new Word("Nacht","night"));
deckList[0].wordList.push(new Word("Morgen","morning"));
//

app.get("/", (request, response) => {
    const template = fs.readFileSync("select.ejs", "utf-8");
    const html = ejs.render(template, {
        deckList: deckList,
    });
    response.send(html);
});

app.post("/practice", (request, response) => {
    const template = fs.readFileSync("practice.ejs", "utf-8");
    const html = ejs.render(template, {
    });
    response.send(html);
});

app.listen(3000);