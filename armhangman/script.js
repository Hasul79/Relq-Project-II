

// տառերը
const letters = "աբգդեզէըթժիլխծկհձղճմյնշոչպջռսվտրցուփքևօֆ";

// տառերից զանգված ստանալ
let lettersArray = Array.from(letters);

// Ընտրել տառերի կոնտեյներ
let lettersContainer = document.querySelector(".letters");

// Ստեղծել տառեր
lettersArray.forEach(letter => {

     // Ստեղծել միջակայք span
      let span = document.createElement("span");

      // ստեղծել տառերի տեքստային հանգույց
      let theLetter = document.createTextNode(letter);

      // լրացնել տառը span-ի համար
      span.appendChild(theLetter);

      // ավելացնել Class Span-ում
      span.className = 'letter-box';

      // լրացնել  Span To The Letters (Container) միջակայքում
      lettersContainer.appendChild(span);

});

// ստեղծել օբյեկտ, բառերի  + Categories կատեգորիաներ  (հարց, պատասխան)
const words = {
  միրգ: ["խնձոր", "տանձ", "սալոր", "կեռաս", "ելակ", "արքայախնձոր", "մանդարին", "խաղող","բանան"],
  բանջարեղեն: ["լոլիկ", "կաղամբ", "կարտոֆիլ", "ստեպղին", "բողկ", "բամիա", "պղպեղ", "սոխ", "ճակնդեղ" ],
  պետություն: ["Հայաստան", "Ֆրանսիա", "Գերմանիա", "Պարսկաստան", "Վրաստան", "Իսպանիա", "Անգլիա", "Շվեդիա"],
  քաղաք: ["Կապան", "Երևան", "Քաջարան", "Էջմիածին", "Սևան", "Գորիս", "Սպիտակ","Վանաձոր", "Եղեգնաձոր"]
}

// ստանալ պատահական - Random Property

let allKeys = Object.keys(words);

// պատահական թիվը կախված կլինի keys.length երկարությունից
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// Category Words
let randomPropValue = words[randomPropName];

// Random Number Depend On Words - պաըահական թիվը կախված է մ
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Chosen Word - ընտրված բառը
let randomValueValue = randomPropValue[randomValueNumber];


// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depened On Word
lettersAndSpace.forEach(letter => {

        // Create Empty Span
        let emptySpan = document.createElement("span");

        // If Letter Is Space - եթե մեզ տարածություն է գրում, 
        if (letter === ' ') {

          // Add Class To The Span ավելացնել կլասս - տարածություն
          emptySpan.className = 'with-space';

        }

        // Append Span To The Letters Guess Container - լրացնել տառերի գուշակման տարածություն
        lettersGuessContainer.appendChild(emptySpan);

});

// Select Guess Spans- ընտրել գուշակվող բառի միջակայքը
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts -  սխալ -> 0 - եթե սխալ կա
let wrongAttempts = 0;

// Select The Draw Element -նշվում է նկարվող էլեմենտին
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters -  տառերի սեղմել
document.addEventListener("click", (e) => {

      // Set The Choose Status - սահմանում ենք ընտրության կարգավիճակ
      let theStatus = false;  

      if (e.target.className === 'letter-box') {

        e.target.classList.add("clicked");

        // Get Clicked Letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();

        // The Chosen Word
        let theChosenWord = Array.from(randomValueValue.toLowerCase());

        theChosenWord.forEach((wordLetter, WordIndex) => {

          // If The Clicked Letter Equal To One Of The Chosen Word Letter
          if (theClickedLetter == wordLetter) {

            // Set Status To Correct
            theStatus = true;

            // Loop On All Guess Spans
            guessSpans.forEach((span, spanIndex) => {

              if (WordIndex === spanIndex) {

                span.innerHTML = theClickedLetter;

              }

            });

          }

    });

    // Outside Loop

    // If Letter Is Wrong
    if (theStatus !== true) {

      // Increase The Wrong Attempts
      wrongAttempts++;

      // Add Class Wrong On The Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // Play Fail Sound
      document.getElementById("fail").play();

      if (wrongAttempts === 8) {

        endGame();

        lettersContainer.classList.add("finished");

      }

    } else {

      // Play Success Sound
      document.getElementById("success").play();

    }

  }

});

// End Game Function
function endGame() {

  // Create Popup Div
  let div = document.createElement("div");

  // Create Text
  let divText = document.createTextNode(`Խաղն ավարտվեց, պատասխանն է << ${randomValueValue} >>`);

  // Append Text To Div
  div.appendChild(divText);

  // Add Class On Div
  div.className = 'popup';

  // Append To The Body
  document.body.appendChild(div);

}

