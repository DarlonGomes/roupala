let ultimaMensagem;
let nomeUsuario;
bemVindo();

function bemVindo(){
carregarHistorico();
setInterval(carregarHistorico, 3000);
}

function imprimirHistorico(resposta){
    const historico = resposta.data;
    const mensagens = document.querySelector("main");
    let destino = ``;
    let tipo = ``;
    mensagens.innerHTML = ``

    for(i = 0; i < historico.length; i++){

        if(historico[i].type == "status"){
            tipo = "comentario status";
            destino = ``;

        } else if (historico[i].type == "private_message"){
           tipo = "comentario reservado";
           destino = ` para <b>${historico[i].to}</b>:`;
        } else {
            tipo = "comentario publico";
            destino = ` para <b>${historico[i].to}</b>:`;
        }
        mensagens.innerHTML += `<div class="${tipo}">
        <p><span class="hora">(${historico[i].time})</span>
         <b>${historico[i].from}</b>${destino} ${historico[i].text}
          </div>
        `
    }
    ultimaMensagemScroll();
}

function carregarHistorico(){
const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
promise.then(imprimirHistorico);
}

function ultimaMensagemScroll(){
    const mensagens = document.querySelector("main")
    const novaMensagem = mensagens.lastElementChild;
    if(ultimaMensagem != novaMensagem){
        ultimaMensagem = novaMensagem;
        novaMensagem.scrollIntoView();
    }
}

function login(){
    nomeUsuario = document.getElementById("usuario").value;

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", { name: nomeUsuario });
    
    promise.then(nomeValido);
    promise.catch(nomeInvalido);
}

function nomeValido(){
    const input = document.querySelector(".nome")
    const gif = document.querySelector(".loading")
    input.classList.remove("nome")
    input.classList.add("escondido")
    gif.classList.remove("escondido")
    setTimeout(entrarNoChat, 3000)
}

function nomeInvalido(){
    alert("Infelizmente esse nome já está em uso. Selecione outro.")
}

function entrarNoChat() {
    const interfaceLogin = document.querySelector(".inicio")
    const interfaceChat = document.querySelector(".conversa");
    interfaceLogin.classList.add("escondido")
    interfaceChat.classList.remove("escondido")
}