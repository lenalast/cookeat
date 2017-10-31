import React, {Component} from 'react';
import {
  StyleSheet, View, Text,
  TouchableHighlight, Image, FlatList
} from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { updateRecipe } from '../redux/recipe/recipe.actions';

class Recipe extends Component {

  static navigationOptions = {
    tabBarLabel: 'Recipe',
    tabBarIcon: ({tintColor}) => (
      <Image
        style={[{width: 22, height: 22}, {tintColor: tintColor}]}
        source={require('../../assets/food.png')}
      /> )
  }

  render() {
    const {
      recipe,
    } = this.props

    return (
      <View>
        <View style={styles.modal}>
          {
            <View>
              <View style={styles.topBar}>
                <Text style={styles.recipeNameModal}>{recipe.name}</Text>
                <TouchableHighlight
                  underlayColor='#6365a0'
                  onPress={() => this.saveRecipeToFavorites(recipe)}>
                  {
                    recipe.favorite ?
                      <Image
                        style={styles.star}
                        source={require('../../assets/yellow-star.png')}
                      /> :
                      <Image
                        style={styles.star}
                        source={require('../../assets/black_star.png')}
                      />
                  }
                </TouchableHighlight>
              </View>
              <Image source={{uri: recipe.img}} style={styles.modalImg}/>
              <FlatList
                data={recipe.ingredients}
                keyExtractor={(item, i) => i}
                renderItem={
                  ({item}) =>
                    <View style={styles.ingredientsWrapper}>
                      <Text style={styles.ingredients}>{item}</Text>
                    </View>
                }/>
            </View>
          }
        </View>
      </View>
    )
  }

  saveRecipeToFavorites(recipe) {
    this.props.dispatch(updateRecipe(recipe))
  }
}
export default connect(
  (state) => ({
    recipe: state.recipe,
  })
)(Recipe);

const styles = StyleSheet.create({
  star: {
    width: 32,
    height: 32,
    marginRight: 20,
  },
  topBar: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  recipeNameModal: {
    marginLeft: 10,
    fontSize: 22,
    fontFamily: 'Futura',
    color: 'white',
    textAlign: 'left',
  },
  ingredientsWrapper: {
    backgroundColor: 'white',
  },
  ingredients: {
    textAlign: 'left',
    padding: 10,
  },
  modal: {
    flexDirection: 'column',
    paddingTop: 10,
    backgroundColor: '#6365a0',
  },
  modalImg: {
    width: 380,
    height: 200,
  },
});