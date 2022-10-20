

let chest = [];


console.log(chest);

function listMany() {

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=30`)
    .then((response) => response.json())
    .then((data) => {
        data.results.map(async item => {
            
            let pokemonRes = await fetch(item.url);
            let pokemon = await pokemonRes.json()
            
            createCards(pokemon.sprites.other.dream_world.front_default, pokemon.name, pokemon.types[0]?.type.name || 'Desconhecido');
            const pokemonImg = pokemon.sprites.other.dream_world.front_default
            const pokemonName = pokemon.name
            const pokemonType = pokemon.types[0]?.type.name
            chest.push(            {
                img: pokemonImg,
                name: pokemonName,
                type: pokemonType
            })

        })         
    });
}

console.log(chest)
const input = document.querySelector('input')
listMany()

const containerCards = document.querySelector('.container-cards')


function createCards(image, nome, tipo) {
    const cards = document.createElement('div')
    cards.classList.add('cards')

    const imgsCards = document.createElement('div')
    imgsCards.classList.add('imgs-cards')

    const img = document.createElement('img')
    img.src = image
    imgsCards.appendChild(img)

    const titleCards = document.createElement('div')
    titleCards.classList.add('title-cards')

    const name = document.createElement('p')
    const type = document.createElement('p')

    name.innerText = nome
    type.innerText = `Tipo: ${tipo}`

    titleCards.appendChild(name)
    titleCards.appendChild(type)

    cards.appendChild(imgsCards)
    cards.appendChild(titleCards)

    containerCards.appendChild(cards)
}

input.addEventListener('keyup', (e) => {
    const pokeName = chest.filter(item => {
        return item.name.match(e.target.value)

    })
    containerCards.innerHTML = ''
    pokeName.map(item => {
        createCards(item.img, item.name, item.type )
    })
    console.log(pokeName)
})

