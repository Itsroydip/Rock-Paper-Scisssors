const compScore = document.querySelector("#compScore");
const userScore = document.querySelector("#userScore");
const openruleBox = document.querySelector("#gamerule");
const nextBtn = document.querySelector("#next");
const ruleBox = document.querySelector(".rule-box");
const closeRuleBox = document.querySelector(".cross");

//update score on reload
if(sessionStorage.compScore==null || sessionStorage.userScore==null){
    sessionStorage.compScore = 0;
    sessionStorage.userScore = 0;
}
compScore.innerText = sessionStorage.compScore;
userScore.innerText = sessionStorage.userScore;

// RuleBox
openruleBox.addEventListener("click",(e)=>{
    ruleBox.classList.remove("hidden");
});

closeRuleBox.addEventListener("click",()=>{
    ruleBox.classList.add("hidden");
});

//Celebration page
nextBtn.addEventListener("click",()=>{
    document.querySelector(".score-card").classList.add("hidden");
    document.querySelector(".hand").classList.add("hidden");
    document.querySelector(".arena").classList.add("hidden");
    document.querySelector(".footer").classList.add("hidden");
    document.querySelector(".celeb").classList.remove("hidden");
});

//core game functionality
document.querySelector(".hand").addEventListener("click",(e)=>{    
    let userInput;
    if(e.target.className == "hand")
    return;
    else if(e.target.className)
    userInput = e.target.className;
    else
    userInput = e.target.alt;
     
    let compInput = randomHandGenerator();
    let winner = playGame(userInput,compInput);//0(userlost)...1(userwin)...2(tied)
    updateScore(winner);//using session storage
    

    let userElement = document.querySelector(`.${userInput}`).cloneNode(true);
    let compElement = document.querySelector(`#${compInput}`).cloneNode(true);
    document.querySelector("#comp").append(compElement);
    document.querySelector("#user").append(userElement);    

    document.querySelector(".hand").classList.add("hidden");

    if(winner==0){//userlost
        document.querySelector('#verdict').innerHTML = "<h1>YOU LOST</h1><P>AGAINST PC</P>";
        document.querySelector("#comp").setAttribute('style','background-image: url(./assets/highlighter.png)');
    }
    else if(winner==1){//userwin
        document.querySelector('#verdict').innerHTML = "<h1>YOU WIN</h1><P>AGAINST PC</P>";
        document.querySelector("#user").setAttribute('style','background-image: url(./assets/highlighter.png)');
        document.querySelector('#next').classList.remove('hidden');
    }
    else{//tied
        document.querySelector('#verdict').innerHTML = "<h1>TIE UP</h1>";
    }
    
    document.querySelector(".arena").classList.remove("hidden");

});




function randomHandGenerator(){
    let random = Math.floor(Math.random()*3);
    let list = ["rock","paper","scissor"];
    
    return list[random];
}

function playGame(userInput,compInput){
    if(userInput == compInput)
    return 2;
    if(userInput == 'rock'){
        if(compInput=='paper') return 0;
        if(compInput=='scissor') return 1;
    }
    else if(userInput == 'paper'){
        if(compInput=='rock') return 1;
        if(compInput=='scissor') return 0;
    }
    else if(userInput == 'scissor'){
        if(compInput=='rock') return 0;
        if(compInput=='paper') return 1;
    }

}

function updateScore(winner){
    if(winner==0){
        sessionStorage.compScore++;
        compScore.innerText = sessionStorage.compScore;
    }
    else if(winner==1){
        sessionStorage.userScore++;
        userScore.innerText = sessionStorage.userScore;
    }

}

//playagain button
const playagain1 = document.querySelector("#playAgain");
playagain1.addEventListener("click",()=>{
    window.location.reload();
})
const playagain2 = document.querySelector("#playAgain2");
playagain2.addEventListener("click",()=>{
    window.location.reload();
})

