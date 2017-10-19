import React, {Component} from 'react';
import {
  StyleSheet, Text, View,
  Image, Button
} from 'react-native';

class Home extends Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({tintColor}) => (
      <Image
        style={[{width: 22, height: 22}, {tintColor: tintColor}]}
        source={require('../assets/chef_hat.png')}
      /> )
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to CookEat!</Text>
        <Text style={styles.text}>This is the recepie app for you who wants inspiration, nice flow and beautiful
          pictures to motivate you to make awesome dinners.</Text>
        <Image style={styles.image}
               source={{uri: "http://s2.thingpic.com/images/V2/gUbXEuPNTVeR1F7kdk4fcCKi.jpeg"}}/>
      </View>
    );
  }
}
export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Futura',
    fontSize: 22,
    color: '#DD7C9D',
  },
  text: {
    margin: 20,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 240,
    marginTop: 40,
  }
});
