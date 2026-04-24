const worddisplay = document.getElementById("worddisplay");
const hinttext = document.getElementById("hint-text");
const userinput = document.getElementById("input-guess");
const checkbtn = document.getElementById("checkbtn");
const hintbtn = document.getElementById("hintbtn");
const guessmsg = document.getElementById("guesses");
const scoremsg = document.getElementById("score");
const messageE = document.getElementById("message");

const wordlist = [
  { word: "javascript", hint: "language to make a we b functionable" },
  { word: "backend", hint: "server side of an applicaiton" },
  {word: "valorant", hint: "a game that we all love xD"}
];
let correctword = "";
let currentword = "";
let guessesleft = 5;
let score = 0;

function initgame() {
  let randomobj = wordlist[Math.floor(Math.random() * wordlist.length)];

  let wordarray = randomobj.word.split("");

  for (let i = wordarray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordarray[i], wordarray[j]] = [wordarray[j], wordarray[i]];
  }

  correctword = randomobj.word;
  worddisplay.innerText = wordarray.join("").toLocaleUpperCase();
  hinttext.innerText = "";
  userinput.value = "";
  messageE.innerText = "";
  guessesleft = 5;
  guessmsg.innerText = guessesleft;
}

function checkguess() {
  let userword = userinput.value.toLowerCase();

  if (userword=="") {
    messageE.style.color = "#e72c1f";
    messageE.style.textShadow = "0px 0px 20px #e72c1f";
    return messageE.innerText = "Enter something dawg!";

  }

  if (userword === correctword) {
    score++;
    scoremsg.innerText = score;
    messageE.style.color = "#3be444";
    messageE.style.textShadow = "0px 0px 20px #3be444";
    messageE.innerText = `Correct! It is ${correctword.toUpperCase()}`;
    setTimeout(initgame, 1500);

  } else {
    guessesleft--;
    guessmsg.innerText = guessesleft;

    messageE.style.color = "#eb2626";
    messageE.style.textShadow = "0px 0px 20px #eb2626";
    messageE.innerText = `Wrong! It was ${correctword.toUpperCase()}`;

     if (guessesleft < 1) {
    alert(`Game Over! The word was ${correctword.toUpperCase()}`);
    score = 0;
    scoreEl.innerText = score;
    initGame();
  }
  }

 
}

checkbtn.addEventListener("click" ,()=>{
checkguess();
});



userinput.addEventListener("keyup" ,(e)=>{
    if(e.key=="Enter") {
        checkguess();
    }
})

hintbtn.addEventListener("click",()=>{
    // hinttext.style.display="flex";
    // hinttext.style.textAlign="center";
    const hintt= wordlist.find(obj => obj.word === correctword).hint;
    hinttext.innerText=`Hint : ${hintt}`;
})


initgame();

// checkbtn.addEventListener("click", ()=> {
//     let anyvalue = Math.floor(Math.random() * 9);
//     console.log(anyvalue);

//     let randomobj = wordlist[Math.floor(Math.random() * wordlist.length)];

//     console.log(randomobj.word);

//         let wordarray = randomobj.word.split("");

//     console.log(wordarray);

//     for(let i = wordarray.length -1 ; i > 0 ; i--) {
//         let j = Math.floor(Math.random() * (i + 1));
//         [wordarray[i], wordarray[j]] = [wordarray[j] , wordarray[i]];
//     }

//     console.log(wordarray);

//     console.log(wordarray.join(""));

//     worddisplay.innerText = wordarray.join("").toUpperCase();

// })


