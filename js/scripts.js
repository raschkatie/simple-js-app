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
    }
];

for (let i = 0; i < pokemonList.length; i++) {
    
    document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')')

    if (pokemonList[i].height > 4) {
        document.write(' - Wow, that\'s big! </p>')
    } else {
        document.write('</p>')
    }
}