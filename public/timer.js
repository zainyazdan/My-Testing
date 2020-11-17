
var baseURL = 'http://llm-yes.herokuapp.com'

pageLoaded();


// Set the date we're counting down to
var countDownDate = new Date("Nov 23, 2020 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"

  // document.getElementById("timer").innerHTML = days + "d " + hours + "h "  + minutes + "m " + seconds + "s ";


 document.getElementById("timerDays").innerHTML = days
 document.getElementById("timerHours").innerHTML = hours
 document.getElementById("timerMinutes").innerHTML = minutes
 document.getElementById("timerSeconds").innerHTML = seconds

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "EXPIRED";
  }
}, 1000);



async function pageLoaded()
{
    var date = getCurrentDate();
    var time = getCurrentTime();

    console.log("pageLoaded()");


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



