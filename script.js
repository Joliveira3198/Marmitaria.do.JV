let carrinho = [];
let total = 0;

function adicionarItem(nome, preco) {
    carrinho.push({ nome, preco });
    total += preco;
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById('lista-carrinho');
    const totalElemento = document.getElementById('total');
    lista.innerHTML = '';
    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$ ${item.preco}`;
        lista.appendChild(li);
    });
    totalElemento.textContent = total.toFixed(2);
}

function mostrarSecao(secaoId) {
    document.querySelectorAll('.secao').forEach(secao => {
        secao.classList.remove('ativa');
    });
    document.getElementById(secaoId).classList.add('ativa');
}

const saboresPorDia = {
    1: ["Frango Grelhado", "Carne de Panela", "Vegetariana"],
    2: ["Estrogonofe de Frango", "Peixe Assado", "Veggie"],
    3: ["Carne Moída", "Frango à Parmegiana", "Vegano"],
    4: ["Frango Xadrez", "Carne Assada", "Vegetariana"],
    5: ["Peixe Frito", "Frango ao Curry", "Veggie"]
};

function atualizarSabores() {
    const lista = document.getElementById('lista-sabores');
    const mensagem = document.getElementById('mensagem-fim-semana');
    lista.innerHTML = '';
    const dia = new Date().getDay(); // 0 = Domingo, 1 = Segunda ...
    if (dia >= 1 && dia <= 5) {
        mensagem.style.display = 'none';
        saboresPorDia[dia].forEach(sabor => {
            const li = document.createElement('li');
            li.textContent = sabor;
            lista.appendChild(li);
        });
    } else {
        mensagem.style.display = 'block';
    }
}

window.onload = atualizarSabores;