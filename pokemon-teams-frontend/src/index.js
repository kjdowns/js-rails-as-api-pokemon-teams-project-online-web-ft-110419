const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector('main');

window.addEventListener('DOMContentLoaded', function (e) {
   fetchTrainers();
   document.body.addEventListener('click', function(e){
        switch (e.target.className) {
            case "add":
                addPokemon(e.target)
                break;
        
            case "release":
                releasePokemon(e.target)
                break;
        };
   }) 
});

function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(function (response) {
        return response.json();
    })
    .then(function(result){
        const trainers = result["data"]
        renderTrainers(trainers);
    })
};

function renderTrainers(result) {
    result.forEach((trainer) => {
        const pokemon = trainer["attributes"]["pokemons"]
        let card = document.createElement('div');
        main.appendChild(card);
        card = card.outerHTML = 
            `<div class="card" data-id="${trainer.id}">
                <p>${trainer.attributes.name}</p>
                <button class="add" data-trainer-id="${trainer.id}">Add Pokemon</button>
                <ul>
                ${initPokemon(pokemon)}
                </ul>`
    })
}

function initPokemon(pokemon) {
    const innerList = []
    pokemon.forEach((pokemon) => {
        innerList.push(`<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`)
        })
    return innerList.join("")
}

function createPokemon(pokemon) {
    return `
              <li>
                  ${pokemon.nickname} (${pokemon.species})
                  <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
              </li>`;
  }

function addPokemon(target) {
    const trainerId = target.dataset.trainerId;
    const trainerCardUl = target.nextElementSibling;
    if (trainerCardUl.childElementCount < 6) {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
        body: JSON.stringify({ trainer_id: trainerId})
    }
    fetch(POKEMONS_URL, configObj)
    .then(function(response){
        return response.json();
    })
    .then(function(object){
        let pokemonElmt = createPokemon(object);
        trainerCardUl.innerHTML += pokemonElmt;
    })
    }
}

function releasePokemon(target) {
    let configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
    }
    fetch(POKEMONS_URL + `/${target.dataset.pokemonId}`, configObj)
    .then(function(response){
        return response.json();
    })
    .then(function(object){
        target.parentElement.remove();
    })
    
}