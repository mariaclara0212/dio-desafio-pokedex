//LISTAGEM PRINCIPAL
//PEGANDO A LISTA EM HTML 
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const details = document.getElementById('idDetails')

const maxRecords = 151
const limit = 10
let offset = 0;






function loadPokemonItens(offset, limit) {

    //TRANSFORMANDO UMA LISTA DE POKEMONS, EM OUTRA LISTA
    pokeApi.getPokemons(offset, limit).then((pokemons = []) =>  {

        const newHtml = pokemons.map((pokemon) => `
        
            <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span> <!-- Número do Pokemon -->
            <span class="name">${pokemon.name}</span>  <!-- Nome do Pokemon -->

            <div class="detail"> 
                <!-- Lista de TYPES do Pokemon -->
                <ol class="types"> 
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                
                <img src="${pokemon.photo}"
                alt="${pokemon.name}"> 
            
            </div>

        </li>

        `).join('')

        //MAPEIA A LISTA DE POKEMONS E CONVERTE EM UMA LI
        pokemonList.innerHTML += newHtml

    })  
}


loadPokemonItens(offset, limit)

//Quando clicar no botão
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    //Limitando a quantidade de pokemons para somente a primeira geração - 151
    if (qtdRecordNextPage >= maxRecords) { //se a qtd de records da próxima página, for maior e o máximo de records
        //calcula um novo limíte
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        //removendo o botão - pegando o pai e removendo
        loadMoreButton.parentElement.removeChild(loadMoreButton)

    } else { //senão

        //buscando a próxima página
        loadPokemonItens(offset, limit)

    }


    
})

details.addEventListener('click', () => {
    window.location='pokemon-details.html'
})


//ENCADEAMENTO DE .then -> sempre o que vai para o segundo .then é o retorno do primeiro