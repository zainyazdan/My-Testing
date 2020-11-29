var baseURL = 'http://llm-yes.herokuapp.com';
// var baseURL = 'http://localhost:3000';

var currentQuestionNo = 1;
var totalQuestions = 0;
var questionFetching = false;



pageLoaded();


loadHeadingData('gift-page-alert');
loadInitialData();



function loadTimeAndDate() {
    var date = getCurrentDate();
    var time = getCurrentTime();
    var data = "Date: " + date + " , time: " + time;;
    console.log("data: " + data);
    document.getElementById('timeanddate').innerHTML = data
}





async function loadInitialData() {
    await loadTotalQuestions();
    // console.log("totalQuestions : " + totalQuestions);
    await loadQuestion(currentQuestionNo);


}


async function loadTotalQuestions() {
    var config = {
        method: 'get',
        url: baseURL + '/question/totalQuestions',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    var response = await axios(config);

    totalQuestions = response.data.totalQuestions;
}


function hello() {
    document.getElementById('heading').innerHTML += "Hello "
    console.log("Hello");
}



async function loadQuestion(_questionNo) {
    console.log("loadQuestion() : " + _questionNo);

    var config = {
        method: 'get',
        url: baseURL + '/question/getquestion/' + _questionNo,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    axios(config)
        .then(function (response) {

            document.getElementById('questionNo').innerHTML = currentQuestionNo;
            if (response.data.data.answer.length > 0) {
                loadNextButton();
            }

            // console.log(response.data);
            document.getElementById('question').innerHTML = response.data.data.question;

        })
        .catch(function (error) {
            console.log(error);
            questionFetching = false;
        });

}




async function answerQuestion(choice) {


    var data = document.getElementById('answer').value;
    // console.log("data : " , data);

    if (data.length <= 1) {
        document.getElementById('answerError').innerHTML = "Pura answer to likh";
        return;
    }
    progressSendAnswer();

    await addAnswer(currentQuestionNo, data);
    await loadTotalQuestions();

    console.log("TOTAL QUESTION LOADED : " + totalQuestions);

    // document.getElementById('answerSuccess').innerHTML = "Answer successfully sended";

    setTimeout(() => {
        document.getElementById('answerSuccess').innerHTML = "";
        HideNextButton();
    }, 3000);


    // console.log("currentQuestionNo_ : " + currentQuestionNo);
    // console.log("totalQuestions_ : " + totalQuestions);



    document.getElementById('answer').value = "";
    currentQuestionNo++;


    if (currentQuestionNo == totalQuestions + 1) {
        currentQuestionNo = 1;
        document.getElementById('answerError').innerHTML = "Questions khatam.. Ab repeat ho ge questions.. agr dobara likhna answer to likh de";
    }
}




async function addAnswer(_questionNo, _data) {
    var data = JSON.stringify({ "answer": _data });

    var config = {
        method: 'post',
        url: baseURL + '/question/addAnswer/' + _questionNo,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    var result = await axios(config);
    console.log("result : ", result.data);
}




async function addmessage() {
    var text = document.getElementById('message').value;
    if (text.length <= 1) {
        document.getElementById('messageError').innerHTML = "Pura message to likh";
        document.getElementById('message').value = 0;
        return;
    }
    progressSendMessage();


    var data = JSON.stringify({ "message": text });

    var config = {
        method: 'post',
        url: baseURL + '/question/addmessage/',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    document.getElementById('message').value = "";

    // document.getElementById('messageSuccess').innerHTML = "Answer successfully sended";

    setTimeout(() => {
        document.getElementById('messageSuccess').innerHTML = "";
    }, 3000);


    var result = await axios(config);
    console.log("result : ", result.data);
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

// function getCurrentTime() {

//     var d = new Date(); // for now
//     d.getHours(); // => 9
//     d.getMinutes(); // =>  30
//     d.getSeconds(); // => 51
//     var newTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
//     console.log("newTime : " + newTime);
//     return newTime;
// }


function getCurrentTime() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    // Check whether AM or PM 
    var newformat = hours >= 12 ? 'PM' : 'AM';

    // Find current hour in AM-PM Format 
    hours = hours % 12;

    // To display "0" as "12" 
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    var newTime = hours + ':' + minutes + ':' + seconds + ' ' + newformat;

    console.log("newTime : " + newTime);
    return newTime;
}



function showDiv(id) {
    document.getElementById(id).style.visibility = "visible";
}

function hideDiv(id) {
    document.getElementById(id).style.visibility = "hidden";
}


function progressSendMessage() {
    showDiv("progress_sm")

    setTimeout(() => {
        hideDiv("progress_sm");

        showDiv("correct_sm")
    }, 3000)

    setTimeout(() => {
        hideDiv("correct_sm");

    }, 4000)
}



function progressSendAnswer() {
    showDiv("progress_ans")

    setTimeout(() => {
        hideDiv("progress_ans");

        showDiv("correct_ans")
    }, 3000)

    setTimeout(() => {
        hideDiv("correct_ans");
        loadQuestion(currentQuestionNo);
    }, 4000)
}

async function addSongMessage(_textBoxId, _songName, _errorId) {

    console.log("_textBoxId : " + _textBoxId);
    console.log("_songName : " + _songName);

    var answer = document.getElementById(_textBoxId).value;

    console.log("answer : " + answer);

    if (answer == "") {

        document.getElementById(_errorId).innerHTML = "Answer to likh"
        document.getElementById(_errorId).style.color = "red";
        console.log("Answer to likh");
        return;
    }

    var data = JSON.stringify({ "song": _songName, "answer": answer });
    var config = {
        method: 'post',
        url: baseURL + '/question/addSongAnswer',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    await axios(config);
    document.getElementById(_errorId).innerHTML = "Message Sent !!"
    document.getElementById(_errorId).style.color = "green";
    document.getElementById(_textBoxId).value = ""
}


async function pageLoaded() {
    var date = getCurrentDate();
    var time = getCurrentTime();

    // console.log("pageLoaded()");

    var data = JSON.stringify({ "page": "Gift page", "date": date, "time": time });

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




// function getCurrentTime() {

//     var d = new Date(); // for now
//     d.getHours(); // => 9
//     d.getMinutes(); // =>  30
//     d.getSeconds(); // => 51
//     var newTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
//     //   console.log("newTime : " + newTime);

//     return newTime;
// }





function getCurrentTime() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    // Check whether AM or PM 
    var newformat = hours >= 12 ? 'PM' : 'AM';

    // Find current hour in AM-PM Format 
    hours = hours % 12;

    // To display "0" as "12" 
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    var newTime = hours + ':' + minutes + ':' + seconds + ' ' + newformat;

    console.log("newTime : " + newTime);
    return newTime;
}







async function skipQuestion() {
    console.log("skipped");
    currentQuestionNo++;
    console.log("skipQuestion() currentQuestionNo : " + currentQuestionNo);


    document.getElementById('answer').value = "";

    if (currentQuestionNo == totalQuestions + 1) {
        currentQuestionNo = 1;
        document.getElementById('answerError').innerHTML = "Questions khatam.. Ab repeat ho ge questions.. agr dobara likhna answer to likh de";
    }
    await loadQuestion(currentQuestionNo);

    document.getElementById('answerError').innerHTML = ""
    HideNextButton();
}







function loadNextButton() {
    showDiv("skipQuestionText");
    showDiv("skipQuestionButton");
}

function HideNextButton() {
    hideDiv("skipQuestionText");
    hideDiv("skipQuestionButton");
}






function showDiv(id) {
    document.getElementById(id).style.visibility = "visible";
}

function hideDiv(id) {
    document.getElementById(id).style.visibility = "hidden";
}



async function audioPlayed(_songName) {
    console.log("Song Played : " + _songName);

    var data = JSON.stringify({ "song": _songName });
    var config = {
        method: 'post',
        url: baseURL + '/question/songPlayed',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    await axios(config);
}


async function audioEnded(_songName) {
    console.log("Song Ended : " + _songName);
    var data = JSON.stringify({ "song": _songName });
    var config = {
        method: 'post',
        url: baseURL + '/question/songCompleted',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    await axios(config);
}


async function loadNewQuestions() {

    var config = {
        method: 'get',
        url: baseURL + '/question/newQuestionIndex',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    var result = await axios(config);
    // currentQuestionNo = 1;
    currentQuestionNo = result.data.index;
    console.log("currentQuestionNo: " + currentQuestionNo);

    await loadQuestion(currentQuestionNo);

    document.getElementById('answerError').innerHTML = "";

    HideNextButton()
}



async function loadHeadingData(_location)
{  
  var config = {
    method: 'get',
    url: baseURL + '/question/getLoadingMessage/' + _location,
    headers: { 
      'Content-Type': 'application/json'
    }
  };
  
  var result = await axios(config);

  window.alert(result.data.data.message);
}

