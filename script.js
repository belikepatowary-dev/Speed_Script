const textDisplay = document.getElementById("text-display");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const cpmEl = document.getElementById("cpm");
const mistakesEl = document.getElementById("mistakes");
const restartBtn = document.getElementById("restart");
const timeSelect = document.getElementById("time-select");
const popup = document.getElementById("popup");
const finalWpm = document.getElementById("final-wpm");
const finalAccuracy = document.getElementById("final-accuracy");
const finalCpm = document.getElementById("final-cpm");
const finalMistakes = document.getElementById("final-mistakes");
const closePopup = document.getElementById("close-popup");
const themeToggle = document.getElementById("theme-toggle");
const progressBar = document.getElementById("progress-bar");
const userNameInput = document.getElementById("user-name");
const difficultySelect = document.getElementById("difficulty-select");
const leaderboardList = document.getElementById("leaderboard-list");

let textsByDifficulty = {
    easy:["The quick brown fox jumps over the lazy dog.","Typing tests improve your speed."],
    medium:["JavaScript makes websites interactive and fun.","Focus on accuracy before increasing your speed."],
    hard:["Consistency and practice are essential to mastery.","Learning new skills every day keeps your mind sharp."]
};

let currentText = "";
let timer;
let started = false;
let timeLeft = 60;

// Generate text
function newText() {
    const difficulty = difficultySelect.value;
    const texts = textsByDifficulty[difficulty];
    currentText="";
    for(let i=0;i<3;i++) currentText += texts[Math.floor(Math.random()*texts.length)]+" ";

    textDisplay.innerHTML="";
    currentText.split(" ").forEach((word,index)=>{
        const span=document.createElement("span");
        span.innerText=word+" ";
        if(index===0) span.classList.add("current-word");
        textDisplay.appendChild(span);
    });

    inputEl.value=""; wpmEl.innerText=0; accuracyEl.innerText=0; cpmEl.innerText=0; mistakesEl.innerText=0;
    timeLeft=parseInt(timeSelect.value); timeEl.innerText=timeLeft; progressBar.style.width="0%";
    started=false; inputEl.disabled=false; popup.style.display="none";
    document.body.style.background = document.body.classList.contains("light") ? "#f5f5f5" : "#1e1e2f";
}

// Typing input
inputEl.addEventListener("input",()=>{
    if(!started){ started=true; timer=setInterval(updateTime,1000); }

    const words=currentText.split(" ");
    const inputWords=inputEl.value.trim().split(" ");
    let correctChars=0, totalMistakes=0;
    const spans=textDisplay.querySelectorAll("span");
    spans.forEach(span=>span.classList.remove("current-word"));
    spans[inputWords.length-1]?.classList.add("current-word");

    inputWords.forEach((word,i)=>{
        const correctWord=words[i]||"";
        if(word===correctWord) correctChars+=word.length+1;
        else{
            for(let j=0;j<word.length;j++) correctChars += (word[j]===correctWord[j]?1:0);
            totalMistakes+=Math.abs(word.length-correctWord.length);
        }
    });

    const timeElapsed=parseInt(timeSelect.value)-timeLeft||1;
    const wpm=Math.round((inputWords.filter((w,i)=>w===words[i]).length/timeElapsed)*60);
    const accuracy=Math.round((correctChars/(inputEl.value.length||1))*100);
    const cpm=correctChars;

    wpmEl.innerText=wpm; accuracyEl.innerText=accuracy; cpmEl.innerText=cpm; mistakesEl.innerText=totalMistakes;
    let progressPercent=Math.min((inputEl.value.length/currentText.length)*100,100);
    progressBar.style.width=progressPercent+"%";
    if(!document.body.classList.contains("light")){
        const green=Math.min(wpm*2,255); const red=255-green;
        document.body.style.background=`rgb(${red},${green},47)`;
    }
});

// Timer update
function updateTime(){
    timeLeft--; timeEl.innerText=timeLeft;
    if(timeLeft<=0){ clearInterval(timer); inputEl.disabled=true; showPopup(); }
}

// Show popup and save global score
async function showPopup(){
    finalWpm.innerText=wpmEl.innerText;
    finalAccuracy.innerText=accuracyEl.innerText;
    finalCpm.innerText=cpmEl.innerText;
    finalMistakes.innerText=mistakesEl.innerText;
    popup.style.display="flex";
    await saveScore(userNameInput.value, parseInt(wpmEl.innerText)||0);
}

// Firebase leaderboard
async function saveScore(name,wpm){
    if(!name) name="Anonymous";
    await db.collection("leaderboard").add({name,wpm,timestamp:firebase.firestore.FieldValue.serverTimestamp()});
    loadGlobalLeaderboard();
}
async function loadGlobalLeaderboard(){
    const snapshot=await db.collection("leaderboard").orderBy("wpm","desc").limit(5).get();
    leaderboardList.innerHTML="";
    snapshot.forEach(doc=>{
        const li=document.createElement("li");
        li.innerText=`${doc.data().name} - ${doc.data().wpm} WPM`;
        leaderboardList.appendChild(li);
    });
}

// Restart and close popup
restartBtn.addEventListener("click",newText);
closePopup.addEventListener("click",()=>popup.style.display="none");

// Theme toggle
themeToggle.addEventListener("click",()=>{
    document.body.classList.toggle("light");
    newText();
});

// Initialize
loadGlobalLeaderboard();
newText();
