import React, {Component} from 'react';
import {
  StyleSheet, Text, View, Image,
  ScrollView, TextInput, Modal, TouchableHighlight,
  FlatList,
}
  from 'react-native';
import axios from 'axios';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      searchedRecipe: [],
      showThisRecipe: [],
      modalVisible: false,
      text: ""
    }
  }

  componentDidMount() {
    return axios.get('http://localhost:3000/recipes')
      .then((res) => {
        const result = this.filterAndMapObj(res.data);
        this.setState({dataSource: result})
      })
      .catch((error) => console.error(error))
  }

  filterAndMapObj(dataSource) {
    return dataSource.map((data, i) =>
      <View key={i} style={styles.recipesContainer}>
        <TouchableHighlight onPress={() => {
          this.setState({modalVisible: true, showThisRecipe: data})
        }}>
          <Image style={{minWidth: 186, height: 120}}
                 source={{uri: data.img}}
          />
        </TouchableHighlight>

        <View style={styles.recipeInfoWrapper}>
          <Text style={styles.recipeName}>{data.name}</Text>
          <Text style={styles.recipeTime}>{data.time} min</Text>
        </View>
      </View>)
  }

  static navigationOptions = {
    tabBarLabel: 'Recipes',
    tabBarIcon: ({tintColor}) => (<Image style={[{width: 22, height: 22}, {tintColor: tintColor}]}
                                         source={require('../assets/food.png')}/> )
  }

  _keyExtractor = (i) => i;

  render() {
    const {dataSource, showThisRecipe, modalVisible, text, searchedRecipe} = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Recipes</Text>
        <TextInput style={styles.input}
                   placeholder="Search for recipes"
                   value={text}
                   // onSubmitEditing={(text) => console.log(text)}
                   onChangeText={(text) => this.setState({text: text})}
        />
        <Text>{text}</Text>
        <ScrollView>
          <View style={styles.recipes}>
            {dataSource}
            {dataSource}
          </View>
        </ScrollView>

        <Modal visible={modalVisible}
               transparent={true}
               animationType="slide"
        >
          <View style={styles.modal}>
            <TouchableHighlight onPress={() => {
              this.setState({modalVisible: false})
            }}>
              <Image style={styles.modalCancelImg}
                     source={require('../assets/left-arrow.png')}/>
            </TouchableHighlight>
            <Text style={styles.recipeNameModal}>{showThisRecipe.name}</Text>
            <Image source={{uri: showThisRecipe.img}} style={styles.modalImg}/>
            <FlatList
              data={showThisRecipe.ingredients}
              keyExtractor={this._keyExtractor}
              renderItem={
                ({item}) =>
                  <View style={styles.ingredientsWrapper}>
                    <View style={styles.wrapper}>
                      <Text style={styles.ingredients}>{item}</Text>
                    </View>
                  </View>
              }/>
          </View>
        </Modal>
      </View>
    );
  }
}

export default Recipes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 40,
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
