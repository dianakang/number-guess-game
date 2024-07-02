// 1. Set random number
// 2. User input a number and click 'go' button
// 3. If user's number == random number, then 'You got it!'
//    If random number < user's number => "Down!"
//    If random number > user's number => "Up!"
// 4. When the user click 'Reset' button, then game will be reset
// 5. When the user's done these five opportunities, then game will be over. (Button will be also disable)
// 6. When the user inputs out of the number 1~100, then alert 'Guess another number!' (Do not count as an opportunity)
// 7. When the user inputs same number again, then alert 'Already taken number. Guess another number!' (Do not count as an opportunity)


let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chanceArea = document.getElementById("chance-area");
let historyArea = document.getElementById("history-area");
let answerArea = document.getElementById("answer-area");
let answer = document.getElementById("answer");
let chances = 3;
let gameOver = false;
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus",function(){
    userInput.value="";
});

function pickRandomNum(){
    computerNum = Math.floor(Math.random() * 100) + 1;
    console.log("정답", computerNum);
    answer.textContent = computerNum; // 정답을 항상 화면에 표기
}

function play(){
    if (gameOver){
        return;
    }
    
    let userValue = userInput.value;

    if(userValue<1 || userValue>100){
        resultArea.textContent="Input number between 1 and 100"
        return;
    }

    if (history.includes(userValue)){
        resultArea.textContent="Guess another number!"
        return;
    }

    chances --;
    chanceArea.textContent = `남은 기회: ${chances}번`;
    console.log("chance", chances);

    if (userValue < computerNum){
        resultArea.textContent = "Up!"
    }else if (userValue > computerNum){
        resultArea.textContent = "Down!"
    }else {
        resultArea.textContent = "Correct!!"
        gameOver=true;
    }

    history.push(userValue);
    historyArea.textContent = `Your guesses: ${history.join(", ")}`;
    console.log(history);

    if(chances <1){
        gameOver=true;
    }

    if(gameOver==true){
        playButton.disabled = true;
        answerArea.style.display = "block";
        answer.textContent = computerNum;
    }
}
function reset(){
    userInput.value= "";
    pickRandomNum();

    resultArea.textContent="Result is here!"
    chances = 3;
    chanceArea.textContent = `남은 기회: ${chances}번`;
    history= [];
    historyArea.textContent = "Your guesses: ";
    playButton.disabled = false;
    gameOver = false;
    answerArea.style.display = "none";

}
pickRandomNum();