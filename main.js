const pokemon = {
    picture: '',
    name: '',
    id: '',
    type: '',
    type2: '',
    description: ''
};

const pokemonPictures = {
    picture1: '',
    picture2: '',
    picture3: '',
    picture4: '',
    picture5: '',
    picture6: '',
    picture7: '',
    picture8: '',
}

function runApi(index) {

    const apiURL = `https://pokeapi.co/api/v2/pokemon/${index}`;

    const locationURL = `https://pokeapi.co/api/v2/pokemon/${index}/encounters`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {

            pokemon.picture = data.sprites.front_default;
            pokemon.name = data.name;
            pokemon.id = data.id;
            
            if (data.types && data.types.length > 1) {
                pokemon.type = data.types[0].type.name;
                pokemon.type2 = data.types[1].type.name;
            }
            else if (data.types && data.types.length <= 1) {
                pokemon.type = data.types[0].type.name;
                pokemon.type2 = ' ';
            } else {
                pokemon.type = 'Unknown';
            }

            if (data.sprites.front_default !== null) {
                pokemonPictures.picture1 = data.sprites.front_default;
            }
            else {
                pokemonPictures.picture1 = '';
            }

            if (data.sprites.back_default !== null) {
                pokemonPictures.picture2 = data.sprites.back_default;
            }
            else {
                pokemonPictures.picture2 = '';
            }

            if (data.sprites.front_female !== null) {
                pokemonPictures.picture3 = data.sprites.front_female;
            }
            else {
                pokemonPictures.picture3 = '';
            }

            if (data.sprites.back_female !== null) {
                pokemonPictures.picture4 = data.sprites.back_female;
            }
            else {
                pokemonPictures.picture4 = '';
            }

            if (data.sprites.front_shiny !== null) {
                pokemonPictures.picture5 = data.sprites.front_shiny;
            }
            else {
                pokemonPictures.picture5 = '';
            }

            if (data.sprites.back_shiny !== null) {
                pokemonPictures.picture6 = data.sprites.back_shiny;
            }
            else {
                pokemonPictures.picture6 = '';
            }

            if (data.sprites.front_shiny_female !== null) {
                pokemonPictures.picture7 = data.sprites.front_shiny_female;
            }
            else {
                pokemonPictures.picture7 = '';
            }

            if (data.sprites.back_shiny_female !== null) {
                pokemonPictures.picture8 = data.sprites.back_shiny_female;
            }
            else {
                pokemonPictures.picture8 = '';
            }

            displayInfo();
            renderPokemonImage();
            addOtherImages();
        })

        .catch(error => {
            document.getElementById('pokedex-screen').style.color = 'white';
            document.getElementById('pokedex-screen').textContent = 'Invalid';
        })

        fetch(locationURL)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                pokemon.description = data[0].location_area.name;
            } else {
                pokemon.description = 'Unknown';
            }

            displayLocation();
        })
        .catch(error => console.error('Error fetching location data:', error));
}

const powerBtn = document.getElementById('power-btn');
powerBtn.addEventListener('click', togglePower);
let isOn = false;

function togglePower() {

    if (!isOn) {
        isOn = true;
    }
    else {
        isOn = false;
    }

    toggleScreen();
}

function toggleScreen() {
    const screenArray = [
        document.getElementById('pokedex-screen'),
        document.getElementById('screen-sub')
    ];

    const otherScreens = [
        document.getElementById('poke-image'),
        document.getElementById('screen-sub'),
        document.getElementById('screen-num'),
        document.getElementById('screen-type'),
        document.getElementById('pokemon-name')
    ];

    document.getElementById('pokedex-screen').style.color = 'var(--white)';
    document.getElementById('pokedex-screen').textContent = 'Pokedex';
    document.getElementById('screen-sub').textContent = 'v1.0';

    if (isOn) {
        for (let i = 0; i < screenArray.length; i++) {
            screenArray[i].classList.remove('screen__off');
            screenArray[i].classList.add('animation__add');
        }
    }
    else {
        for (let i = 0; i < screenArray.length; i++) {
            screenArray[i].classList.add('screen__off');
            screenArray[i].classList.remove('animation__add');
        }
        for (let i = 0; i < otherScreens.length; i++) {
            otherScreens[i].classList.add('screen__off');
            otherScreens[i].classList.remove('animation__add');
        }
        document.getElementById('pokemon-search').value = '';
        powerOff();
    }
}

