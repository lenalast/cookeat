import React, {Component} from 'react';
import Recipes from './App/components/Recipes';
import Favorites from './App/components/Favorites';
import Home from './App/components/Home';
import {Router, Scene, Tabs, Actions}  from 'react-native-router-flux';
import Recipe from "./App/components/Recipe";
import axios from 'axios';
import {Provider} from 'react-redux';
import store from './App/redux/store';

// App handles all the routes.
const App = ({recipes, recipe}) => (
  <Provider store={store}>
    <Router>
      <Tabs
        key="tabs"
        tabBarStyle={{backgroundColor: '#a9a0df'}}
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
            title="Recipe"
          />
        </Scene>
        <Scene key="favorites" title="Favorites">
          <Scene
            key="favorite"
            component={Favorites}
          />
          <Scene
            key="favoriteRecipe"
            component={Recipe}
            title="Recipe"
          />
        </Scene>
      </Tabs>
    </Router>
  </Provider>
)

export default App
