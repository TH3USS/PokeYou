const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');


var a = input.value.toString().split("");
console.log(a);


let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';
  
  const data = await fetchPokemon(pokemon);

  if(data){
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];    
    //input.value = '';    
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :C';
    pokemonNumber.innerHTML = '';
  }
  
}

form.addEventListener('input', (event) =>{
  event.preventDefault();
  var a = input.value.toString().split("");
  console.log(a);
  console.log(`${a[9]}${a[6]}${a[3]}`);
  if(a[9] != 0){
    renderPokemon(`${a[9]}${a[6]}${a[3]}`);
  } else {
    renderPokemon(`${a[6]}${a[3]}`);
  }
  
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    input.value = '';
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  input.value = '';
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);