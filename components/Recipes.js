import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TextInput, Modal, TouchableHighlight} from 'react-native';
import axios from 'axios';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      modalVisible: false
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
          this.setState({modalVisible: true})
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

  render() {
    const {dataSource} = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Recipes</Text>
        <TextInput style={styles.input} placeholder="Search for recipes"/>
        <ScrollView>
          <View style={styles.recipes}>
            {dataSource}
            {dataSource}
          </View>
        </ScrollView>

        <Modal visible={this.state.modalVisible}
               transparent={true}
               animationType="slide"
        >

          <View style={styles.modal}>

            <View style={styles.modalWrapper}>
              <TouchableHighlight onPress={() => {
                this.setState({modalVisible: false})
              }}>
                <Image style={styles.modalImg}
                       source={require('../assets/cancel.png')}/>
              </TouchableHighlight>
              <Text>Modal!</Text>
              <Text>Modal!</Text>
              <Text>Modal!</Text>
              <Text>Modal!</Text>
            </View>
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
  image: {
    width: 150,
    height: 150,
    margin: 10,
  },
  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 400,
    borderRadius: 2,
    backgroundColor: '#6365A0',
  },
  modalImg: {
    width: 22,
    height: 22,
    top: -150,
    right: -130,
  }
});
