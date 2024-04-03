let pokemonRepository = (function () {  // IIFE - create Pokemon array

    let pokemonList = [ {
        name: 'Oddish', 
        height: 1.08, 
        types: ['grass', 'poison']
    }, 
    {
        name: 'Kakuna', 
        height: 2.0, 
        types: ['bug', 'poison']
    }, 
    {
        name: 'Gardevoir', 
        height: 5.03, 
        types: ['psychic', 'fairy']
    }];

    function isValidPokemon(pokemon) {  // make sure new Pokemon info is consistent
        return (
            typeof pokemon === 'object' &&
            Object.keys(pokemon).length === 3 &&
            'name' in pokemon &&
            'height' in pokemon &&
            'types' in pokemon &&
            Array.isArray(pokemon.types)
        );
    }
        
    function add(pokemon) {
        if (isValidPokemon(pokemon)) {
            pokemonList.push(pokemon);
        } else {
            console.log('Error: Pokemon information is incorrect');
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');

        let button = document.createElement('button');  // create Pokemon button
        button.innerText = pokemon.name;
        button.classList.add('button-class');

        listPokemon.appendChild(button);    // add button to page (as last child)
        pokemonList.appendChild(listPokemon);

        button.addEventListener('click', () => showDetails(pokemon));

    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };

})();

pokemonRepository.getAll().forEach(function(pokemon) {  // forEach loop - goes through full Pokemon array
    pokemonRepository.addListItem(pokemon);

});