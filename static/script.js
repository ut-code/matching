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
let nextproblem = async() =>
{
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
function evalfunc0(){
    eval[wordId] += 0;
    nextproblem();
}
function evalfunc1(){
    eval[wordId] += 1;
    nextproblem();
}
function evalfunc2(){
    eval[wordId] += 2;
    nextproblem();
}

document.getElementsByClassName("eval")[0].onclick = evalfunc0;
document.getElementsByClassName("eval")[1].onclick = evalfunc1;
document.getElementsByClassName("eval")[2].onclick = evalfunc2;


//最初の問題表示
wordId = chooseWordId();
setproblem();

window.onkeyup = keyup;
// document.body.onkeyup = keyup;
function keyup(e)
{
  if (e.code == "Space" && document.getElementById("see_answer").style.display === "block") see_answer_func();
  else if (e.code == "Digit1" && document.getElementById("evals").style.display === "block") evalfunc0();
  else if (e.code == "Digit2" && document.getElementById("evals").style.display === "block") evalfunc1();
  else if (e.code == "Digit3" && document.getElementById("evals").style.display === "block") evalfunc2();
}