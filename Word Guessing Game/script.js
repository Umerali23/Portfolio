const worddisplay = document.getElementById("worddisplay");
const hinttext = document.getElementById("hint-text");
const userinput = document.getElementById("input-guess");
const checkbtn = document.getElementById("checkbtn");
const hintbtn = document.getElementById("hintbtn");
const guessmsg = document.getElementById("guesses");
const scoremsg = document.getElementById("score");
const messageE = document.getElementById("message");

const wordlist = [
  {
    word: "javascript",
    hint: "language to make a we b functionable",
    scramble: true,
  },

  { word: "backend", 
    hint: "server side of an applicaiton", 
    scramble: true },

  { word: "valorant", 
    hint: "a game that we all love xD", 
    scramble: true },

  {
    word: "discord",
    hint: "the platform where hisaab kitaab gang hangouts",
    scramble: true,
  },

  { word: "meri", 
    hint: "something related to yourself", 
    scramble: false,
    display: "mairi" 
  },

  { word: "yeh", 
    hint: "pointing towards something specific", 
    scramble: false,
    display: "Yy" 
  },

  



];

let correctword = "";
let currentword = "";
let guessesleft = 5;
let score = 0;
let unscrambledcorrectword = "";
let realdisplayword = "";

function initgame() {
  let randomobj = wordlist[Math.floor(Math.random() * wordlist.length)];
  correctword = randomobj.word;

  let wordarray = randomobj.word.split("");

  let wordscramble = randomobj.scramble;
  // let realdisplay = randomobj.display;
  let realdisplay = "";

  console.log(wordscramble);
  console.log(realdisplay);
  
  if (randomobj.display){
    // letcorrectword = randomobj.display;
     realdisplay = randomobj.display;
  }
  
  else if (wordscramble === true) {
    let wordarray = correctword.split("");
    for (let i = wordarray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [wordarray[i], wordarray[j]] = [wordarray[j], wordarray[i]];
    }
    realdisplay = wordarray.join("");
  } 

  else {
    // unscrambledcorrectword = randomobj.correctwordd;
    realdisplay = correctword;
    // realdisplay = randomobj.word;
  }


  // worddisplay.innerText = wordarray.join("").toLocaleUpperCase();
  worddisplay.innerText = realdisplay.toLocaleUpperCase();
  hinttext.innerText = "";
  userinput.value = "";
  messageE.innerText = "";
  guessesleft = 5;
  guessmsg.innerText = guessesleft;
}

function checkguess() {
  let userword = userinput.value.toLowerCase();

  if (userword == "") {
    messageE.style.color = "#e72c1f";
    messageE.style.textShadow = "0px 0px 20px #e72c1f";
    return (messageE.innerText = "Enter something dawg!");
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
    messageE.innerText = `Wrong! Tryagain`;

    if (guessesleft < 1) {
      alert(`Game Over! The word was ${correctword.toUpperCase()}`);
      score = 0;
      scoremsg.innerText = score;
      gameinit();
    }
  }
}

checkbtn.addEventListener("click", () => {
  checkguess();
});

userinput.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    checkguess();
  }
});

hintbtn.addEventListener("click", () => {
  // hinttext.style.display="flex";
  // hinttext.style.textAlign="center";
  const hintt = wordlist.find((obj) => obj.word === correctword).hint;
  hinttext.innerText = `Hint : ${hintt}`;
});

initgame();
