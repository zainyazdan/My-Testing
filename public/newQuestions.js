var baseURL = 'http://llm-yes.herokuapp.com'
// var baseURL = 'http://localhost:3000'

async function addNewQuestion() {

  var question = document.getElementById('new-question').value;
  if(question.length == 0)
  {
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