let ultimaMensagem;
let nomeUsuario;
let destinoSelecionado = "Todos";
let tipoDeMensagem = "";
let descricaoDaMensagem = document.querySelector(".digitar-mensagem p");
bemVindo();

function bemVindo(){
carregarHistorico();
setInterval(carregarHistorico, 3000);
setInterval (manterConexao, 4500);
setInterval (checarUsuarios, 10000);
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
            if( historico[i].to == nomeUsuario || historico[i].from == nomeUsuario){
                tipo = "comentario reservado";
           destino = ` para <b>${historico[i].to}</b>:`;
            }else{
                continue
            }
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
function manterConexao(){
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", { name: nomeUsuario })
}
function mostrarSide(){
    const sidebar = document.querySelector(".popup")
    sidebar.classList.remove("escondido");
}
function escondeSide(){
    const chat = document.querySelector(".popup")
    chat.classList.add("escondido")
}
function enviarMensagem(){
    const mensagem = document.getElementById("enviar");
    if(destinoSelecionado == "Todos"){
        const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", {
            from: nomeUsuario,
            to: "Todos",
            text: mensagem.value,
            type: tipoDeMensagem
        })
    mensagem.value = "";
    }else if(destinoSelecionado != "Todos" && tipoDeMensagem == ""){
        const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", {
            from: nomeUsuario,
            to: destinoSelecionado,
            text: mensagem.value,
            type: "message"
        })
    mensagem.value = "";
    }else{
        const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", {
            from: nomeUsuario,
            to: destinoSelecionado,
            text: mensagem.value,
            type: tipoDeMensagem
        })
    mensagem.value = "";
    }
}
function checarUsuarios(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    promise.then(imprimirUsuarios)
}
function imprimirUsuarios(resposta){
    const info = resposta.data;
    const listaParticipantes = document.querySelector(".lista");
    listaParticipantes.innerHTML = `<div class="contato" onclick="destinatario(this)">
    <ion-icon name="people"></ion-icon>
    <div class="user"><h3>Todos</h3><ion-icon name="checkmark-sharp"></ion-icon></div>
  </div>`
    for(i = 0; i < info.length ; i++){

        listaParticipantes.innerHTML += `<div class="contato" onclick="destinatario(this)">
                <ion-icon name="people"></ion-icon>
                <div class="user" ><h3>${info[i].name}</h3><ion-icon name="checkmark-sharp"></ion-icon></div>
              </div>`
    }
}

function destinatario(destino){
    const usuarioSelecionado = document.querySelector(".contato.selecionado");
        if(usuarioSelecionado !== null){
            usuarioSelecionado.classList.remove("selecionado");
        }
    destino.classList.add("selecionado");
    destinoSelecionado = destino.querySelector("h3").innerHTML;   
    descricaoDaMensagem.innerHTML = `Enviando para ${destinoSelecionado}`
}

function privacidade(estilo){
    const estiloSelecionado = document.querySelector(".estilo.selecionado");
        if(estiloSelecionado !== null){
            estiloSelecionado.classList.remove("selecionado")
        }
    estilo.classList.add("selecionado");
    let tipoSelecionado = estilo.querySelector("h3").innerHTML;

        if(tipoSelecionado == "Reservadamente"){
            tipoDeMensagem = "private_message";
        }

        if(tipoSelecionado == "Público"){
            tipoDeMensagem = "message";
        }
        descricaoDaMensagem.innerHTML = `Enviando para ${destinoSelecionado} (${tipoSelecionado})`
}