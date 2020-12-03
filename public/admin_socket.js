var socket = io();

socket.on('userJoined', (data) => {

    console.log("userJoined() : ", data);

    document.getElementById('socket-data').innerHTML += 'Joined ('+ data.page+'): '  + data.time + '<br>'
})


socket.on('userLeaved', (data) => {

    console.log("userLeaved() : ", data);
    document.getElementById('socket-data').innerHTML += 'Leaved : '  + data.time + '<br>'

})


