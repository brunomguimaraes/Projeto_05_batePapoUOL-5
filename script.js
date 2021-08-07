let messages = [];

getMessages();

function getMessages() {
    const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v3/uol/messages");

    promise.then(loadMessages);
    promise.catch(error);

    showMessages();
}

function loadMessages (response) {
    messages = response.data;
    console.log("Resposta", response.data);
    
}

function showMessages () {
    /*for (let i = 0; i < response.data.length; i++) {
        
        const message = document.querySelector('ul')
        message.innerHTML += ``
        
    }*/
}

function sendMessage () {
    const message = document.querySelector('input').value;
}

function error () {

}



