var questionNumber = 0;

const response = document.getElementById("response");


function calculateHowManyDaysAway(date) {

  const differenceInMilliseconds = date - new Date();
  const millisecondsInASecond = 1000;
  const differenceInSeconds = differenceInMilliseconds / millisecondsInASecond;
  const differenceInMinuets = differenceInSeconds / 60;
  const differenceInHours = differenceInMinuets / 60;
  const howManyDaysAwayIsTheDate = differenceInHours / 24;
  
  return Math.ceil(howManyDaysAwayIsTheDate);
}


function calculateNextBirthday() {

  const birthdayYear = new Date().getFullYear();
  console.log(birthdayYear);
  const selectedBirthdayMonthElelment = document.getElementById("months");
  const birthdayMonth = selectedBirthdayMonthElelment.selectedIndex + 1;
  const birthdayDay = document.getElementById("birthdayDayAnswer").value;
  const birthdayDate = new Date(birthdayYear + "-" + birthdayMonth + "-" + birthdayDay);

  if(new Date() > birthdayDate) {
    birthdayDate.setFullYear(birthdayYear + 1);
  }

  response.innerText = " Your Birthday is " + calculateHowManyDaysAway(birthdayDate) + " days away!";

}

function calculateNextHoliday() {

  const holidays = document.getElementById("holidays")
  const favoriteHoliday = holidays.options[holidays.selectedIndex].value;

  let month = 1;
  let day = 1;

  switch (favoriteHoliday) {
    case "Chinese New Year":
      month = 1;
       day = 29;
      break;
    case "Valentine's Day":
       month = 2;
       day = 14;
      break;
    case "Easter":
       month = 4;
       day = 20;
      break;
    case "Halloween":
      month = 10;
      day = 31;
      break;
    case "Thanksgiving":
      month = 11;
      day = 27;
      break;
    case "Christmas":
      month = 12;
      day = 25;
      break;
    case "New Year's Day":
      month = 1;
      day = 1;
      break;
    case "Independence Day":
      month = 7;
      day = 4;
      break;
    case "Hanukkah":
      month = 12;
      day = 14;
      break;
    case "Kwanzaa":
      month = 12;
      day = 26;
      break;
    case "Ramadan":
      month = 2;
      day = 28;
      break;
    default:
      month = 1;
      day = 1;  
  }

  let year = new Date().getFullYear();
  const holidayDate = new Date(year + "-" + month + "-" + day);

  if(new Date() > holidayDate) {
    holidayDate.setFullYear(year + 1);

  }

  const howManyDaysAwayIsHoliday = calculateHowManyDaysAway(holidayDate);

  response.innerText = " Your favorite holiday " + favoriteHoliday + " is " + howManyDaysAwayIsHoliday + " days away! "; 
}

function runChatbot(event) {
  event.preventDefault();
  
  const answer = document.getElementById("answer").value;
  const question = document.getElementById("question");
  const answerForm = document.getElementById("answerForm");
  const birthdayForm = document.getElementById("birthdayForm");
  const holidayForm = document.getElementById("holidayForm");

  if (questionNumber === -1) {

    question.innerText = "What is your name?";
    response.innerText = ""
    answerForm.style.display = "block";
    birthdayForm.style.display = "none";
    holidayForm.style.display = "none";
    answer.value = "";
    return;

  }
  if (questionNumber === 0) {
    response.innerText = "Oh your name is " + answer + "!";
    question.innerText = "When is your birthday?";
  
    birthdayForm.style.display = "block";
    answerForm.style.display = "none";
  }
  else if (questionNumber === 1) {

    calculateNextBirthday();

   question.innerText = "What is your favorite holiday?";
   birthdayForm.style.display = "none";
   holidayForm.style.display = "block";
  }
  else if (questionNumber === 2) {
    
    calculateNextHoliday();

    question.innerText = "How old are you?";
    answerForm.style.display = "block";
    holidayForm.style.display = "none";

  }

  else if (questionNumber === 3) {

    const yearOfBirth = new Date().getFullYear() - answer;
    response.innerText = "You were born in " + yearOfBirth + "."
    question.innerText = "Thanks for chatting with me!";
    answerForm.style.display = "none";

  }
  
  questionNumber++;
}

const answerForm = document.getElementById("answerForm");
answerForm.addEventListener("submit", function(event) {
  runChatbot(event);

});

const birthdayForm = document.getElementById("birthdayForm");
birthdayForm.addEventListener("submit", function(event) {
  runChatbot(event);
});

const holidayForm = document.getElementById("holidayForm");
holidayForm.addEventListener("submit", function(event) {
  runChatbot(event);
});

const restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", function(event) {
  questionNumber = -1;
  runChatbot(event);
  
});