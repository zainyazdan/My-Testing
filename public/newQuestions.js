var baseURL = 'http://llm-yes.herokuapp.com'
// var baseURL = 'http://localhost:3000'

var UnAnsweredQuestion = 0;


async function addNewQuestion() {

  
  await addActivity("LLM Added new question");


  var question = document.getElementById('new-question').value;
  if (question.length == 0) {
    question
    document.getElementById('insert-question-message').innerHTML = "Question to likh"
    document.getElementById('insert-question-message').style.color = "red";

    return
  }

  var data = JSON.stringify({ "question": question });

  var config = {
    method: 'post',
    url: baseURL + '/newQuestion/addQuestion',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  await axios(config);
  document.getElementById('insert-question-message').innerHTML = "Question Inserted 😊"
  document.getElementById('insert-question-message').style.color = "green";


  setTimeout(() => {
    document.getElementById('insert-question-message').innerHTML = ""
    document.getElementById('new-question').value = ""
  }, 1500);
}








async function loadQuestionAnswers() {

  await addActivity("Opened My Answers")


  UnAnsweredQuestion = 0;
  document.getElementById('questions-answers').innerHTML = "";

  var config = {
    method: 'get',
    url: baseURL + '/newQuestion/questionAnswers',
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
    let tempData = splitAnswer(answer[i]);
    
    if(tempData.key == "ZAIN")
    {
      div.innerHTML = 'Answer ' + (i + 1) + ': ' + tempData.answer + '<br>';
    }
    else{
      div.innerHTML = 'Answer ' + (i + 1) + ': ' + answer[i] + '<br>';
    }

    // mainDiv.innerHTML += div;
    document.getElementById('questions-answers').appendChild(div);
  }

}


function splitAnswer(answer) {
    
  var bracketIndex = answer.indexOf('[')
  // console.log("BracketIndex: " + bracketIndex);
  var onlyAnswer = answer.substring(0, bracketIndex);
  var TimeAndKey = answer.substring(bracketIndex);

  // console.log("Only answer:" + onlyAnswer + '\n');
  // console.log("TimeAndKey:" + TimeAndKey);
  var time = TimeAndKey.substring(0,TimeAndKey.length -5);
  var key = TimeAndKey.substring(TimeAndKey.length -4);

  // console.log("time:" + time);
  // console.log("key:" + key);

  var data = {
      answer: onlyAnswer,
      time: time,
      key: key
  }
  return data;
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
}


