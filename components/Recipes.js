import React, {Component} from 'react';
import {
  StyleSheet, Text, View, Image,
  ScrollView, TextInput, Modal, TouchableHighlight,
  FlatList,
}
  from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      filteredRecipes: [],
      selectedRecipe: [],
      isModalVisible: false,
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
    tabBarIcon: ({tintColor}) => (<Image style={[{width: 22, height: 22}, {tintColor: tintColor}]}
                                         source={require('../assets/food.png')}/> )
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
      selectedRecipe,
      isModalVisible,
      searchString,
    } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Recipes</Text>
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
  title: {
    marginBottom: 10,
    fontFamily: 'Futura',
    fontSize: 22,
    color: '#DD7C9D',
  },
  text: {
    margin: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 40,
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
  recipeNameModal: {
    marginLeft: 10,
    fontSize: 22,
    fontFamily: 'Futura',
    color: 'white',
    textAlign: 'left',
  },
  ingredientsWrapper: {
    width: 200,
    backgroundColor: 'white',
  },
  wrapper: {
    width: 200,
  },
  ingredients: {
    textAlign: 'left',
    padding: 10,
  },
  image: {
    width: 150,
    height: 150,
    margin: 10,
  },
  modal: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 20,
    width: 380,
    maxHeight: 610,
    backgroundColor: '#6365a0',
  },
  modalCancelImg: {
    width: 18,
    height: 16,
    margin: 10,
    top: 0,
    left: 0,
  },
  modalImg: {
    width: 380,
    height: 200,
  },
});
