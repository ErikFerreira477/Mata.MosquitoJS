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