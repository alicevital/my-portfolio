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

/* ==================================================
   PREFERÊNCIA DE MOVIMENTO
================================================== */

const prefereMenosMovimento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


/* ==================================================
   FUNDO 3D COM VANTA.NET
================================================== */

let efeitoVanta = null;

if (
    !prefereMenosMovimento &&
    window.VANTA &&
    window.VANTA.NET
) {
    efeitoVanta = window.VANTA.NET({
        el: "#inicio",

        mouseControls: true,
        touchControls: true,
        gyroControls: false,

        minHeight: 200,
        minWidth: 200,

        scale: 1,
        scaleMobile: 1,

        color: 0xcf291d,
        backgroundColor: 0x000000,

        points: 6,
        maxDistance: 18,
        spacing: 18,

        showDots: true
    });
}


/* ==================================================
   ELEMENTOS APARECENDO DURANTE A ROLAGEM
================================================== */

function configurarAnimacao(
    seletor,
    animacao,
    atraso = 0
) {
    const elementos = document.querySelectorAll(seletor);

    elementos.forEach((elemento, indice) => {
        elemento.setAttribute("data-aos", animacao);

        if (atraso > 0) {
            const atrasoCalculado = (indice % 10) * atraso;

            elemento.setAttribute(
                "data-aos-delay",
                String(atrasoCalculado)
            );
        }
    });
}


/* Títulos das seções */

configurarAnimacao(
    ".sobre-titulo, " +
    ".tec-titulo, " +
    ".projetos-titulo, " +
    ".eventos-titulo, " +
    ".contatos-titulo",
    "fade-up"
);


/* Blocos principais */

configurarAnimacao(
    ".sobre-caixa, " +
    ".eventos-descricao, " +
    ".eventos-slider, " +
    ".formulario-contato",
    "fade-up"
);


/* Tecnologias aparecem gradualmente */

configurarAnimacao(
    ".tec-item",
    "zoom-in",
    50
);


/*
Usamos apenas fade nos projetos para não interferir
no movimento de hover que seus cards já possuem.
*/

configurarAnimacao(
    ".projetos-card",
    "fade",
    100
);


/* Rodapé */

configurarAnimacao(
    ".footer-paragrafo, .footer-links",
    "fade-up"
);


/* Inicialização do AOS */

if (window.AOS) {
    window.AOS.init({
        duration: 700,
        easing: "ease-out-cubic",
        offset: 60,

        /* Cada elemento anima apenas uma vez */
        once: true,

        /* Não faz a animação reversa ao subir a página */
        mirror: false,

        disable: prefereMenosMovimento
    });
}


/* Limpeza do efeito quando a página for fechada */

window.addEventListener("beforeunload", () => {
    if (efeitoVanta) {
        efeitoVanta.destroy();
    }
});

const secoes = document.querySelectorAll("main[id], section[id]");
const linksMenu = document.querySelectorAll(".menu-link");

const observerMenu = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const idSecao = entry.target.getAttribute("id");

                linksMenu.forEach((link) => {
                    link.classList.remove("ativo");

                    const href = link.getAttribute("href");
                    if (href === `#${idSecao}`) {
                        link.classList.add("ativo");
                    }
                });
            }
        });
    },
    {
        threshold: 0.5
    }
);

secoes.forEach((secao) => {
    observerMenu.observe(secao);
});