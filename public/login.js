var loginIndex = 0;
var password = 'yes';

var hints = [
    "Chota sa hi word hai aur us mein koi space ni ati",
    "Ab ek dfa keh dia hai to doabara keh de",
    "Bs last time keh de open ho jae gi site"    
];

var errors = [
    "Ghalat hai password",
    "jan k ghalat na likh password",
    "bs 1 step hi dur hai tu"    
];


document.getElementById('number').innerHTML = loginIndex +1


function login()
{
    var pass = document.getElementById('password').value
    document.getElementById('password').value = ""
    console.log("pass : " + pass);



    if(pass == 'no')
    {
        document.getElementById('error').innerHTML = "Ab to no na likh mein rone lg jana hai " + "😭"
        return;
    }


    if(pass == password)
    {
        document.getElementById('hint').innerHTML = "Correct Password"
        document.getElementById('error').innerHTML = ""

        setTimeout(() => {  

            document.getElementById('hint').innerHTML = ""
            loginIndex++;
            document.getElementById('number').innerHTML = loginIndex + 1
    
        }, 2000);
    

    }
    else{
        document.getElementById('error').innerHTML = errors[loginIndex]
    }

    if(loginIndex == 3)
    {
        console.log("Loginned");
    }

}


function getHint()
{
    document.getElementById('hint').innerHTML = "Hint : " + hints[loginIndex]
}

var showLogin = false;


function hide()
{

    if(showLogin == false)
        document.getElementById("loginPage").style.display = "block";
    else
    document.getElementById("loginPage").style.display = "none";

    showLogin = !showLogin

    // var x = document.getElementById("loginPage");
    // if (x.style.display === "none") {
    //   x.style.display = "block";
    // } 
    // else {
    //     x.style.display = "none";
    // }
}





// let timestamp = 1606071608000

// let birthday = new Date('2020-11-23T00:00:00')
// // let a = birthday;
// // var year = a.getFullYear();

// // var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
// // var month = months[a.getMonth()];
// // var date = a.getDate();
// // var hour = a.getHours();
// // var min = a.getMinutes();

// // var sec = a.getSeconds();
// // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
// console.log("time : " , birthday);

// // timeDifferenceInDays(birthday, new Date());

// var d = birthday - new Date();

// console.log("d : " + d);

// function timeConverter(UNIX_timestamp)
// {
//     var a = new Date(UNIX_timestamp * 1000);
//     var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//     var year = a.getFullYear();
//     var month = months[a.getMonth()];
//     var date = a.getDate();
//     var hour = a.getHours();
//     var min = a.getMinutes();
//     var sec = a.getSeconds();
//     var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
//     return time;
// }

// // var currentTime = new Date();
// // console.log("currentTime : " + currentTime);

// async function timeDifferenceInDays(_date, _currentDate)
// {
//   const diffTimemillisec = Math.abs(_currentDate - _date);

//   const diffTimesec = diffTimemillisec/1000;
//   const diffTimeMinutes = diffTimemillisec/(1000 * 24);
//   const diffTimeHour = diffTimemillisec/1000;


// //   const diffDays = (diffTimemillisec / (1000 * 60 * 60 * 24)).toFixed(2); 
// //   const diffDaysround = Math.round(diffDays); 

//   console.log("mili seconds: " + diffTimemillisec);
//   console.log("seconds: " + diffTimesec);
//   console.log("minutes: " + diffTimeMinutes);
//   console.log("hours: " + diffTimeHour);

// //   console.log("diffDays     : " + diffDays);


//   console.log("diffDaysround: " + diffDaysround);
  
//   return diffDaysround;
// }



