const produtos = [
    {
        id: 1,
        nome: "Camisa Real Madrid",
        descricao: "Camisa tradicional do Real Madrid nas cores clássicas do clube.",
        preco: 349.90,
        imagem: "imagens_ferrari/camisa.jpg",
        alt: "Camisa do Real Madrid"
    },
    {
        id: 2,
        nome: "Camisa de Treino",
        descricao: "Modelo inspirado nos uniformes utilizados pelos jogadores durante os treinamentos.",
        preco: 299.90,
        imagem: "imagens_ferrari/camisat.jpg",
        alt: "Camisa de treino do Real Madrid"
    },
    {
        id: 3,
        nome: "Boné Real Madrid",
        descricao: "Boné com o escudo do Real Madrid para completar seu visual de torcedor.",
        preco: 129.90,
        imagem: "imagens_ferrari/bone.jpg",
        alt: "Boné do Real Madrid"
    }
];

let carrinho = [];

const listaProdutos = document.getElementById("lista-produtos");
const painelCarrinho = document.getElementById("painel-carrinho");
const fundoCarrinho = document.getElementById("fundo-carrinho");
const itensCarrinho = document.getElementById("itens-carrinho");
const quantidadeCarrinho = document.getElementById("quantidade-carrinho");
const totalCarrinho = document.getElementById("total-carrinho");
const botaoFinalizar = document.getElementById("finalizar-compra");
const avisoProduto = document.getElementById("aviso-produto");

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function mostrarProdutos() {
    listaProdutos.innerHTML = produtos.map(produto => `
        <article class="product-card">
            <div class="product-image">
                <img src="${produto.imagem}" alt="${produto.alt}" loading="lazy">
            </div>
            <div class="product-info">
                <h3>${produto.nome}</h3>
                <p class="product-description">${produto.descricao}</p>
                <p class="product-price">${formatarPreco(produto.preco)}</p>
                <button class="product-button" type="button" data-adicionar="${produto.id}">
                    Adicionar ao carrinho
                </button>
            </div>
        </article>
    `).join("");
}

function adicionarAoCarrinho(id) {
    const produto = produtos.find(item => item.id === id);
    if (!produto) return;

    const itemNoCarrinho = carrinho.find(item => item.id === id);

    if (itemNoCarrinho) {
        itemNoCarrinho.quantidade++;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

    atualizarCarrinho();
    mostrarAviso(`${produto.nome} foi adicionado ao carrinho!`);
}

function alterarQuantidade(id, alteracao) {
    const item = carrinho.find(produto => produto.id === id);
    if (!item) return;

    item.quantidade += alteracao;

    if (item.quantidade <= 0) {
        carrinho = carrinho.filter(produto => produto.id !== id);
    }

    atualizarCarrinho();
}

function removerDoCarrinho(id) {
    carrinho = carrinho.filter(produto => produto.id !== id);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const quantidadeTotal = carrinho.reduce(
        (soma, produto) => soma + produto.quantidade, 0
    );

    const valorTotal = carrinho.reduce(
        (soma, produto) => soma + produto.preco * produto.quantidade, 0
    );

    quantidadeCarrinho.textContent = quantidadeTotal;
    totalCarrinho.textContent = formatarPreco(valorTotal);
    botaoFinalizar.disabled = carrinho.length === 0;

    if (carrinho.length === 0) {
        itensCarrinho.innerHTML = `
            <p class="cart-empty">
                Seu carrinho está vazio. Escolha um produto para começar!
            </p>
        `;
        return;
    }

    itensCarrinho.innerHTML = carrinho.map(produto => `
        <div class="cart-item">
            <img src="${produto.imagem}" alt="${produto.alt}">
            <div>
                <h3>${produto.nome}</h3>
                <p class="cart-item-price">${formatarPreco(produto.preco)}</p>
                <div class="cart-item-actions">
                    <button type="button" data-diminuir="${produto.id}" aria-label="Diminuir quantidade">−</button>
                    <strong>${produto.quantidade}</strong>
                    <button type="button" data-aumentar="${produto.id}" aria-label="Aumentar quantidade">+</button>
                    <button type="button" class="remover-item" data-remover="${produto.id}">Remover</button>
                </div>
            </div>
        </div>
    `).join("");
}

function abrirCarrinho() {
    painelCarrinho.classList.add("aberto");
    fundoCarrinho.classList.add("ativo");
    painelCarrinho.setAttribute("aria-hidden", "false");
    document.body.classList.add("carrinho-aberto");
}

function fecharCarrinho() {
    painelCarrinho.classList.remove("aberto");
    fundoCarrinho.classList.remove("ativo");
    painelCarrinho.setAttribute("aria-hidden", "true");
    document.body.classList.remove("carrinho-aberto");
}

let temporizadorAviso;

function mostrarAviso(mensagem) {
    avisoProduto.textContent = mensagem;
    avisoProduto.classList.add("visivel");

    clearTimeout(temporizadorAviso);
    temporizadorAviso = setTimeout(() => {
        avisoProduto.classList.remove("visivel");
    }, 2500);
}

listaProdutos.addEventListener("click", evento => {
    const botao = evento.target.closest("[data-adicionar]");
    if (!botao) return;

    adicionarAoCarrinho(Number(botao.dataset.adicionar));
});

itensCarrinho.addEventListener("click", evento => {
    const aumentar = evento.target.closest("[data-aumentar]");
    const diminuir = evento.target.closest("[data-diminuir]");
    const remover = evento.target.closest("[data-remover]");

    if (aumentar) alterarQuantidade(Number(aumentar.dataset.aumentar), 1);
    if (diminuir) alterarQuantidade(Number(diminuir.dataset.diminuir), -1);
    if (remover) removerDoCarrinho(Number(remover.dataset.remover));
});

document.getElementById("abrir-carrinho").addEventListener("click", abrirCarrinho);
document.getElementById("fechar-carrinho").addEventListener("click", fecharCarrinho);
fundoCarrinho.addEventListener("click", fecharCarrinho);

document.addEventListener("keydown", evento => {
    if (evento.key === "Escape") fecharCarrinho();
});

botaoFinalizar.addEventListener("click", () => {
    if (carrinho.length === 0) {
        mostrarAviso("Adicione pelo menos um produto ao carrinho.");
        return;
    }

    const resumo = carrinho
        .map(produto => `${produto.quantidade}x ${produto.nome}`)
        .join("\n");

    const total = carrinho.reduce(
        (soma, produto) => soma + produto.preco * produto.quantidade, 0
    );

    alert(
        "RESUMO DO PEDIDO\n\n" +
        resumo +
        "\n\nTotal: " + formatarPreco(total) +
        "\n\nEsta é uma demonstração escolar. Nenhuma compra ou pagamento foi realizado."
    );
});

mostrarProdutos();
atualizarCarrinho();
