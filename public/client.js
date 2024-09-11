// const socket = io('http://localhost:3000/');
// console.log("connected")
// let Name = prompt("Enter your Name");
// let messageParent = document.getElementById("messageParent");
// let form = document.getElementById("formSubmit");

// const recieveAppend = (name,position) =>
// {
// let div = document.createElement("div");
// let div2 = document.createElement("br");
// div.classList.add('message');
// div.classList.add('other-message');
// div.classList.add(`float-${position}`);
// div.innerText = `${name} has joined the chat`;
// messageParent.recieveAppend(div);
// messageParent.recieveAppend(div2);
// }

// socket.emit("new-user-joined", Name);
// socket.on("user-joined", name =>
// {
//     recieveAppend(name, 'left')})

document.addEventListener("DOMContentLoaded", () => {
    const socket = io('http://localhost:3000/');
    console.log("connected");

    let inputMessage = "";
    let messageParent = document.getElementById("messageParent");
    let form = document.getElementById("submitForm");
    let Name = prompt("Enter your Name");


    const recieveAppend = (name, position) => {
        let div = document.createElement("div");
        let div2 = document.createElement("br");
        div.classList.add('message');
        div.classList.add('my-message');
        div.classList.add('mt-4');
        div.innerText = `${name} has joined the chat`;
        messageParent.append(div);
        messageParent.append(div2);
    };


    const sendAppend = (name, position) => {
        let div = document.createElement("div");
        let div2 = document.createElement("br");
        div.classList.add('message');
        div.classList.add('other-message');
        div.classList.add('float-right');
        div.classList.add('mt-4');
        messageParent.append(div);
        // messageParent.append(div2);
    };



    if (Name) {
        socket.emit("new-user-joined", Name);
    }

    socket.on("user-joined", name => {
        recieveAppend(name);

    });

    socket.on('receive', data => {
        recieveAppend(`${data.message}: ${data.name}`);
    }
    )

    form.addEventListener("submit", e => {
        e.preventDefault();
        inputMessage = document.getElementById("inputMessage").value;
        sendAppend(inputMessage);
        socket.emit("on",inputMessage)
        inputMessage = "";
    }
    )

});

