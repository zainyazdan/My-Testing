
var baseURL = 'http://llm-yes.herokuapp.com'
// var baseURL = 'http://localhost:3000'

var password = 'zainllmzll'
var passwordCount = 0;


// LoginUsingPassword()
showDiv("all-content");


function LoginUsingPassword() {

  while (passwordCount < 1) {
    var pass = prompt("Enter password", "");

    if (pass == "")
      window.alert("Please enter the password");
    else if (pass == password) {
      passwordCount++;
    }
    else {
      window.alert("Wrong password");
      // console.log("ghalat");

      // addActivity("wrong password on admin page:" + pass)
    }
    console.log("passwordCount : " + passwordCount);
  }
  console.log("show");
  showDiv("all-content");
}



var UnAnsweredQuestion = 0;

async function loadMyQuestionAnswers(uri) {

  UnAnsweredQuestion = 0;

  var config = {
    method: 'get',
    url: baseURL + uri,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  var result = await axios(config);
  // console.log(result.data);


  // console.log(result.data.data[0].question)
  // AddQuestionToPage(1 , result.data.data[0].question, []);
  // AddQuestionToPage(1 , result.data.data[0].question, result.data.data[0].answer);
  // AddQuestionToPage(2 , result.data.data[1].question, result.data.data[1].answer)


  // document.getElementById('questions-answers').innerHTML ="";


  for (let i = 0; i < result.data.data.length; i++) {
    AddQuestionToPage(i + 1, result.data.data[i].question, result.data.data[i].answer)
  }

  document.getElementById('unanswered').innerHTML = "Total Unanswered question : " + UnAnsweredQuestion
  document.getElementById("unanswered").style.color = "red";
}


// var question = 'This is my question'
// var answer = ['This is my andwer 1', 'This is my andwer 2'];
// AddQuestionToPage(1, question, answer)


function AddQuestionToPage(questionNo, question, answer) {
  
  var div = document.createElement('div');
  div.className = 'question-heading'
  div.innerHTML = "Question " + questionNo;
  document.getElementById('questions-answers').appendChild(div);

  var div2 = document.createElement('div');
  div2.className = 'question'
  div2.innerHTML = question;
  document.getElementById('questions-answers').appendChild(div2);


  if (answer.length == 0) {
    var div = document.createElement('div');
    div.className = 'empty-answer';
    div.innerHTML = 'Not answered yet 😭';
    // mainDiv.innerHTML += div;
    document.getElementById('questions-answers').appendChild(div);
    UnAnsweredQuestion++;
    return;
  }

  for (let i = 0; i < answer.length; i++) {
    var div = document.createElement('div');
    div.className = 'answer'
    div.innerHTML = 'Answer ' + (i + 1) + ': ' + answer[i] + '<br>';
    // mainDiv.innerHTML += div;
    document.getElementById('questions-answers').appendChild(div);
  }
}



async function addQuestion() {

  var newQuestion = document.getElementById('newquestion').value;

  // console.log("newQuestion : " + newQuestion);

  if (newQuestion == "") {
    window.alert('enter input');
    return;
  }

  var data = JSON.stringify({ "question": newQuestion });

  var config = {
    method: 'post',
    url: baseURL + '/question/addquestion',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  var result = await axios(config);

  // var result = {};
  // result.data.status = false;
  // console.log("result.data : " , result.data);
  // console.log("result.data.status : " , result.data.success);



  if (result.data.success == true) {
    document.getElementById('new-question-response').innerHTML = "Question Inserted Successfully ";
    document.getElementById("new-question-response").style.color = "green";
    document.getElementById('newquestion').value = ""
  }
  else {
    document.getElementById('new-question-response').innerHTML = "Error while inserting question";
    document.getElementById("new-question-response").style.color = "red";
    document.getElementById('newquestion').value = ""
  }
  document.getElementById("new-question-response").innerHTML = "Question Inserted Successfully";

  setTimeout(() => {
    document.getElementById("new-question-response").innerHTML = '';
    console.log("Challa");
  }, 2000);


}


function showQuestionAnswersPanel() {

  // let html = '<div class="jumbotron text-center" id="add-new-question">' +
  //             '<h1>Add New Questions</h1>	<br> ' +
  //             '<textarea id="newquestion" rows="4" cols="50"></textarea>' +
  //             '<br><br>' +
  //             '<button onclick="addQuestion()" class="btn btn-primary">Insert</button>' +
  //             '<br><br>' +
  //             '<div id="new-question-response"></div>' +
  //           '</div>'

  // document.getElementById('main-box').innerHTML =html

  showDiv('questions-answers');
  hideDiv('add-new-question');

  // console.log("aya");

  loadMyQuestionAnswers('/myRoutes/questionAnswers');
}


function showAddQuestionPanel() {
  hideDiv('questions-answers');
  showDiv('add-new-question');
}



function showDiv(id) {
  document.getElementById(id).style.visibility = "visible";
}

function hideDiv(id) {
  document.getElementById(id).style.visibility = "hidden";
}



var test = false;

function temp() {
  // hideDiv("Testing");

  // showDiv();
  document.getElementById('Testing').innerHTML = ""
}



async function loadLoginTimeInfo(_option) {

  var url;
  if (_option == "date") {
    var date = document.getElementById('login-date').value
    console.log("date: " + date);

    var newDate = changeDateFormat(date);
    // console.log("newDate : "+ newDate);
    url = baseURL + '/myroutes/getLoginAndPasswordInfo/' + newDate
  }
  else {
    url = baseURL + '/myroutes/getCurrentLoginAndPasswordInfo'
  }

  var config = {
    method: 'get',
    url: url,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  var result = await axios(config);

  console.log("result.data : ", result);
  document.getElementById('login-info').innerHTML = ''


  if (result.data.success == true) {
    for (let j = 0; j < result.data.loginData.length; j++) {
      loadPageLoginInfo(result.data.loginData[j])
    }
    loadPasswordInfo(result.data.passwords);
    console.log("Password: " , result.data.passwords);
  }
  else {
    document.getElementById('login-info').innerHTML += result.data.message;
  }
}


function changeDateFormat(date) {

  var res = date.split("-");
  var year = res[0]
  var month = res[1]
  var day = res[2]

  if (day[0] == "0")
    day = res[2][1]

  if (month[0] == "0")
    month = res[1][1]

  // console.log("res : " + res[0]);

  var newDate = day + '-' + month + '-' + year;
  console.log("newDate() : " + newDate);
  return newDate
}


console.log("getCurrentDate() : " + getCurrentDate());
function getCurrentDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //As January is 0.
  var yyyy = today.getFullYear();
  var newDate = dd + "-" + mm + "-" + yyyy;

  // console.log("date : " + newDate);

  return newDate;
}


// {/* <div>
// Login info  (5)
// <ul> 
//   <li>Coffee</li>
//   <li>Tea</li>
//   <li>Milk</li>
// </ul>
// </div> */}

function loadPageLoginInfo(loginData) {

  var html = '<div> <b>' +
    loginData.page + ' (' + loginData.count + ') </b> <ul>'
  for (let i = 0; i < loginData.time.length; i++) {
    html += '<li>' + loginData.time[i] + '</li>'
  }
  html += '</ul></div>'
  console.log("html : " + html);
  document.getElementById('login-info').innerHTML += html
}



function loadPasswordInfo(passwordData) {
  var html = '<div>' +
    '<b>Password information (' + passwordData.count + ')</b> <ul>'
  for (let i = 0; i < passwordData.password.length; i++) {
    html += '<li>' + passwordData.password[i] + '</li>'
  }
  html += '</ul></div>'
  console.log("html : " + html);
  document.getElementById('login-info').innerHTML += html
}



async function loadLLMQuestions() {
  console.log("loadLLMQuestions()");
  
  showDiv('questions-answers');
  hideDiv('add-new-question');
  loadMyQuestionAnswers('/newQuestion/questionAnswers');
}

var CurrentQuestionToAnswer = 1;

async function showMyAnswerSection()
{
  showDiv('my-answers-section');
  hideDiv('questions-answers');
  hideDiv('add-new-question');

  await loadIndexOfCurrentAnswer();
  await loadQuestionToAnswer();
}




async function loadIndexOfCurrentAnswer()
{
  CurrentQuestionToAnswer = await loadNewQuestionIndex();
}

async function loadQuestionToAnswer()
{
  

  var config = {
    method: 'get',
    url: baseURL + '/newQuestion/questionAnswers/'+ CurrentQuestionToAnswer,
    headers: { 
      'Content-Type': 'application/json'
    }
  };
  var question = await axios(config)

  console.log("my new question : " , question.data.data);
  document.getElementById('give-answer-id').innerHTML = question.data.data.id;

  
  document.getElementById('llm-question').innerHTML = question.data.data.question;
  document.getElementById('give-answer-id').innerHTML = question.data.data.id;


  console.log("question.data.data.answer : " + question.data.data.answer.length);

  var htmlAnswers = document.getElementById('my-given-answers');
  htmlAnswers.innerHTML = ''
  if (question.data.data.answer.length > 0) 
  {
    for (let i = 0; i < question.data.data.answer.length ; i++) {
      console.log(question.data.data.answer[i]);
      htmlAnswers.innerHTML += 'Answer ' + i + ': ' + question.data.data.answer[i] + '<br>';

    } 
  }


}


async function addMyAnswer()
{
  var answer = document.getElementById('my-answer').value;

  if(answer.length == 0)
  {
    window.alert("Answer cannot be empty")
    return;
  }

  var data = JSON.stringify({"answer":answer});

  var config = {
    method: 'post',
    url: baseURL + '/newQuestion/addanswer/'+CurrentQuestionToAnswer+'/zain',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

  var result = await axios(config);
  
  if (result.data.success == true) {
    document.getElementById('llm-answer-response').innerHTML = "Answer Inserted Successfully ";
    document.getElementById("llm-answer-response").style.color = "green";
    document.getElementById('my-answer').value = ""
  }
  else {
    document.getElementById('llm-answer-response').innerHTML = "Error while inserting question";
    document.getElementById("llm-answer-response").style.color = "red";
    document.getElementById('my-answer').value = ""
  }

  setTimeout(() => {
    document.getElementById("llm-answer-response").innerHTML = '';
  }, 2000);

  CurrentQuestionToAnswer++;
  console.log("CurrentQuestionToAnswer : "  +CurrentQuestionToAnswer);
  loadQuestionToAnswer();
}

async function loadNewQuestionIndex()
{  
  var config = {
    method: 'get',
    url: baseURL+'/newQuestion/newQuestionIndex',
    headers: { 
      'Content-Type': 'application/json'
    }
  };
  
  var res = await axios(config)
  
  console.log("new index : " , res.data.index);
  return res.data.index;
}

async function loadPreviousLLmQuestion()
{
  CurrentQuestionToAnswer--;
  loadQuestionToAnswer();
}

async function loadNextLLmQuestion()
{
  CurrentQuestionToAnswer++;
  loadQuestionToAnswer();
}


async function pageLoaded(type) {

  console.log("pageLoaded()");
  var date = getCurrentDate();
  var time = getCurrentTime();

  // console.log("pageLoaded()");

  var data = JSON.stringify({ "page": "admin page " + type, "date": date, "time": time });

  var config = {
    method: 'post',
    url: baseURL + '/visited',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  var result = await axios(config);
  console.log("result : ", result);
}



function getCurrentDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //As January is 0.
  var yyyy = today.getFullYear();
  var newDate = dd + "-" + mm + "-" + yyyy;

  // console.log("date : " + newDate);

  return newDate;
}


function getCurrentTime() {

  var d = new Date(); // for now
  d.getHours(); // => 9
  d.getMinutes(); // =>  30
  d.getSeconds(); // => 51
  var newTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  console.log("newTime : " + newTime);

  return newTime;
}



async function addActivity(_activity)
{
    var data = JSON.stringify({"activity": _activity});

    var config = {
    method: 'post',
    url: baseURL + '/myroutes/addActivities',
    headers: { 
        'Content-Type': 'application/json'
    },
        data : data
    };

    await axios(config)
    console.log("activity entered");
}


async function loadQuestionUupdateSection()
{
  var questionId = document.getElementById('update-section-question-id').value;
  if(questionId == "")
  {
    window.alert("Please enter question number")
    return
  }
  // console.log("questionId : " + questionId);
  await updatesectionloadquestion(questionId);
}


async function updatesectionloadquestion(id)
{
  var config = {
    method: 'get',
    url: baseURL + '/question/getQuestion/' + id,
    headers: { 
      'Content-Type': 'application/json'
    }
  };

  var result = await axios(config);

  if(!result.data.success)
  {
    document.getElementById('update-section-inputbox').value = "Question not found"; 
    document.getElementById('update-section-inputbox').style.color = 'red'
    return
    
  }
  console.log("result" , result);
  document.getElementById('update-section-inputbox').value = result.data.data.question;
}





async function UpdateSectionUpdateQuestion()
{
  var quuestionId = document.getElementById('update-section-question-id').value;
  if(quuestionId == "")
  {
    window.alert("Please enter question number")
    return
  }
  var newQuuestion = document.getElementById('update-section-inputbox').value;

  console.log("quuestionId : " + quuestionId);
  console.log("newQuuestion : " + newQuuestion);
  

  var data = JSON.stringify({"newQuestion":newQuuestion,"questionId":quuestionId});
  var config = {
    method: 'put',
    url: baseURL+ '/myRoutes/updateQuestion',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  var result =  await axios(config);
  if(result.data.success)
  {
    document.getElementById('update-section-confirmation-message').innerHTML = "Question successfully updated"
    document.getElementById('update-section-confirmation-message').style.color = 'green'
  }

  setTimeout(() => {
    document.getElementById("update-section-confirmation-message").innerHTML = '';
    document.getElementById('update-section-inputbox').value = ''
  }, 2000);

}

async function UpdateSectionLoadPreviousQuestion()
{
  var questionId = document.getElementById('update-section-question-id').value;
  if(questionId == "")
  {
    window.alert("Please enter question number")
    return
  }
  // console.log("questionId : " + questionId);
  questionId--;

  document.getElementById('update-section-question-id').value = questionId;

  await updatesectionloadquestion(questionId);
}

async function UpdateSectionLoadNextQuestion()
{
  var questionId = document.getElementById('update-section-question-id').value;
  if(questionId == "")
  {
    window.alert("Please enter question number")
    return
  }
  // console.log("questionId : " + questionId);
  questionId++;

  document.getElementById('update-section-question-id').value = questionId;
  
  await updatesectionloadquestion(questionId);
}

