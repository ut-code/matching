// import question from "practice.ejs";

document.getElementById("see_answer").onclick = () => 
{
  document.getElementById("evals").style.display = "block";
  document.getElementById("see_answer").style.display = "none";
  document.getElementById("item").textContent=question.meaning;
  // wordList.push(question);
};

for(let i=0;i<3;i++){
    document.getElementsByClassName("eval")[i].onclick = () =>
    {
        document.getElementById("evals").style.display = "none";
        document.getElementById("see_answer").style.display = "block";
        document.getElementById("item").textContent="Nacht";
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

