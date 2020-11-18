var baseURL = 'http://llm-yes.herokuapp.com';
// var baseURL = 'http://localhost:3000';


var loginIndex = 0;
var password = 'yes';

var hints = [
    "Chota sa hi word hai aur us mein koi space ni ati " + "😅",
    "Ab ek dfa keh dia hai to doabara keh de " + "😊",
    "Bs last time keh de open ho jae gi site "  +  "🤭"
];

var errors = [
    "Ghalat hai ye password "+  "😜",
    "dobara try kr k dekh ly shayad khul jae "+  "🤭",
    "bs 1 step hi dur hai tu "+  "🤭"    
];


document.getElementById('number').innerHTML = loginIndex +1


async function login()
{
    var pass = document.getElementById('password').value
    document.getElementById('password').value = ""
    console.log("pass : " + pass);

    if(pass == "")
    {
        document.getElementById('error').innerHTML = "Password to enter kr";
        return;
    }


    // await storePassword(pass);


    if(pass == 'no' || pass == 'No' || pass == 'NO' || pass == 'nO')
    {
        document.getElementById('error').innerHTML = "This no really hurts me a lot 😔";
        return;
    }


    if(pass == password)
    {
        document.getElementById('hint').innerHTML = "Correct Password"
        document.getElementById('error').innerHTML = ""

        setTimeout(() => {  

            document.getElementById('hint').innerHTML = ""
            loginIndex++;

            if(loginIndex == 3)
            {
                console.log("Loginned");
                // location.replace("./main.html");
                changePage();
                return;
            }

            document.getElementById('number').innerHTML = loginIndex + 1
            
        }, 1500);

    }
    else{
        document.getElementById('error').innerHTML = errors[loginIndex]
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



async function storePassword(_password)
{
    console.log("storePassword()");

    var data = JSON.stringify({"password": _password});

    var config = {
    method: 'post',
    url: baseURL + '/question/addPassword',
    headers: { 
        'Content-Type': 'application/json'
    },
        data : data
    };

    axios(config)
    .then(function (response) 
    {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });

}


async function changePage()
{

    console.log("changePage()");
    document.getElementById("loginPage").style.display = "none";
    

    setTimeout(() => {  
        // document.getElementById("opening").style.display = "block";

        document.getElementById("opening").style.visibility = "visible";
        
    }, 1500);


    setTimeout(() => {  
        
        location.replace(baseURL + "/main.html");

    }, 9000);
}




