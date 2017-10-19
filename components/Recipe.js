import React, {Component} from 'react';
import {
  StyleSheet, View, Text,
  TouchableHighlight, Image, FlatList
} from 'react-native';
import axios from 'axios';

class Recipe extends Component {
  state = {
    showStar: false,
  }

  render() {
    const {
      showStar
    } = this.state
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
                  onPress={() => this.toggleStar(recipe)}>
                  {
                    recipe.favorite ?
                      <Image
                        style={styles.star}
                        source={require('../assets/yellow-star.png')}
                      /> :
                      <Image
                        style={styles.star}
                        source={require('../assets/black_star.png')}
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

  toggleStar(recipe) {
    this.state.showStar ?
      this.setState({showStar: false}) :
      this.setState({showStar: true})

    this.saveRecipeToFavorites(recipe)
  }

  saveRecipeToFavorites(recipe) {
    // make put request
    axios.patch('http://localhost:3000/recipes/' + recipe.id, {favorite: !recipe.favorite})
      .then(res => console.log(res.data))
      .catch(err => console.error(err))
  }
}
export default Recipe;

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