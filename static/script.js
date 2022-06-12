//htmlから渡した変数
const deckId = document.getElementById("deckId").title;

//出す問題を選ぶ関数（後で作る）
function chooseWordId(){
    return 0;
}
let wordId = chooseWordId();

//問題を表示する関数
async function setproblem(){
    const body = new URLSearchParams({deckId: deckId, wordId: wordId, type: 0});
    const response = await fetch("/getword", {method: "post", body: body});
    document.getElementById("item").textContent = await response.text();
    return;
}

//答えを表示する関数
async function setanswer(){
    const body = new URLSearchParams({deckId: deckId, wordId: wordId, type: 1});
    const response = await fetch("/getword", {method: "post", body: body});
    document.getElementById("item").textContent = await response.text();

    //答えを見るボタン削除
    document.getElementById("evals").style.display = "block";
    document.getElementById("see_answer").style.display = "none";
    return;
}

//答えを見るボタンを押すと答えが表示される
document.getElementById("see_answer").onclick = setanswer;


setproblem(0); //最初の問題表示









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