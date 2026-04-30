const worddisplay = document.getElementById("worddisplay");
const hinttext = document.getElementById("hint-text");
const userinput = document.getElementById("input-guess");
const checkbtn = document.getElementById("checkbtn");
const hintbtn = document.getElementById("hintbtn");
const guessmsg = document.getElementById("guesses");
const scoremsg = document.getElementById("score");
const messageE = document.getElementById("message");

const body = document.body;
// SOUNDS

let correctsound = new Audio("sounds/correct.mp3");
let wrongsound = new Audio("sounds/wrong.mp3");

correctsound.volume=0.3;
wrongsound.volume=0.15;

// correctsound.play();
// wrongsound.play();

function playsound(audioo){
  audioo.pause();
  audioo.currentTime=1.1;
  audioo.play();
}

function wrongaudio(audioo) {
  audioo.pause();
  audioo.currentTime=1.9;
  audioo.play();
  
}




let gamecontainer = document.getElementById("gamecontainer");


const wordlist = [
  {
    word: "javascript",
    hint: "language to make a we b functionable",
    scramble: true,
  },

  { word: "backend", hint: "server side of an applicaiton", scramble: true },

  { word: "valorant", hint: "a game that we all love xD", scramble: true },

  {
    word: "discord",
    hint: "the platform where hisaab kitaab gang hangouts",
    scramble: true,
  },

  {
    word: "meri",
    hint: "something related to yourself",
    scramble: false,
    display: "mairi",
  },

  {
    word: "yeh",
    hint: "pointing towards something specific",
    scramble: false,
    display: "Yy",
  },
];

let correctword = "";
let currentword = "";
let guessesleft = 5;
let score = 0;
let unscrambledcorrectword = "";
let realdisplayword = "";
let isBetweenWords = false;  

function initgame() {
  isBetweenWords = false;
  gamecontainer.style.borderColor= "var(--subtleborder)";
  document.body.style.backgroundColor="var(--bg)";




  let randomobj = wordlist[Math.floor(Math.random() * wordlist.length)];
  correctword = randomobj.word;

  let wordarray = randomobj.word.split("");

  let wordscramble = randomobj.scramble;
  // let realdisplay = randomobj.display;
  let realdisplay = "";

  console.log(wordscramble);
  console.log(realdisplay);

  if (randomobj.display) {
    // letcorrectword = randomobj.display;
    realdisplay = randomobj.display;
  } else if (wordscramble === true) {
    let wordarray = correctword.split("");
    for (let i = wordarray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [wordarray[i], wordarray[j]] = [wordarray[j], wordarray[i]];
    }
    realdisplay = wordarray.join("");
  } else {
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
  if (isBetweenWords) return;

  let userword = userinput.value.toLowerCase();

  if (userword == "") {
    messageE.style.color = "#e72c1f";
    messageE.style.textShadow = "0px 0px 20px #e72c1f";
    return (messageE.innerText = "Enter something dawg!");
  }

  if (userword === correctword) {
    // body.classList.add("correct-guess");

    playsound(correctsound);
    gamecontainer.classList.add("correct-guess" , "correctguessanimation");
    setTimeout(() => gamecontainer.classList.remove("correct-guess"),1500 );
    // setTimeout(() => gamecontainer.classList.remove("wrongguessanimation"),1500 );

    setTimeout(() => {
      gamecontainer.classList.remove("correctguessanimation");
    }, 1500);
    
    
    
    score++;
    scoremsg.innerText = score;
    messageE.innerText = `Correct! It is ${correctword.toUpperCase()}`;
    
    isBetweenWords = true;
    setTimeout(initgame, 1500);
  } else {

    wrongaudio(wrongsound);


    gamecontainer.classList.add("incorrect-guess", "wrongguessanimation");
    // gamecontainer.classList.add("incorrect-guess");

    setTimeout(() => {
      gamecontainer.classList.remove("wrongguessanimation");
    }, 150);
    
    setTimeout(()=>gamecontainer.classList.remove("incorrect-guess"),1500);

    guessesleft--;
    guessmsg.innerText = guessesleft;

    messageE.innerText = `Wrong! Tryagain`;  

    if (guessesleft < 1) {
      alert(`Game Over! The word was ${correctword.toUpperCase()}`);
      score = 0;
      scoremsg.innerText = score;
      initgame();
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
  // gamecontainer.style.borderColor = "#fff";
});

initgame();
