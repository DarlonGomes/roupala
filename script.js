function login(){
    const usuario = document.getElementById("login").value;
    const nome = document.querySelector(".capa input");
    const botao = document.querySelector(".capa button")
    const load = document.querySelector(".loading")
    nome.classList.add("escondido");
    botao.classList.add("escondido");
    load.classList.remove("escondido");
    setTimeout(carregarChat, 3000);

}

function carregarChat(){
const login = document.querySelector(".capa")
const paginaChat = document.querySelector(".conversa")
login.classList.add("escondido");
paginaChat.classList.toggle("escondido");

}