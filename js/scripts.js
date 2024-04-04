// IIFE
let pokemonRepository = (function () {  

    // create Pokemon array
    let pokemonList = [];
    // access API with Pokemon database
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // make sure new Pokemon info is correct and consistent
    function isValidPokemon(pokemon) {  
        return (
            typeof pokemon === 'object' &&
            Object.keys(pokemon).length === 2 &&
            'name' in pokemon &&
            'detailsUrl' in pokemon
        );
    }
        
    // adds pokemon to array if in valid format
    function add(pokemon) {
        if (isValidPokemon(pokemon)) {
            pokemonList.push(pokemon);
        } else {
            console.log('Error: ' + pokemon.name + ' information is incorrect');
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

    // load API / Pokemon database
    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function(json) {
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                hideLoadingMessage();
            });
        }).catch(function(e) {
            console.error(e);
        })
    }

    // fetch specific details for Pokemon
    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            hideLoadingMessage();
        }).catch(function(e) {
            console.error(e);
        });
    }

    // show Pokemon details on button click
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            console.log(pokemon);
        });
    }

    // 'exports' all functions in IIFE
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };

})();

// forEach loop - loads list, then goes through full Pokemon array
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {  
        pokemonRepository.addListItem(pokemon);
    });
});


});