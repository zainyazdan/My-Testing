
var baseURL = 'http://llm-yes.herokuapp.com'
// var baseURL = 'http://localhost:3000'



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
