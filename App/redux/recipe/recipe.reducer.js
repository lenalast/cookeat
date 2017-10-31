export default function recipe(state = {}, action = {}) {
  switch (action.type) {
    case 'SET_RECIPE':
      return action.recipe;
    default:
      return state
  }
}