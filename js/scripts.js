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

    return {
        add: add,
        getAll: getAll
    };

})();

pokemonRepository.getAll().forEach(function(pokemon) {
    
    document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')')

    if (pokemon.height > 4) {
        document.write(' - Wow, that\'s big! </p>')
    } else {
        document.write('</p>')
    }
});