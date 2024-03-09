// Seleciona os elementos HTML relevantes e atribui-os a variáveis
var texto = document.querySelector('#inp_inserir');
const inserir = document.querySelector('.inserir button');
const btnDeleteAll = document.querySelector('.header button');
const ul = document.querySelector('ul');

// Declara um array vazio para armazenar os itens da lista
var itensDB = [];

// Função para excluir todos os itens da lista
btnDeleteAll.onclick = () => {
    // Limpa a matriz de itens
    itensDB = [];
    // Chama a função para atualizar o localStorage e a interface
    updateDB();
}


// Evento de tecla "Enter" no campo de texto para adicionar um item
texto.addEventListener('keypress', e => {
    console.log(e.key)
    if (e.key === 'Enter') {
        e.preventDefault(); // Evita que a tecla "Enter" cause uma quebra de linha no campo de texto
        addItem();
    }
});

function addItem() {
    var texto = document.querySelector('#inp_inserir');
    console.log(texto)

    
    if (texto.value.trim() !== '') {
        if (itensDB.length >= 50) {
            alert('Limite máximo de 50 itens atingido!');
            return;
        }
    
        const newText = texto.value.trim();
    
        if (newText !== '') {
            // Adiciona um objeto representando o item à matriz de itens
            itensDB.push({ 'item': newText, 'status': '', 'fixado': false });
            texto.value = ""
            // Chama a função para atualizar o localStorage e a interface
            updateDB();
        }   
    }
}

// Evento de clique no botão "Inserir" para adicionar um item
inserir.addEventListener("click",  addItem)


// Função para atualizar o localStorage com a matriz de itens
function updateDB() {
    localStorage.setItem('todolist', JSON.stringify(itensDB));
    // Chama a função para carregar os itens da lista
    loadItens();
}

// Função para carregar os itens da lista a partir do localStorage
function loadItens() {
    ul.innerHTML = "";
    // Lê os itens do localStorage ou inicializa uma matriz vazia se não houver nada
    itensDB = JSON.parse(localStorage.getItem('todolist')) ?? [];
    itensDB.forEach((item, i) => {
        // Insere o item na interface
        insertItemTela(item.item, item.status, i);
    })
}

// Função para inserir um item na interface
function insertItemTela(text, status, i) {
    const li = document.createElement('li');
    li.setAttribute("data-busca", text)

    li.innerHTML = `
    <div class="divLi">
      <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
      <span data-si=${i}>${text}</span>
      <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
      <button onclick="editItem(${i})" data-i=${i}>Editar</button>
    </div>
    `;

    ul.appendChild(li);

    // ... Restante do código
}


// Função para marcar um item como concluído ou não concluído
function done(chk, i) {
    if (chk.checked) {
        itensDB[i].status = 'checked'
    } else {
        itensDB[i].status = ''
    }

    // Chama a função para atualizar o localStorage
    updateDB()
}

// Função para remover um item da lista
function removeItem(i) {
    itensDB.splice(i, 1)
    // Chama a função para atualizar o localStorage
    updateDB()
}

// Carrega os itens da lista ao carregar a página
loadItens()


//EDITOR DE TEXTO

// Crie uma cópia dos itens originais
var originalItems = document.querySelectorAll('.notas li');

document.getElementById('inp_busca').addEventListener('input', function() {
    // Obtém o texto digitado pelo usuário
    var searchText = this.value.toLowerCase();
    
    // Obtém todos os itens da lista
    var items = document.querySelectorAll('.notas li');

    // Se o campo de pesquisa estiver vazio, mostre os itens originais
    if (searchText === '') {
        for (var i = 0; i < originalItems.length; i++) {
            originalItems[i].style.display = 'block';
        }
        return; // Saia da função para evitar a execução adicional do código
    }

    // Loop pelos itens para verificar se eles contêm o texto pesquisado
    for (var i = 0; i < items.length; i++) {
        var itemText = items[i].getAttribute("data-busca")
        
        // Se o texto do item da lista contiver o texto pesquisado, exiba-o
        if (itemText.indexOf(searchText) != -1) {
            items[i].style.display = 'block';
        } else {
            items[i].style.display = 'none'; // Oculta os itens que não correspondem à pesquisa
        }
    }
});
