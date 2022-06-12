//htmlから渡した変数
let deckId = document.getElementById("deckId").title;
const numberOfWords = document.getElementById("numberOfWords").title;

//出す問題を選ぶ関数（とりあえず一様ランダム）
function chooseWordId(){
    const ret = Math.floor(Math.random() * numberOfWords);
    return ret;
}
//問題のIDを保持しておく変数
let wordId = chooseWordId();

//問題を表示する関数
async function setproblem(){
    const body = new URLSearchParams({deckId: deckId, wordId: wordId, type: 0});
    const response = await fetch("/getword", {method: "post", body: body});
    document.getElementById("item").textContent = await response.text();
    return;
}

//答えを見るボタンが押された時の処理
document.getElementById("see_answer").onclick = async() =>{
    const body = new URLSearchParams({deckId: deckId, wordId: wordId, type: 1});
    const response = await fetch("/getword", {method: "post", body: body});
    document.getElementById("item").textContent = await response.text();

    //ボタンを○△×に切り替え
    document.getElementById("evals").style.display = "block";
    document.getElementById("see_answer").style.display = "none";
    return;
}

//○△×が押された時の処理
for(let i=0;i<3;i++){
    document.getElementsByClassName("eval")[i].onclick = async() =>
    {
        //評価を記録
        const body = new URLSearchParams({deckId: deckId, wordId: wordId, point: i});
        await fetch("/eval_response", {method: "post", body: body});

        //次の問題を出す
        wordId = chooseWordId();
        setproblem();

        //ボタンを「答えを見る」に切り替え
        document.getElementById("evals").style.display = "none";
        document.getElementById("see_answer").style.display = "block";
        return;
    }
}

setproblem(); //最初の問題表示









// import question from "practice.ejs";
/*
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
*/
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



window.onkeyup = keyup;
// document.body.onkeyup = keyup;
function keyup(e)
{
  if (e.code == "Space") setanswer();
  else if (e.code == "Digit1") alert(e.code);
  else if (e.code == "Digit2") alert(e.code);
  else if (e.code == "Digit3") alert(e.code);
}