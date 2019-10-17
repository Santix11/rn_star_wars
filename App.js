import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from "react-navigation";
//import {createStackNavigator } from "react-navigation-stack";
import { Container } from "native-base";
import stack from './src/App';

const Main = StackNavigator({
  stack: {screen: stack},

},{ headerMode: 'none' });

export default class App extends React.PureComponent{
  



  render(){
    return (
      <Container>
        <Main/>
      </Container>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
