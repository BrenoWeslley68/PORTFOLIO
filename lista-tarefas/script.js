let contador = 0;
let input = document.getElementById('inputTarefa');
let btnAdd = document.getElementById('btn-add');
let main = document.getElementById('areaLista');

function addTarefa() {
    let valorInput = input.value;
    if (valorInput !== '' && valorInput !== null && valorInput !== undefined) {
        ++contador;
        // Alterado: A função `checar` é chamada apenas ao clicar na div `.item`, não em cada parte do item individualmente
        let novoItem = `<div id="${contador}" class="item" onclick="checar(${contador})">
            <div class="item-icone">
                <input type="checkbox" id="itemclicado${contador}">
            </div>
            <div class="item-nome">
                ${valorInput}
            </div>
            <div class="item-botao">
                <button onclick="Deletar(${contador})" class="delete">
                    <span class="material-symbols-outlined">delete</span>Deletar
                </button>
            </div>
        </div>`;
        main.innerHTML += novoItem;
        input.value = '';
        input.focus();
    }
}

function checar(id) {
    let item = document.getElementById(id);
    let checkbox = document.getElementById('itemclicado' + id);
    item.parentNode.appendChild(item)
    // Alterna o estado do checkbox
    checkbox.checked = !checkbox.checked;
    
    // Adiciona ou remove a classe 'clicado' com base no estado do checkbox
    if (checkbox.checked) {
        item.classList.add('clicado');
    } else {
        item.classList.remove('clicado');
    }
}

function Deletar(id) {
    let tarefa = document.getElementById(id);
    tarefa.remove();
}

function marcarTarefa(id) {
    let item = document.getElementById(id);
    let checkbox = document.getElementById('itemclicado' + id);

    if (checkbox.checked) {
        item.classList.add('clicado');
    } else {
        item.classList.remove('clicado');
    }
}

input.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        btnAdd.click();
    }
});
