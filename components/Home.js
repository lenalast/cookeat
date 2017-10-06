import React, {Component} from 'react';
import {StyleSheet, Text, View, Image } from 'react-native';
import Video from 'react-native-video';

class Home extends Component {

  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({tintColor}) => (<Image style={[{width: 22, height: 22}, {tintColor: tintColor}]}
                                         source={require('../assets/chef_hat.png')}/> )
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to CookEat!</Text>
        <Text style={styles.text}>This is the recepie app for you, who wants inspiration, nice flow and beautiful
          pictures to motivate you to make aawesome dinners.</Text>
        <Video style={{width: 300, height: 500}} source={require('../assets/lenabi.mp4')}/>
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
    marginTop: 40,
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
  randomRecipes: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-between",
  },
  image: {
    width: 150,
    height: 150,
    margin: 10,
  }
});
