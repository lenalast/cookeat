import React from 'react';
import Recipes from './components/Recipes';
import Favorites from './components/Favorites';
import Home from './components/Home';
import {Router, Stack, Scene, Tabs, Actions }  from 'react-native-router-flux';
import Recipe from "./components/Recipe";

const App = () => (
  <Router>
      <Tabs
        key="tabbar"
        tabBarStyle={{ backgroundColor: '#a9a0df' }}
        activeBackgroundColor="#6365a0"
        activeTintColor="white"
        inactiveTintColor="#e2e2e2"
        >
        <Scene key="home" component={Home} title="Home"/>
        <Scene key="recipes" title="Recipes">
          <Scene
            key="recipesList"
            component={Recipes}
          />
          <Scene
            key="recipe"
            component={Recipe}
            onBack={ (recipe) => Actions.recipesList(this.saveRecipeToFavorites(recipe))}
          />
        </Scene>
        <Scene key="favorites" component={Favorites} title="Favs"/>
      </Tabs>
  </Router>
);

saveRecipeToFavorites = (recipe) => {
  // make put request
  console.log("Jag körs!", recipe)

  axios.patch('http://localhost:3000/recipes/' + recipe.id, {favorite: !recipe.favorite})
    .then(res => console.log(res.data))
    .catch(err => console.error(err))
}

export default App
