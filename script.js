// library of questions
const questions = [{
    question: "Test your knowledge with our ultimate trivia quiz!",
    choices: "",
    correctAnswer: "",
    image: '<img src="images/buffy-cast.jpg" alt="the cast of buffy the vampire slayer">'
},{
    question: "Who sired everyone's favorite bad boy, Spike?",
    choices: ["Angel", "Drusilla", "Giles", "The Master"],
    correctAnswer: "Drusilla",
    image: '<img src="images/spike.png" alt="Spike from Buffy the Vampire Slayer">'  
}, {
    question: "What’s the name of the ancient organization that manages the Slayers?",
    choices: ["The Oversight Guild", "The First", "The Knights of Byzantium", "The Watchers Council"],
    correctAnswer: "The Watchers Council",
    image: '<img src="images/watchers.jpg" alt="A large gray stone building">'   
}, {
    question: "In season 3, Amy the witch turns herself into an animal. What animal is it?",
    choices: ["A black cat", "A crow", "A rat", "A snake"],
    correctAnswer: "A rat",
    image: '<img src="images/amy.png" alt="Amy from Buffy the Vampire Slayer">'     
}, {
    question: "To put it lightly, Giles has a shady past. What was his nickname from his days in England?",
    choices: ["Ripper", "The Big Bad", "The Watcher", "The Slayer"],
    correctAnswer: "Ripper",
    image: '<img src="images/giles.png" alt="Giles from Buffy the Vampire Slayer">'     
}, {
    question: "Where in Sunnydale is the Hellmouth located?",
    choices: ["A crypt in the cemetery", "The basement of the high school", "The satanic temple on Kingman's Bluff", "The dancefloor of the Bronze"],
    correctAnswer: "The basement of the high school",
    image: '<img src="images/sunnydale.png" alt="A large crater and sign for Sunnydale">'    
},
{
    question: "Your Results",
    choices: '',
    correctAnswer: '',
    image: '<img src="images/buffy.png" alt="Buffy Summers from Buffy the Vampire Slayer">'    
}
];

// empty counter to match the [i] of the main library
let currentIndex = 0;
// empty counter that gets added to with every correct answer
let correctAnswers = 0;

// finds the question text at the currentIndex
function findCurrentQuestion(){
  let currentQuestion = questions[currentIndex].question;
  return currentQuestion;
}
// finds the image
function findCurrentImage(){
  let currentImage = questions[currentIndex].image;
  return currentImage;
}
// finds the answers
function findCurrentChoices(){
  let choicesWithHtml = [];
  // adds the html to turn it into a form input
  for (i = 0; i < questions[currentIndex].choices.length; i++) {
    let choice = questions[currentIndex].choices[i]
    if (i === 0) {  
      choicesWithHtml.push('<label for="' + i +'"><input tabindex="' + (i + 1) + '" type="radio" name="' + currentIndex + '" value="' + choice + '" required id="' + i + '">' + choice + '</label><br>');
    } else {  
      choicesWithHtml.push('<label for="' + i + '"><input tabindex="' + (i + 1) + '" id="'+ i + '" type="radio" name="' + currentIndex + '" value="' + choice + '">' + choice + '</label><br>');
    }
  }
  return choicesWithHtml;
  // console.log(choicesWithHtml);
}

// removes the commas from the array
function removeCommas(){
  let withoutCommas = findCurrentChoices();
  return withoutCommas.join(' ');
}

function disableSubmit(){
  document.getElementById("submitBtn").disabled = true;
}

function tallyCorrectAnswers(){
  disableSubmit();
  let a = questions[currentIndex - 1].correctAnswer;
  let value = $("input[name='" + (currentIndex-1) + "']:checked").val(); 
  // let value2 = $("input[name='2']:checked").val();
  // let value3 = $("input[name='3']:checked").val();
  // let value4 = $("input[name='4']:checked").val();
  // let value5 = $("input[name='5']:checked").val();
  
  $(`<button>Next</button>`).click(renderPage).appendTo(`#questionform`);

    if (value === a) {
      correctAnswers = correctAnswers + 1;
      $(`#questionform`).append(`<span class="partialResult">Correct!</span>`)
    } else {
      $(`#questionform`).append(`<span class="partialResult">Incorrect! Correct Choice ` + a + `</span>`)
    }

  
  
  // console.log (a);
}

function renderSubmitBtn() {
  let submitBtn='';
  
  if (currentIndex === 0) {
    submitBtn = '<input tabindex="1" id="submitBtn" class="submitbutton" type="submit" value="Start the Quiz!">' ;
  } else if (currentIndex > 5){
    submitBtn = '<a tabindex="1" href="index.html"><button type="button">Start Over</button></a>' ;
  } else {
    submitBtn = '<input tabindex="5" id="submitBtn" class="submitbutton" type="submit" value="Submit">' ;
  }  


  return submitBtn;
}

function renderHeading() {
  let heading = ' ';
  if (currentIndex === 0){
    heading = 'Are You a Slayer Superfan?'
  } else if (currentIndex > 5) {
    heading = 'You Made It!'
  } else {
    heading = "Question " + currentIndex
  }

  return heading;
}

function renderScoreZone(){
  let scoreText = ' ';
  if (currentIndex > 1 && currentIndex < 7) {
    scoreText = `Current Score: ` + correctAnswers + ` out of 5` 
  } else if (currentIndex === 1) {
    scoreText = `Current Score:`
  }
  return scoreText
}

function renderAnswerText(){
  let answers = ' ';
  if (currentIndex > 5) {
    answers = correctAnswers + " out of 5<br>"
  } else {
    answers = removeCommas();
  }
  return answers
}

// puts the content on the page and adds a counter to currentIndex
function renderPage() {
  // tallyCorrectAnswers();
  let text = findCurrentQuestion();
  // console.log(text);
  let answers = renderAnswerText();
  let image = findCurrentImage();
  let submitBtn = renderSubmitBtn();
  let heading = renderHeading();
  let scoreText = renderScoreZone();





  $(`#questionheading`).text(heading)
  $(`#scoreZone`).text(scoreText);
  $('#questiontext').text(text);
  $('#questionform').html(answers);
  $('#questionform').append(submitBtn);
  $('.quizimg').html(image);
  
  
  $('#js-start-btn').remove();
  currentIndex += 1
}

// renders the next page
function nextQuestion(){
  $('#questionform').submit(function(event){
    tallyCorrectAnswers();
    // renderSubmitBtn();
    event.preventDefault();
    
    if (currentIndex === 1 || currentIndex > 6)
      renderPage();
    // console.log(this.value);
  });
  
}


// find the correct answer for each question
// function findCurrentAnswer() {
//   let currentAnswer = questions[currentIndex].correctAnswer;
//   return currentAnswer;
// } 






// // ATTEMPTS to find the value that the user selects
// function findUserAnswer() {
//   let name = currentIndex;
//   let value = $("input[name='name']:checked").val();
//   return value;
// }

// // Attempts to add a tally when the answer matches ths user value
// function tallyCorrect(){
//   $('#questionForm').submit(function(event){
//     if (findUserAnswer() === findCurrentAnswer()) {
//       correctAnswers += 1;
//     }
//   });
//   return correctAnswers;
// }

// calls all of the main ones
function main (){
  renderPage();
  renderSubmitBtn();
  nextQuestion();
  // tallyCorrectAnswers();
}

$(main);



