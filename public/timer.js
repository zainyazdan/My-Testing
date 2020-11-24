
var baseURL = 'http://llm-yes.herokuapp.com'
// var baseURL = 'http://localhost:3000'

var timerOn = true;
var toadExtra = false;


document.getElementById("time").innerHTML = "Tu itna time late ho gai hai 🤭";
pageLoaded();





// Set the date we're counting down to

// var countDownDate = new Date("Nov 23, 2020 00:00:00").getTime();
var countDownDate = new Date().getTime();

// var countDownDate = new Date("Nov 20, 2020 03:55:00").getTime();


// Update the count down every 1 second
var x = setInterval(function() {


  // Get today's date and time
  // var now = new Date().getTime();
  var now = new Date("Nov 23, 2020 00:00:00").getTime();


  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"

  // document.getElementById("timer").innerHTML = days + "d " + hours + "h "  + minutes + "m " + seconds + "s ";



  // If the count down is finished, write some text
  if (distance < 0) {
    if(days == -1 && hours == -1 && minutes == -1 && seconds == -1)
    {
      document.getElementById("time").innerHTML = "Thank you for waiting for the timer 🤭";
      
      loadLoginPage();
    }
    else{
      timerOn = false;
      document.getElementById("time").innerHTML = "Tu itna time late ho gai hai 🤭";
      document.getElementById("extra").innerHTML = ""
      loadLoginPage();
    }

    // console.log("day : " + days);
    // console.log("hours : " + hours);
    // console.log("minutes : " + minutes);
    // console.log("seconds : " + seconds);
    clearInterval(x);
  }
  else if(toadExtra == false)
  {
    toadExtra = true;
    // document.getElementById("extra").innerHTML = "Thora sa to ab wait kr le ab... itni bhi jaldi kya hai 😊...  mujhe bhi isi trha wait hai tere answers ka 😅... jb khulla time hoga tb is ko open kri... Aur mera message parhte hue apni hassi control kri 🤭... jaise abhi control kr rhi hai 😂"

  }

  if(days == -1)
    days = 0;

  if(hours == -1)
    hours = 0;

  if(minutes == -1)
    minutes = 0;

  if(seconds == -1)
    seconds = 0;

  //////////////////////////

  if(days < 0)
    days *= -1;
  if(hours < 0)
    hours *= -1;
  if(minutes < 0)
    minutes *= -1;
  if(seconds < 0)
    seconds *= -1;


    
  document.getElementById("timerDays").innerHTML = days
  document.getElementById("timerHours").innerHTML = hours
  document.getElementById("timerMinutes").innerHTML = minutes
  document.getElementById("timerSeconds").innerHTML = seconds



}, 1000);



async function pageLoaded()
{
    console.log("pageLoaded()");
    var date = getCurrentDate();
    var time = getCurrentTime();

    // console.log("pageLoaded()");

    var data = JSON.stringify({"page":"timer","date":date,"time":time});

    var config = {
    method: 'post',
    url: baseURL + '/visited',
    headers: { 
        'Content-Type': 'application/json'},
    data : data
    };

    var result =  await axios(config);
    console.log("result : " , result);
}



function getCurrentDate()
{
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //As January is 0.
  var yyyy = today.getFullYear();
  var newDate = dd+"-"+mm+"-"+yyyy;

  // console.log("date : " + newDate);

  return newDate;
}




function getCurrentTime()
{

  var d = new Date(); // for now
  d.getHours(); // => 9
  d.getMinutes(); // =>  30
  d.getSeconds(); // => 51
  var newTime = d.getHours() + ":" + d.getMinutes() + ":" +  d.getSeconds();
  console.log("newTime : " + newTime);

  return newTime;
}






loadLoginPage()

async function loadLoginPage()
{
  console.log("loading login page");
  setTimeout(()=>
  {
    location.replace(baseURL + "/login.html");
  }, 8000);
}




document.getElementById('time1').innerHTML = "Browser date: "+getCurrentDate() +" , time: " + getCurrentTime();


loadTimeFromServer()

async function loadTimeFromServer()
{
  var config = {
    method: 'get',
    url: baseURL + '/question/getTimeAndDate',
    headers: { 
      'Content-Type': 'application/json',}
  };
  
  axios(config)
  .then(function (response) {

    // console.log(JSON.stringify(response.data));
    var date = response.data.date;
    var time = response.data.time;

    console.log("date: " + date);
    console.log("time: " + time);

    document.getElementById('time2').innerHTML = "server date: "+ date +" , time: " + time;
  })
  .catch(function (error) {
    console.log(error);
  });
  
  
}