//htmlから渡した変数
const deckId = document.getElementById("deckId").title;

//出す問題を選ぶ関数（後で作る）
function chooseWordId(){
    return 0;
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

