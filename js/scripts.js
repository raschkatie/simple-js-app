// IIFE
let pokemonRepository = (function () {  

    // create Pokemon array
    let pokemonList = [];
    // access API with Pokemon database
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=200';

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
        let pokemonList = document.querySelector('.list-group');
        let listPokemon = document.createElement('li');
        listPokemon.classList.add('list-group-item');

        // create Pokemon button
        let button = document.createElement('button');  
        button.innerText = pokemon.name;
        button.classList.add('btn-primary');
        button.setAttribute('data-target', '#exampleModal');
        button.setAttribute('data-toggle', 'modal');

        // add button to page (as last child)
        listPokemon.appendChild(button);   
        pokemonList.appendChild(listPokemon); 

        // listen for button click
        button.addEventListener('click', () => showDetails(pokemon));

    }

    // load API / Pokemon database
    function loadList() {
        // showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function(json) {
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                // hideLoadingMessage();
            });
        }).catch(function(e) {
            console.error(e);
        })
    }

    // fetch specific details for Pokemon
    function loadDetails(item) {
        // showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            // hideLoadingMessage();
        }).catch(function(e) {
            console.error(e);
        });
    }

    // create and show modal
    function showModal(pokemon) {

        // find modal-container class and create blank HTML
        let modalBody = document.querySelector('.modal-body');
        let modalHeader = document.querySelector('.modal-header');
        modalBody.innerHTML = '';

        // create text / image elements for modal
        let pokeName = document.querySelector('.modal-title');
        pokeName.innerText = pokemon.name;

        let closeButtonElement = document.querySelector('.close');

        let pokePic = document.createElement('img');
        pokePic.classList.add('pokemon-sprite');
        pokePic.src = pokemon.imageUrl;
        pokePic.alt = 'picture of ' + pokemon.name;

        let pokeHeight = document.createElement('p');
        pokeHeight.innerText = 'Height: ' + pokemon.height;

        let pokeType = document.createElement('p');
        pokeType.innerText = 'Type(s): ';

        // grab each item from Pokemon type array
        pokemon.types.forEach((element) => {
            let pokeElement = document.createElement('span');
            pokeElement.classList.add('pokemon-type');
            pokeElement.innerText = element.type.name;

            // adding class to each Pokemon type
            if (element.type.name === 'grass') {
                pokeElement.classList.add('grass-type');
            } else if (element.type.name === 'fire') {
                pokeElement.classList.add('fire-type');
            } else if (element.type.name === 'water') {
                pokeElement.classList.add('water-type');
            } else if (element.type.name === 'normal') {
                pokeElement.classList.add('normal-type');
            } else if (element.type.name === 'psychic') {
                pokeElement.classList.add('psychic-type');
            } else if (element.type.name === 'fairy') {
                pokeElement.classList.add('fairy-type');
            } else if (element.type.name === 'ice') {
                pokeElement.classList.add('ice-type');
            } else if (element.type.name === 'poison') {
                pokeElement.classList.add('poison-type');
            } else if (element.type.name === 'ghost') {
                pokeElement.classList.add('ghost-type');
            } else if (element.type.name === 'dragon') {
                pokeElement.classList.add('dragon-type');
            } else if (element.type.name === 'electric') {
                pokeElement.classList.add('electric-type');
            } else if (element.type.name === 'steel') {
                pokeElement.classList.add('steel-type');
            } else if (element.type.name === 'bug') {
                pokeElement.classList.add('bug-type');
            } else if (element.type.name === 'dark') {
                pokeElement.classList.add('dark-type');
            } else if (element.type.name === 'flying') {
                pokeElement.classList.add('flying-type');
            } else if (element.type.name === 'ground') {
                pokeElement.classList.add('ground-type');
            } else if (element.type.name === 'rock') {
                pokeElement.classList.add('rock-type');
            } else if (element.type.name === 'fighting') {
                pokeElement.classList.add('fighting-type');
            } else {
                pokeElement.classList.add('misc-type');
            }

            pokeType.appendChild(pokeElement);
        });

        // append / add elements to modal
        modalHeader.appendChild(closeButtonElement);
        modalBody.appendChild(pokePic);
        modalHeader.appendChild(pokeName);
        modalBody.appendChild(pokeHeight);
        modalBody.appendChild(pokeType);
        modalContainer.appendChild(modal);

        // add is-visible class to modal for toggling
        modalContainer.classList.add('is-visible');

        // event listener to hide modal when clicking outside of modal
        modalContainer.addEventListener('click', (e) => {
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }

    // create function to hide modal
    function hideModal() {
        let modalContainer = document.querySelector('.modal-fade');
        modalContainer.classList.remove('is-visible');
    }

    // show Pokemon details in modal on button click
    function showDetails(pokemon) {
        loadDetails(pokemon).then(() => {
            showModal(pokemon);
        });   
    }

    // lets the user close the window by hitting Escape
    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('.modal-fade');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    // 'exports' functions in IIFE
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };

})();

// forEach loop - loads list, then goes through full Pokemon array
pokemonRepository.loadList().then(() => {
    pokemonRepository.getAll().forEach((pokemon) => {  
        pokemonRepository.addListItem(pokemon);



    });
});

// loading message functions
function showLoadingMessage() {
    document.getElementById('loadingMessage').style.display = 'block';
}

function hideLoadingMessage() {
    document.getElementById('loadingMessage').style.display = 'none';
}