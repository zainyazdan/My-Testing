
var baseURL = 'http://llm-yes.herokuapp.com'
// var baseURL = 'http://localhost:3000'



var UnAnsweredQuestion = 0;

async function loadQuestionAnswers() {
  var config = {
    method: 'get',
    url: baseURL + '/myRoutes/questionAnswers',
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
    ocument.getElementById('newquestion').value = ""
  }
  else {
    document.getElementById('new-question-response').innerHTML = "Error while inserting question";
    document.getElementById("new-question-response").style.color = "red";
    document.getElementById('newquestion').value = ""
  }

  setTimeout(() => {
    document.getElementById("new-question-response").innerHTML = '';
    
  }, 2000);

  setTimeout(() => {
    document.getElementById("new-question-response").innerHTML = "";
  }, 2000)
}


function showQuestionAnswersPanel()
{
  showDiv('questions-answers');
  hideDiv('add-new-question');
  loadQuestionAnswers()
}


function showAddQuestionPanel()
{
  hideDiv('questions-answers');
  showDiv('add-new-question');
}



function showDiv(id) {
    document.getElementById(id).style.visibility = "visible";
}

function hideDiv(id) {
    document.getElementById(id).style.visibility = "hidden";
}







