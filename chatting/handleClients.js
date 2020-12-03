const socketModel = require('../models/socket')




async function handleClients(io) {
    io.on('connection', (socket) => {
        // socket.emit("welcome", "Welcome ?");
        console.log("client is connected to the server");


        socket.on('joinedSite', async (page) => {

            var data = {}
            data.date = getCurrentDate();
            data.time = getCurrentTime();
            data.page = page;


            io.emit('userJoined', data);

            var result = await socketModel.findOne({date:data.date })
            if(result)
            {
                result.time.push('Joined (' + page + ') '+ data.time);
                result.count++;
                await result.save();
                console.log("joined time added");
            }
            else{
                var a = new socketModel({
                    date: data.date,
                    time: 'Joined ' + data.time
                })
                await socketModel.create(a);
                console.log("joined Created");
            }
        })




        socket.on('disconnect', async () => {

            // removeUser(socket.id)
            // console.log("User disconnected with socket id : " + socket.id);
            // console.log("onlineUsers after disconnect : ", onlineUsers);
            // console.log("\n\n");
            var data = {}
            data.date = getCurrentDate();
            data.time = getCurrentTime();
            io.emit('userLeaved', data)

            var result = await socketModel.findOne({date:data.date })
            if(result)
            {
                result.time.push('Leaved ' + data.time);
                result.count++;
                await result.save();
                console.log("Leaved time added");
            }
            else{
                var a = new socketModel({
                    date: data.date,
                    time: 'Leaved ' + data.time
                })
                await socketModel.create(a);
                console.log("Leaved Created");
            }





        })


        // socket.on('clientMessage', (data) => {
        //     console.log("received : ", data);
        //     var receiverSocketId = getSocketId(data.receiverId);

        //     if(receiverSocketId != null)
        //     {
        //         console.log("Sending message to socket no : " + receiverSocketId)
        //         io.to(receiverSocketId).emit('messageReply', data.message);
        //     }
        //     else
        //         console.log("Socket not found")
        //     // console.log(typeof data);
        //     // socket.emit('userJoined', "Server's reply ?")
        // })



        // setTimeout(() => {
        //     console.log("sending");
        //     socket.emit("serverReply", "client leaved ?");
        // }, 5000);

    });
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

//   var d = new Date(); // for now
//   d.getHours(); // => 9
//   d.getMinutes(); // =>  30
//   d.getSeconds(); // => 51
//   var newTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
//   console.log("newTime : " + newTime);

//   return newTime;
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

    // console.log("newTime : " + newTime);
    return newTime;
}






module.exports = handleClients
