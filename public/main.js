var currentQuestionNo = 1;
var totalQuestions = 0;
var questionFetching = false;

loadInitialData();



async function loadInitialData()
{
    await loadTotalQuestions();
    // console.log("totalQuestions : " + totalQuestions);
    await loadQuestion(currentQuestionNo);
}


async function loadTotalQuestions()
{
    var config = {
    method: 'get',
    url: 'http://localhost:3000/question/totalQuestions',
    headers: { 
        'Content-Type': 'application/json'
    }};

    var response = await axios(config);

    totalQuestions = response.data.totalQuestions;
}


function hello()
{
    document.getElementById('heading').innerHTML += "Hello "
    console.log("Hello");
}



async function loadQuestion(_questionNo)
{
    console.log("loadQuestion() : " + _questionNo);
    
    var config = {
    method: 'get',
    url: 'http://localhost:3000/question/getquestion/' + _questionNo,
    headers: { 
        'Content-Type': 'application/json'
    }};
    axios(config)
    .then(function (response) {

        // console.log(response.data);
        document.getElementById('questionNo').innerHTML = currentQuestionNo;
        document.getElementById('question').innerHTML = response.data.data.question;
    })
    .catch(function (error) {
    console.log(error);
    questionFetching = false;
    });

}




async function answerQuestion()
{
    var data = document.getElementById('answer').value;
    console.log("data : " , data);

    if(data.length <= 1)
    {
        document.getElementById('answerError').innerHTML = "Pura answer to likh";
        return;
    }

    addAnswer(currentQuestionNo, data);


    console.log("currentQuestionNo_ : " + currentQuestionNo);
    console.log("totalQuestions_ : " + totalQuestions);



    document.getElementById('answer').value = "";
    currentQuestionNo++;


    if(currentQuestionNo == totalQuestions +1)
    {
        currentQuestionNo = 1;
        document.getElementById('answerError').innerHTML = "Questions khatam";
    }


    loadQuestion(currentQuestionNo);
}




async function addAnswer(_questionNo, _data)
{
    var data = JSON.stringify({"answer":_data});

    var config = {
      method: 'post',
      url: 'http://localhost:3000/question/addAnswer/' + _questionNo,
      headers: { 
        'Content-Type': 'application/json'
       },
      data : data
    };
    
    var result = await axios(config);
    console.log("result : " , result.data);
}




async function addmessage()
{

    var text = document.getElementById('message').value;

    if(text.length <= 1)
    {
        document.getElementById('messageError').innerHTML = "Pura message to likh";
        document.getElementById('message').value = 0;
        return;
    }

    var data = JSON.stringify({"message":text});

    var config = {
      method: 'post',
      url: 'http://localhost:3000/question/addmessage/',
      headers: { 
        'Content-Type': 'application/json'
       },
      data : data
    };
    
    var result = await axios(config);
    console.log("result : " , result.data);
}













