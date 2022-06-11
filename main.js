const fs = require("fs");
const express = require("express");
const ejs = require("ejs");
const app = express();

app.get("/", (request, response) => {
    const template = fs.readFileSync("select.ejs", "utf-8");
    const html = ejs.render(template, {
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