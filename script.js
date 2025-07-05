
let carrinho = [];
function adicionarAoCarrinho(nome, preco, imagem) {
    const item = carrinho.find(p => p.nome === nome);
    if (item) {
        item.qtd += 1;
    } else {
        carrinho.push({ nome, preco, imagem, qtd: 1 });
    }
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById("itens-carrinho");
    lista.innerHTML = "";
    let total = 0;
    carrinho.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = \`
            <img src="\${item.imagem}" width="40" style="vertical-align:middle; border-radius:5px;"> 
            <strong>\${item.qtd}x</strong> \${item.nome} - R$ \${(item.preco * item.qtd).toFixed(2)}
        \`;
        lista.appendChild(li);
        total += item.preco * item.qtd;
    });
    document.getElementById("total").textContent = total.toFixed(2);
}
