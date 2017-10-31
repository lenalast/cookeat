import axios from 'axios';
import { fetchRecipes } from '../recipes/recipes.actions';

// sync actions
export function setRecipe(recipe) {
  // action object
  return {
    type: 'SET_RECIPE',
    recipe
  }
}

// async actions
export function updateRecipe(recipe) {
  return (dispatch) => {
    axios.patch('https://shopeat-api.herokuapp.com/recipes/' + recipe.id, {favorite: !recipe.favorite})
      .then(res => {
        dispatch(setRecipe(res.data))
        dispatch(fetchRecipes())
      })
      .catch(err => console.error(err))
  }
}