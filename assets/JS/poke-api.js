// CONEXÃO COM A API
//DECLARANDO UM OBJETO
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    const [ability] = abilities
    pokemon.ability=ability
    pokemon.experience=pokeDetail.base_experience;
    pokemon.height=pokeDetail.height;
    pokemon.weight=pokeDetail.weight;

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    //pegando a url do pokemon
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then((pokeDetail)=>convertPokeApiDetailToPokemon(pokeDetail))
}

//adicionando método-arrow função ao objeto
pokeApi.getPokemons = (offset = 0, limit = 30) => {

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    // Buscando a lista de pokemons
    return fetch(url)
        //pegando a lista de pokemons
        .then((response) => response.json())
        // pegando os resultados da lista
        .then((jsonBody => jsonBody.results)) 
        //mapeando as requisições da lista de detalhes dos pokemons
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        //pegando a lista de requisições de detalhes
        .then((detailRequests) => Promise.all(detailRequests))
        //Diferente
        .then((pokemonsDetails) => pokemonsDetails)
}

//TRANSFORMANDO A LISTA DE POKEMONS EM UMA LISTA DE NOVAS REQUISIÇÕES
/*Promise.all([
    fetch('https://pokeapi.co/api/v2/pokemon/1'),
    fetch('https://pokeapi.co/api/v2/pokemon/2'),
    fetch('https://pokeapi.co/api/v2/pokemon/3'),
    fetch('https://pokeapi.co/api/v2/pokemon/4')
]).then((results) => {
    console.log(results)
}) */