import React, {Component} from 'react';
import {
  StyleSheet, Text, View, Image,
  ScrollView, TextInput, TouchableHighlight,
  FlatList,
} from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      filteredRecipes: [],
      selectedRecipe: [],
      searchString: ""
    }
  }

  componentDidMount() {
    this.fetchRecipes();
  }

  componentWillReceiveProps() {
    console.log('yes indeed')
  }

  fetchRecipes() {
    axios.get('http://localhost:3000/recipes')
      .then((res) => {
        this.setState({recipes: res.data})
      })
      .catch((error) => console.error(error))
  }

  static navigationOptions = {
    tabBarLabel: 'Recipes',
    tabBarIcon: ({tintColor}) => (
      <Image
        style={[{width: 22, height: 22}, {tintColor: tintColor}]}
        source={require('../assets/food.png')}
      /> )
  }

  updateRecipeAsFavorite(favRecipe) {
    const { recipes } = this.props
    recipes.map(recipe => {
      if (recipe.id === favRecipe.id) {
        recipe.favorite = !recipe.favorite
      }
    })
  }

  render() {
    const {
      recipes,
      filteredRecipes,
      searchString,
    } = this.state

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search for recipes"
          onChangeText={(text) => this.searchRecipe(text)}
        />
        <ScrollView>
          <View style={styles.recipes}>
            {
              (!filteredRecipes.length && searchString.length) ?
                <Text>No result</Text> :
                this.renderRecipes(filteredRecipes.length ? filteredRecipes : recipes)
            }
          </View>
        </ScrollView>
      </View>
    );
  }

  renderRecipes(recipes) {
    return recipes.map((recipe, i) =>
      <View key={i} style={styles.recipesContainer}>
        <TouchableHighlight onPress={() => {
          // sends props to next scene
          Actions.recipe({ recipe })
        }}>
          <Image style={{minWidth: 186, height: 120}}
                 source={{uri: recipe.img}}
          />
        </TouchableHighlight>

        <View style={styles.recipeInfoWrapper}>
          <Text style={styles.recipeName}>{recipe.name}</Text>
          <Text style={styles.recipeTime}>{recipe.time} min</Text>
        </View>
      </View>)
  }

  searchRecipe = (searchText) => {
    const {recipes} = this.state

    const filteredRecipes = recipes.filter(recipe => recipe.name.startsWith(searchText))
    this.setState({filteredRecipes, searchString: searchText})
  }
}
export default Recipes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    margin: 20,
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: "#e2e2e2",
    borderRadius: 50,
    fontSize: 12,
  },
  recipesContainer: {
    justifyContent: 'center',
  },
  recipeInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 186,
    height: 40,
  },
  recipeName: {
    fontFamily: 'Futura',
    fontSize: 14,
    marginLeft: 4,
  },
  recipeTime: {
    marginRight: 8,
    fontSize: 10,
    color: 'red',
  },
  recipes: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
