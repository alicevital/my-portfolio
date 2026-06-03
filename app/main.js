function enviarMensagem(event) {

    event.preventDefault()

    const nome = document.getElementById('nome').value;
    const mensagem = document.getElementById('mensagem').value;
    const telefone = '5581987940160'
    const texto = `Olá! Me chamo ${nome}, ${mensagem}`
    const msgformatada = encodeURIComponent(texto)
    const url = `https://wa.me/${telefone}?text=${msgformatada}`

        window.open(url, '_blank')
    }

let eventoAtual = 0;
const eventos = document.querySelectorAll(".evento-card");

function mostrarEvento(index) {
    eventos.forEach(evento => evento.classList.remove("ativo"));

    if (index >= eventos.length) {
        eventoAtual = 0;
    } else if (index < 0) {
        eventoAtual = eventos.length - 1;
    } else {
        eventoAtual = index;
    }

    eventos[eventoAtual].classList.add("ativo");
}

function mudarEvento(direcao) {
    mostrarEvento(eventoAtual + direcao);
}

setInterval(() => {
    const eventoAtivo = document.querySelector(".evento-card.ativo");
    const fotos = eventoAtivo.querySelectorAll(".foto-evento");

    let fotoAtual = Array.from(fotos).findIndex(foto => foto.classList.contains("ativa"));

    fotos[fotoAtual].classList.remove("ativa");

    fotoAtual = (fotoAtual + 1) % fotos.length;

    fotos[fotoAtual].classList.add("ativa");
}, 2000);