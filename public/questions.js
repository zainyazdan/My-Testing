
var baseURL = 'http://llm-yes.herokuapp.com'
// var baseURL = 'http://localhost:3000'



loadQuestionAnswers()

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
    AddQuestionToPage(i+1 , result.data.data[i].question, result.data.data[i].answer)
  }

  document.getElementById('unanswered').innerHTML = "Total Unanswered question : " + UnAnsweredQuestion
  document.getElementById("unanswered").style.color = "red";
}


// var question = 'This is my question'
// var answer = ['This is my andwer 1', 'This is my andwer 2'];
// AddQuestionToPage(1, question, answer)


function AddQuestionToPage(questionNo, question, answer)
{
  var div = document.createElement('div');
  div.className = 'question-heading'
  div.innerHTML = "Question " + questionNo;
  document.getElementById('questions').appendChild(div);
  
  var div2 = document.createElement('div');
  div2.className = 'question'
  div2.innerHTML = question;
  document.getElementById('questions').appendChild(div2);
  

  if(answer.length == 0)
  {
    var div = document.createElement('div');
    div.className = 'empty-answer';
    div.innerHTML = 'Not answered yet 😭';
    // mainDiv.innerHTML += div;
    document.getElementById('questions').appendChild(div);
    UnAnsweredQuestion ++;
    return;
  }
  
  for (let i = 0; i < answer.length; i++) {
    var div = document.createElement('div');
    div.className = 'answer'
    div.innerHTML = 'Answer '+ (i+1) + ': ' + answer[i] + '<br>';
    // mainDiv.innerHTML += div;
    document.getElementById('questions').appendChild(div);
  }
}


