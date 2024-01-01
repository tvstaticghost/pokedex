const pokemon = {
    picture: '',
    name: '',
    id: '',
    type: ''
}

function runApi() {
    const searchEntry = 'eevee';
    const apiURL = `https://pokeapi.co/api/v2/pokemon/${searchEntry}`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
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
    console.log(isOn);

    toggleScreen();
}

function toggleScreen() {
    const screenArray = [
        document.getElementById('pokedex-screen'),
        document.getElementById('screen-sub'),
        document.getElementById('screen-num'),
        document.getElementById('screen-type'),
        document.getElementById('pokemon-name')
    ];

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
    }
}

runApi();