function displayInfo() {
    const screenArray = [
        document.getElementById('poke-image'),
        document.getElementById('screen-sub'),
        document.getElementById('screen-num'),
        document.getElementById('screen-type'),
        document.getElementById('pokemon-name')
    ];

    screenArray[1].textContent = pokemon.id;
    screenArray[2].textContent = pokemon.type;
    if (pokemon.type2 === '') {
        screenArray[3].textContent = 'n/a';
    }
    else {
        screenArray[3].textContent = pokemon.type2;
    }

    for (let i = 0; i < screenArray.length; i++) {
        screenArray[i].classList.remove('screen__off');
        screenArray[i].classList.add('animation__add');
    }
}

function displayLocation() {
    const location = document.getElementById('pokemon-name');

    location.textContent = pokemon.description;
    location.classList.remove('screen__off');
    location.classList.add('animation__add');
}

function renderPokemonImage() {
    const pokedexTitle = document.getElementById('pokedex-screen');
    const pokedexVersion = document.getElementById('screen-sub');
    const pokeImage = document.getElementById('poke-image');

    pokedexTitle.classList.add('screen__off');
    pokedexVersion.classList.add('screen__off');
    pokeImage.style.display = 'block';
    pokeImage.src = pokemon.picture;
    pokeImage.classList.add('animation__add');
    pokeImage.classList.add('image__sizing');
}

function addOtherImages() {
    const blueBoxes = document.getElementsByClassName('blue__square');
    let currIndex = 0;
    let boxNumber = 1;
    const screenImage = document.getElementById('poke-image');

    let pictureArray = [
        pokemonPictures.picture1,
        pokemonPictures.picture2,
        pokemonPictures.picture3,
        pokemonPictures.picture4,
        pokemonPictures.picture5,
        pokemonPictures.picture6,
        pokemonPictures.picture7,
        pokemonPictures.picture8
    ];

    for (let i = 0; i < pictureArray.length; i++) {
        if (pictureArray[i] !== '') {
            currIndex++;
        }
    }

    pictureArray = pictureArray.filter(item => item !== '');

    for (let i = 0; i < currIndex; i++) {
        blueBoxes[i].innerHTML = boxNumber;
        blueBoxes[i].classList.add('otheranimation__add');
        blueBoxes[i].addEventListener('click', () => {
            screenImage.src = pictureArray[i];
        });
        boxNumber++;
    }
}

function powerOff() {
    const screenArray = [
        document.getElementById('poke-image'),
        document.getElementById('screen-sub'),
        document.getElementById('screen-num'),
        document.getElementById('screen-type'),
        document.getElementById('pokemon-name'),
        document.getElementById('poke-image')
    ];

    for (let i = 0; i < screenArray.length; i++) {
        screenArray[i].classList.add('screen__off');
    }

    screenArray[screenArray.length - 1].style.display = 'none';

    const blueBoxes = document.getElementsByClassName('blue__square');

    for (let i = 0; i < blueBoxes.length; i++) {
        blueBoxes[i].replaceWith(blueBoxes[i].cloneNode(true));
        blueBoxes[i].innerHTML = '';
    }
}

const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', search);

function search() {
    const pokeSearch = document.getElementById('pokemon-search').value;
    document.getElementById('pokedex-screen').style.color = 'var(--black)';

    clearSearch();
    if (isOn) {
        runApi(pokeSearch.toLowerCase());
    }
}

function clearSearch() {
    const screenArray = [
        document.getElementById('poke-image'),
        document.getElementById('screen-sub'),
        document.getElementById('screen-num'),
        document.getElementById('screen-type'),
        document.getElementById('pokemon-name')
    ];

    const blueBoxes = document.getElementsByClassName('blue__square');

    for (let i = 0; i < blueBoxes.length; i++) {
        blueBoxes[i].replaceWith(blueBoxes[i].cloneNode(true));
    }

    for (let i = 0; i < blueBoxes.length; i++) {
        blueBoxes[i].innerHTML = '';
    }

    for (let i = 0; i < screenArray.length; i++) {
        screenArray[i].classList.add('screen__off');
        screenArray[i].classList.remove('animation__add');
    }
}