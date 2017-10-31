import React, {Component} from 'react';
import {
  StyleSheet, Text, View, Image,
  TouchableHighlight, ScrollView, Dimensions,
} from 'react-native';
import axios from 'axios';
import {Actions}  from 'react-native-router-flux';
import {connect} from "react-redux";
import {setRecipe} from "../redux/recipe/recipe.actions";

class Favorites extends Component {
  static navigationOptions = {
    tabBarLabel: 'Favorites',
    tabBarIcon: ({tintColor}) => (
      <Image
        style={[{width: 22, height: 22}, {tintColor: tintColor}]}
        source={require('../../assets/food_basket.png')}
      /> )
  }

  render() {
    const {recipes = []} = this.props

    return (
      <View style={styles.container}>
        <ScrollView>
          {
            this.renderFavoriteRecipes(recipes)
          }
        </ScrollView>
      </View>
    );
  }

  renderFavoriteRecipes(recipes) {
    return recipes.map((recipe, i) =>
      recipe.favorite &&
        <View key={recipe.id} style={styles.recipesContainer}>
          <TouchableHighlight onPress={() => {
            // sends props to next scene
            this.props.dispatch(setRecipe(recipe))
            Actions.favoriteRecipe()
          }}>
            <Image style={{width: 'auto', height: 160}}
                   source={{uri: recipe.img}}
            />
          </TouchableHighlight>

          <View style={styles.recipeInfoWrapper}>
            <Text style={styles.recipeName}>{recipe.name}</Text>
            <Text style={styles.recipeTime}>{recipe.time} min</Text>
          </View>
        </View>
    )
  }
}
export default connect(
  (state) => ({
    recipes: state.recipes
  }),
)(Favorites);

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: imageWidth,
    padding: 20,
  },
  recipeInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 10,
  },
  recipeName: {
    fontFamily: 'Futura',
    fontSize: 16,
  },
  recipeTime: {
    paddingTop: 4,
    fontSize: 12,
    color: 'red',
  },
})