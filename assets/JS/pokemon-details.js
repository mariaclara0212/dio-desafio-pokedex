const detailList = document.getElementById('listDetails')

//trocar para back
const back = document.getElementById('bDetails')


const loadDetails = document.getElementById('loadMoreDetails')

const maxRecords = 151
const limit = 10;
let offset = 0;

function loadPokemonDetails(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) =>  {
        detailList.innerHTML += pokemons.map((pokemon) => `
        
        <div class="pokemonsDetails">
        <li class="listDetails" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span> <!-- Número do Pokemon -->
            <span class="name">${pokemon.name}</span>

            <div class="detail"> 
                <!-- Lista de TYPES do Pokemon -->
                <ol class="types"> 
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                
                <img src="${pokemon.photo}"
                alt="${pokemon.name}"> 
            
            </div>
        </li>    

        <div class="allDetails">
    <div class="description">
                <ul class="dList">
                    
                    <li>Ability:  </li>
                    <li>Experience:  </li>
                    <li>Height:  </li>
                    <li>Weight:  </li>
                    
                </ul>
            </div>

    <div class="description">
                <ul class="dList">
                    
                    <li>${pokemon.ability}</li>
                    <li>${pokemon.experience}</li>
                    <li>${pokemon.height}</li>
                    <li>${pokemon.weight}</li>
            
                </ul>
            </div>
        </div>
    </div>

       
        `).join('')
        
    })

}

loadPokemonDetails(offset, limit)

//ADICIONANDO AÇÃO AO BOTÃO DETAILS
loadDetails.addEventListener('click', () => {
    offset += limit;

    const qtdRecordNextPage = offset + limit;

    //Limitando a quantidade de pokemons para somente a primeira geração - 151
    if (qtdRecordNextPage >= maxRecords) { //se a qtd de records da próxima página, for maior e o máximo de records
        //calcula um novo limíte
        const newLimit = maxRecords - offset
        loadPokemonDetails(offset, newLimit)

        //removendo o botão - pegando o pai e removendo
        loadDetails.parentElement.removeChild(loadDetails)

    } else { //senão

        //buscando a próxima página
        loadPokemonDetails(offset, limit)

    }

})

back.addEventListener('click', () => {
    window.location='index.html'
})