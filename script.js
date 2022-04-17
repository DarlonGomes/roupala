
function tratarSucesso(resposta){
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
}

const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
promise.then(tratarSucesso);
promise.catch(tratarFalha);