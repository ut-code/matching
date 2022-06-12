// import question from "practice.ejs";

document.getElementById("see_answer").onclick = () => 
{
  document.getElementById("evals").style.display = "block";
  document.getElementById("see_answer").style.display = "none";
  document.getElementById("item").textContent=question.meaning;
  // wordList.push(question);
};

for(let i=0;i<3;i++){
    document.getElementsByClassName("eval")[i].onclick = async() =>
    {
        document.getElementById("evals").style.display = "none";
        document.getElementById("see_answer").style.display = "block";
        document.getElementById("item").textContent="Nacht";

        const json = JSON.stringify({ eval: i});//i=0 => ×  i=1 => △  i=2 => 〇
        const response = await fetch("/eval_response", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: json,
        });
    }
}

// document.getElementById("eval-1").onclick = () => 
// {
//   deckList[0].wordList.date = new Date();
//   deckList[0].wordList.point += -1;
// };
// document.getElementById("eval0").onclick = () => 
// {
//   deckList[0].wordList.date = new Date();
//   deckList[0].wordList.point += 0;
// };
// document.getElementById("eval1").onclick = () => 
// {
//   deckList[0].wordList.date = new Date();
//   deckList[0].wordList.point += 1;
// };

