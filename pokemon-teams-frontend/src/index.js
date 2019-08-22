const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const trainerContainer = document.getElementsByTagName("main")[0]

window.onload = () => {
    loadTrainers()
}

const loadTrainers = () => {
    fetch("http://localhost:3000/trainers")
    .then(function(response) {
      return response.json();
    })
    .then(function(trainers) {
      trainers.forEach( (trainer) => {
        trainerContainer.innerHTML += generateTrainer(trainer)
      })
    })
    .catch(function(error) {
      alert("Bad things! Ragnarők!");
      console.log(error.message);
    });
}

const generateTrainer = (trainer) => {
    return `
        <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
            <button onClick=addPokemon(event) data-trainer-id="${trainer.id}">Add Pokemon</button>
            <ul>
                ${generatePokemonList(trainer.pokemon)}
            </ul>
        </div>
    `
}

const generatePokemonList = (pokemonData) => {
    let list = ``
    pokemonData.forEach( pokemon => {
        list +=  `<li id=${pokemon.id}>${pokemon.nickname} (${pokemon.species}) <button class="release" onClick=releasePokemon(event) data-pokemon-id="${pokemon.id}">Release</button></li>`
    })
    return list
}

const addPokemon = (event) => {
    event.preventDefault();

    let trainer = event.target.dataset.trainerId

    let formData = {
        trainer_id: trainer
    };

    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },

        body: JSON.stringify(formData)
    };

    fetch("http://localhost:3000/pokemons", configObj)
    .then(function(response) {
        return response.json();
    })
    .then(function(pokemon) {
        if (pokemon.message) {
            alert(pokemon.message)
        } else {
            let element = `<li id=${pokemon.id}>${pokemon.nickname} (${pokemon.species}) <button class="release" onClick=releasePokemon(event) data-pokemon-id="${pokemon.id}">Release</button></li>`
            let trainerCard = document.querySelectorAll(`[data-id="${pokemon.trainer_id}"]`)[0]
            trainerCard.getElementsByTagName("ul")[0].innerHTML += element
        }
    })
    .catch(function(error) {
        alert("Bad things! Ragnarők!");
        console.log(error.message);
    });
}

const releasePokemon = event => {
    event.preventDefault();

    let pokemonId = event.target.dataset.pokemonId
    let element = document.getElementById(pokemonId)
    element.remove()
    
    let configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
    };

    fetch(`http://localhost:3000/pokemons/${pokemonId}`, configObj)
}