import React, {Component} from 'react';
import {
  StyleSheet, Text, View, Image,
  TouchableHighlight, ScrollView, Dimensions,
} from 'react-native';
import axios from 'axios';
import {Actions}  from 'react-native-router-flux';

class Favorites extends Component {
  state = {
    recipes: [],
  }

  static navigationOptions = {
    tabBarLabel: 'Favorites',
    tabBarIcon: ({tintColor}) => (
      <Image
        style={[{width: 22, height: 22}, {tintColor: tintColor}]}
        source={require('../assets/food_basket.png')}
      /> )
  }

  componentWillMount() {
    axios.get('http://localhost:3000/recipes')
      .then((res) => this.setState({recipes: res.data}))
      .catch((error) => console.error(error))
  }

  render() {
    const {recipes} = this.state

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
      recipe.favorite ?
        <View key={i} style={styles.recipesContainer}>
          <TouchableHighlight onPress={() => {
            // sends props to next scene
            Actions.recipe({recipe})
          }}>
            <Image style={{width: 'auto', height: 160}}
                   source={{uri: recipe.img}}
            />
          </TouchableHighlight>

          <View style={styles.recipeInfoWrapper}>
            <Text style={styles.recipeName}>{recipe.name}</Text>
            <Text style={styles.recipeTime}>{recipe.time} min</Text>
          </View>
        </View> :
        null
    )
  }
}
export default Favorites;

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