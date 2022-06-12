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

