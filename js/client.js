const socket =io('http://localhost:3000'); // connect to the server
const form=document.getElementById('send-container');
// get the input field and send button
const messageInp = document.getElementById('messageInp');
const messageContainer=document.querySelector(".container");
var audio=new Audio('wtp.mp3');
const append=(message, position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInp.value;
    append(`you : ${message}`,'right');
    socket.emit('send',message);
    messageInp.value='';
   
})
const name=prompt("enter your name");
socket.emit('new-user-joined', name);
socket.on('user-joined', name=>{
    append(`${name} joined the chat`,'right');
});
socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`,'left');
});
socket.on('left', name=>{
    append(`${name} : left the chat`,'left');
});