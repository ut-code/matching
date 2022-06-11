const express = require("express");

const app = express();
app.use(express.static("static"))

// middleware
app.post("/whatisanswer", (request, response) =>
{
    response.send("ggrks");
});

app.listen(3000);