import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';


class Favorites extends Component {
  static navigationOptions = {
    tabBarLabel: 'Favorites',
    tabBarIcon: ({ tintColor }) => (<Image style={[{width: 22, height: 22}, {tintColor: tintColor}]}
                                           source={require('../assets/food_basket.png')}/> )
  }

  render() {
    const {favorite} = this.props

    console.log("favorit recept", favorite)

    return (
      <View style={styles.container}>
        <Text>Favorites</Text>
        <Image style={styles.image} source={require('../assets/blueberries.jpg')}/>
      </View>
    );
  }
}

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: 260,
    height: 200,
  }
})