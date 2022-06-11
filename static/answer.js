document.getElementById("see_answer").onclick = () => 
{
    document.getElementById("evals").style.display = "block";
    document.getElementById("see_answer").style.display = "none";
    document.getElementById("item").textContent="夜";
};

// スペースキーで次行けるようにする
// document.addEventListener('キーイベント', イベント発生時に実行する関数);