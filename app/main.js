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