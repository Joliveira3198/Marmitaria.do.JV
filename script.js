const saboresSemana = {
    'Segunda': ['Frango Grelhado', 'Carne Assada', 'Peixe'],
    'Terça': ['Feijoada', 'Bife à Parmegiana', 'Strogonoff'],
    'Quarta': ['Frango Xadrez', 'Costela Assada', 'Lasanha'],
    'Quinta': ['Camarão', 'Carne de Sol', 'Yakissoba'],
    'Sexta': ['Pizza', 'Feijoada Light', 'Frango ao Curry']
};

function mostrarSaboresHoje() {
    const hoje = new Date().toLocaleString('pt-BR', {weekday: 'long'});
    const diaFormatado = hoje.charAt(0).toUpperCase() + hoje.slice(1);
    const sabores = saboresSemana[diaFormatado] || [];
    document.getElementById('sabores-hoje').innerHTML = sabores.length
        ? `<strong>Hoje (${diaFormatado}):</strong> ${sabores.join(', ')}`
        : 'Sem sabores disponíveis hoje.';
}
mostrarSaboresHoje();

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let historico = JSON.parse(localStorage.getItem('historico')) || [];
let pontosFidelidade = parseInt(localStorage.getItem('pontosFidelidade')) || 0;

function adicionarCarrinho(item, preco) {
    carrinho.push({nome: item, preco: preco});
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById('lista-carrinho');
    lista.innerHTML = '';
    let total = 0;
    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        lista.appendChild(li);
        total += item.preco;
    });
    document.getElementById('total').textContent = `Total: R$ ${total.toFixed(2)}`;
    verificarPromocao(total);
}

function verificarPromocao(total) {
    const promo = document.getElementById('promocao');
    if (carrinho.length >= 5) {
        promo.textContent = '🎉 Promoção: Você ganhou um selo de fidelidade válido por 30 dias!';
    } else {
        promo.textContent = '';
    }
}

function finalizarPedido() {
    if(carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    const numeroPedido = Math.floor(Math.random() * 100000);
    const numeroWhatsApp = '5585998424661';
    let mensagem = `Pedido Nº${numeroPedido}:\n`;
    let total = 0;
    carrinho.forEach(item => {
        mensagem += `${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
        total += item.preco;
    });
    mensagem += `Total: R$ ${total.toFixed(2)}\n`;
    if (carrinho.length >= 5) {
        mensagem += 'Selo de fidelidade válido por 30 dias incluído!\n';
        adicionarPontos(10); // Exemplo: 10 pontos por pedido promocional
    }
    window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`, '_blank');
    salvarHistorico(numeroPedido, carrinho, total);
    carrinho = [];
    localStorage.removeItem('carrinho');
    atualizarCarrinho();
    mostrarPontos();
}

function adicionarPontos(pontos) {
    pontosFidelidade += pontos;
    localStorage.setItem('pontosFidelidade', pontosFidelidade);
}

function salvarHistorico(id, itens, total) {
    historico.push({
        id: id,
        data: new Date().toLocaleDateString(),
        itens: itens,
        total: total
    });
    localStorage.setItem('historico', JSON.stringify(historico));
    mostrarHistorico();
}

function mostrarHistorico() {
    const lista = document.getElementById('historico');
    lista.innerHTML = '';
    historico.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `Pedido ${p.id} - ${p.data}: ${p.itens.map(i => i.nome).join(', ')} (R$ ${p.total.toFixed(2)})`;
        lista.appendChild(li);
    });
}
mostrarHistorico();

function mostrarPontos() {
    document.getElementById('pontos').textContent = `Pontos de fidelidade: ${pontosFidelidade}`;
}
mostrarPontos();

function cadastrarCliente() {
    alert('Cadastro rápido via WhatsApp realizado! Seu histórico estará disponível aqui.');
}

// Sistema de recomendação simples baseado em itens mais pedidos
function gerarRecomendacoes() {
    const recomendacoes = {};
    historico.forEach(pedido => {
        pedido.itens.forEach(item => {
            recomendacoes[item.nome] = (recomendacoes[item.nome] || 0) + 1;
        });
    });
    const itensOrdenados = Object.entries(recomendacoes).sort((a,b) => b[1] - a[1]).map(e => e[0]);
    const listaRec = document.getElementById('recomendacoes');
    listaRec.innerHTML = '';
    itensOrdenados.slice(0, 3).forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        listaRec.appendChild(li);
    });
}
gerarRecomendacoes();

function repetirUltimoPedido() {
    if(historico.length === 0) {
        alert('Nenhum pedido anterior para repetir.');
        return;
    }
    const ultimo = historico[historico.length - 1];
    carrinho = [...ultimo.itens];
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}
