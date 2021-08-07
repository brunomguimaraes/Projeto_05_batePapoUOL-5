let messages = [];
let chatUser = {name: prompt("Type here your first name.")};

enterRoom();

function enterRoom () {
    alert("Welcome to the old school way to chat!")
    
    const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/participants', chatUser);

    promise.then(getMessages);
    promise.catch(nameError);

    keepConnection();
}

function nameError () {
    alert("This name is already being used in this room, please type another one.")

    enterRoom();
}

function keepConnection () {
    const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/status', chatUser);

    promise.then(remainConnected);
}

function remainConnected () {
    //setInterval(keepConnection, 5000)
}

function getMessages() {
    const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/messages");

    promise.then(loadMessages);
    promise.catch(error);
}

function loadMessages (response) {
    messages = response.data;

    showMessages();    
}

function showMessages () {
    const ulMessages = document.querySelector("ul");
    ulMessages.innerHTML = "";  
    
    for (let i = 0; i < messages.length; i++) { 
        
        if(messages[i].type === "status") {

            ulMessages.innerHTML += `
        
            <li class="status-message message">
                (${messages[i].time}) <strong>${messages[i].from}</strong> ${messages[i].text}        
            </li>`
        } 
        else if (messages[i].type === "message") {

            ulMessages.innerHTML += `
        
            <li class="normal-message message">
                (${messages[i].time}) <strong>${messages[i].from}</strong> para <strong>${messages[i].to}</strong>: ${messages[i].text}            
            </li>`
        }   
        else if (messages[i].type === "private_message") {

            ulMessages.innerHTML += `
        
            <li class="private-message message">
                (${messages[i].time}) <strong>${messages[i].from}</strong> reservadamente para <strong>${messages[i].to}</strong>: ${messages[i].text}            
            </li>`
        }   
        else {
            continue;
        }
    }

    /*AUTO SCROLL*/
    const showLastMessage = document.querySelector("ul");
    showLastMessage.scrollIntoView({block: 'end', behavior: 'smooth', inline: 'nearest'}); 
    /*AUTO SCROLL*/

    updateMessages();
}

function updateMessages () {
    //setInterval(showMessages, 3000);
}

function sendMessage () {
    const message = document.querySelector('input').value;
}

function error () {

}



