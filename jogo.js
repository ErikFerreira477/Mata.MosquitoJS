//função para começar o jogo (verifica se o nivel foi selecionado)

function iniciarJogo() {
    let nivel = document.getElementById("select").value;

    if (nivel === "") {
        alert("Selecione um nível para iniciar o jogo");
        return false;
    }

    //forçando o redirecionamento de página
    window.location.href = "app.html?" + nivel;
}

let altura = 0;
let largura = 0;
let vid = 1;
let tempo = 15;
let criaMosquitoTempo = 1500;

//recuperando a variavel que pega o nivel escolhido
//o search pega a partir da interrogação do link, ou seja, ele pega "?nivel"
let nivel = window.location.search;
//removendo a interrogação do parametro
nivel = nivel.replace('?', '');

if (nivel === 'normal') {
    criaMosquitoTempo = 1500;
}
else if (nivel === 'dificil') {
    criaMosquitoTempo = 1000;
}
else if (nivel === 'hardcore') {
    criaMosquitoTempo = 850;
}

function TelaDinamica() {
    altura = window.innerHeight;
    largura = window.innerWidth;
};

TelaDinamica();

let cronometro = setInterval(function () {

    tempo -= 1;

    if (tempo < 0) {
        clearInterval(cronometro);
        clearInterval(criaMosquito);
        window.location.href = 'vitória.html';
    }
    else {
        document.getElementById('cronometro').innerHTML = tempo;
    }
}, 1000);

function PosRandom() {

    //remover o Mosquito anterior caso exista
    if (document.getElementById('Mosquito')) {
        document.getElementById('Mosquito').remove();
        //game over
        if (vid > 3) {
            window.location.href = 'fim_de_jogo.html';
        }
        //pega o numero de vidas e coloca os respectivos corações vazios
        document.getElementById('v' + vid).src = "/imagens/coracao_vazio.png";

        vid++;
    }
    //posições randomicas do Mosquito
    let posiçãoX = Math.floor(Math.random() * largura) - 90;
    let posiçãoY = Math.floor(Math.random() * altura) - 90;

    //removendo a possibilidade de posições negativas
    //operador ternario é muito ruim
    posiçãoX = posiçãoX < 0 ? 0 : posiçãoX;
    posiçãoY = posiçãoY < 0 ? 0 : posiçãoY;

    //criando elemento
    let Mosquito = document.createElement('img');
    Mosquito.src = '/imagens/mosquito.png';
    Mosquito.className = tamanhoAleatorio() + ladoAleatorio();
    Mosquito.style.left = posiçãoX + 'px';
    Mosquito.style.top = posiçãoY + 'px';
    Mosquito.style.position = 'absolute';
    Mosquito.id = 'Mosquito';
    Mosquito.onclick = function () {
        this.remove();
    }

    //cria o Mosquito
    document.body.appendChild(Mosquito);
}

//gera um tamanho aleatorio pro Mosquito
function tamanhoAleatorio() {
    let classe = Math.floor(Math.random() * 3);

    if (classe == 0) {
        return 'Mosquito1 ';
    }
    else if (classe == 1) {
        return 'Mosquito2 ';
    }
    else if (classe == 2) {
        return 'Mosquito3 ';
    }
}

//altera o lado do Mosquito dinamicamente
function ladoAleatorio() {
    let c = Math.floor(Math.random() * 2);

    if (c == 0) {
        return 'ladoA';
    }
    else if (c == 1) {
        return 'ladoB';
    }
}