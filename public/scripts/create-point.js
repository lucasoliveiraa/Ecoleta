
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {

        for( const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getcities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value 

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.innerHTML = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
       


        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getcities)

// Itens de coleta
// pegar todos od Li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelecteditem)
}


const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelecteditem(event) {
    const itemLi = event.target

    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = event.target.dateset.id

    // verficar se existem itens, tirar de sseleção
    //pegar so itens selecionados

    const alreadySelect = selectedItems.findIndex( item => {
        const itemFound = item == itemId    // isso será true ou false
        return itemFound
    })

    // se já estiver selecionado, tirar da seleção
    if( alreadySelect >= 0 ) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }
    
    // atualizar o campo escondido com os items selecionados
    collectedItems.value = selectedItems

}