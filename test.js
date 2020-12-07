var answer = "Ye mera answer hai>[data: 8-12-2020, time: 1:20:59] ZAIN"
// console.log("answer: " + answer);

function splitAnswer(answer) {
    
    var bracketIndex = answer.indexOf('[')
    // console.log("BracketIndex: " + bracketIndex);
    var onlyAnswer = answer.substring(0, bracketIndex);
    var TimeAndKey = answer.substring(bracketIndex);

    console.log("Only answer:" + onlyAnswer + '\n');
    // console.log("TimeAndKey:" + TimeAndKey);
    var time = TimeAndKey.substring(0,TimeAndKey.length -5);
    var key = TimeAndKey.substring(TimeAndKey.length -4);

    console.log("time:" + time);
    console.log("key:" + key);

    var data = {
        answer: onlyAnswer,
        time: time,
        key: key
    }
    return data;
}

console.log("splitAnswer : ", splitAnswer(answer));



// console.log("length : " + test.length);



// var fields = answer.split('[');
// var ans = fields[0];
// var time = fields[1];


// console.log("answer:" + ans);
// console.log("\ntime:" + time);