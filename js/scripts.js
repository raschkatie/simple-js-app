let pokemonList = [
    {
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
        type: ['psychic', 'fairy']
        types: ['psychic', 'fairy']
    }
];

pokemonList.forEach(function(pokemon) {
    
    document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ')')

    if (pokemon.height > 4) {
        document.write(' - Wow, that\'s big! </p>')
    } else {
        document.write('</p>')
    }
});