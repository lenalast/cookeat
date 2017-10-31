import React, {Component} from 'react';
import {
  StyleSheet, Text, View, Image,
  ScrollView, TextInput, TouchableHighlight,
  FlatList,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from "react-redux";
import {fetchRecipes } from '../redux/recipes/recipes.actions';
import { setRecipe } from '../redux/recipe/recipe.actions';

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
    this.props.fetchRecipes()
  }

  static navigationOptions = {
    tabBarLabel: 'Recipes',
    tabBarIcon: ({tintColor}) => (
      <Image
        style={[{width: 22, height: 22}, {tintColor: tintColor}]}
        source={require('../../assets/food.png')}
      /> )
  }

  render() {
    const {
      filteredRecipes,
      searchString,
    } = this.state

    const { recipes } = this.props


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
          this.props.setRecipe(recipe)
          Actions.recipe()
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
    const {recipes} = this.props

    const filteredRecipes = recipes.filter(recipe => recipe.name.startsWith(searchText))
    this.setState({filteredRecipes, searchString: searchText})
  }
}

export default connect(
  (state) => ({
    recipes: state.recipes
  }),
  {
    fetchRecipes: fetchRecipes,
    setRecipe: setRecipe,
  }
)(Recipes);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    width: 340,
    margin: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderRadius: 2,
    borderBottomColor: "black",
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
