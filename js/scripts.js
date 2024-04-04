// IIFE
let pokemonRepository = (function () {  

    // create Pokemon array
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

    // make sure new Pokemon info is consistent
    function isValidPokemon(pokemon) {  
        return (
            typeof pokemon === 'object' &&
            Object.keys(pokemon).length === 3 &&
            'name' in pokemon &&
            'height' in pokemon &&
            'types' in pokemon &&
            Array.isArray(pokemon.types)
        );
    }
        
    // adds pokemon to array if in valid format
    function add(pokemon) {
        if (isValidPokemon(pokemon)) {
            pokemonList.push(pokemon);
        } else {
            console.log('Error: Pokemon information is incorrect');
        }
    }

    // 'exports' Pokemon array outside of IIFE
    function getAll() {
        return pokemonList;
    }

    // Create list on page as buttons
    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listPokemon = document.createElement('li');

        // create Pokemon button
        let button = document.createElement('button');  
        button.innerText = pokemon.name;
        button.classList.add('button-class');

        // add button to page (as last child)
        listPokemon.appendChild(button);    
        pokemonList.appendChild(listPokemon);

        // listen for button click
        button.addEventListener('click', () => showDetails(pokemon));

    }

    // show Pokemon details on button click
    function showDetails(pokemon) {
        console.log(pokemon);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };

})();

// forEach loop - goes through full Pokemon array
pokemonRepository.getAll().forEach(function(pokemon) {  
    pokemonRepository.addListItem(pokemon);

});