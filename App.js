import React from 'react';
import Recipes from './components/Recipes';
import Favorites from './components/Favorites';
import Home from './components/Home';
import {Router, Scene, Tabs }  from 'react-native-router-flux';
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
            title="Recipe"
          />
        </Scene>
        <Scene key="favorites" title="Favorites">
          <Scene
            key="favorite"
            component={Favorites}
          />
          <Scene
            key="recipe"
            component={Recipe}
            title="Recipe"
          />
        </Scene>
      </Tabs>
  </Router>
);
export default App
