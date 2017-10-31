import axios from 'axios';

// sync actions
function setRecipes(recipes) {
  // action object
  return {
    type: 'SET_RECIPES',
    recipes
  }
}

// async actions
export function fetchRecipes() {
  return (dispath) => {
    axios.get('https://shopeat-api.herokuapp.com/recipes')
      .then((res) => {
        dispath(setRecipes(res.data))
      })
      .catch((error) => console.error(error))
  }
}