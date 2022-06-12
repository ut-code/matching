const inf = 100000000;

//htmlから渡した変数
let deckId = document.getElementById("deckId").title;
const numberOfWords = document.getElementById("numberOfWords").title;

let wordId = -1; //問題のIDを保持しておく変数

//評価を記録しておく配列
let eval = [];
for(let i=0;i<numberOfWords;i++) eval.push(0);

//最近出た問題を記録しておく配列(queue)
const lengthOfRecord = 5;
let record = [];
for(let i=0;i<lengthOfRecord;i++) record.push(-1);
let pointerOfRecord = 0;

//min関数
function min(vector){
    let ret = vector[0];
    for(const x of vector){
        if(x<ret) ret = x;
    }
    return ret;
}

//出す問題を選ぶ関数（評価が最も低いものから出す。ただし直近(lengthOfRecord)回以内に出た問題は、問題数が十分にあるならば出さない）
function chooseWordId(){
    //直近に出た問題の評価値に、一時的にinfを加算する
    let temp = [];
    for(let i=0;i<numberOfWords;i++) temp[i] = eval[i];
    for(const i of record){
        if(i!==-1) temp[i] += inf;
    }
    //評価値が最小の問題のリストを作る
    const minOfEval = min(temp);
    let choiceList = [];
    for(let i=0;i<numberOfWords;i++){
        if(temp[i]===minOfEval) choiceList.push(i);
    }
    //作ったリストからランダムで1つ選ぶ
    const x = Math.floor(Math.random() * choiceList.length);
    return choiceList[x];
}

//問題を表示する関数
async function setproblem(){
    const body = new URLSearchParams({deckId: deckId, wordId: wordId, type: 0});
    const response = await fetch("/getword", {method: "post", body: body});
    document.getElementById("item").textContent = await response.text();
    return;
}

//答えを見るボタンが押された時の処理
let see_answer_func=async() =>{
    const body = new URLSearchParams({deckId: deckId, wordId: wordId, type: 1});
    const response = await fetch("/getword", {method: "post", body: body});
    document.getElementById("item").textContent = await response.text();

    //ボタンを○△×に切り替え
    document.getElementById("evals").style.display = "block";
    document.getElementById("see_answer").style.display = "none";
    return;
}
document.getElementById("see_answer").onclick = see_answer_func;

//○△×が押された時の処理
let evalfunc=async(i) =>
{
    //評価を記録
    eval[wordId] += i;

    //出た問題の番号を記録
    record[pointerOfRecord] = wordId;
    pointerOfRecord++;
    pointerOfRecord %= lengthOfRecord;

    //次の問題を出す
    wordId = chooseWordId();
    setproblem();

    //ボタンを「答えを見る」に切り替え
    document.getElementById("evals").style.display = "none";
    document.getElementById("see_answer").style.display = "block";
    return;
};
for(let i=0;i<3;i++){
    document.getElementsByClassName("eval")[i].onclick = evalfunc;
}

//最初の問題表示
wordId = chooseWordId();
setproblem();









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
  if (e.code == "Space") see_answer_func();
  else if (e.code == "Digit1") evalfunc(0);
  else if (e.code == "Digit2") evalfunc(1);
  else if (e.code == "Digit3") evalfunc(2);
}