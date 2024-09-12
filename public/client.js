const socket = io('http://localhost:3000/');

let inputMessage = "";
let messageParent = document.getElementById("chat-messages");
let form = document.getElementById("submitForm");
let Name = prompt("Enter your Name");

const sendAppend = (message) => {
    let div = document.createElement("div");
    div.classList.add('message');
    div.classList.add('send-message');
    div.innerText = `${message}`;
    messageParent.append(div);
};

const receiveAppend = (message) => {
    let div = document.createElement("div");
    div.classList.add('message');
    div.classList.add('receive-message');
    div.innerText = `${message}`;
    messageParent.append(div);
};

socket.on("user-joined", name => {
    receiveAppend(`The user ${name} has joined the chat`);
});

socket.on('receive', data => {
    receiveAppend(`${data.message}: ${data.name}`);
})

form.addEventListener("submit", e => {
    e.preventDefault();
    inputMessage = document.getElementById("inputMessage");
    sendAppend(inputMessage.value);
    socket.emit("send", inputMessage.value)
    inputMessage.value = "";
    console.log("Sent Successfully")
});

socket.on('left', user => {
    receiveAppend(`The user: ${user}: has left the chat`);
})
