import React from 'react';
import { StyleSheet, Text, View,DeviceEventEmitter} from 'react-native';
import { StackNavigator } from "react-navigation";
//import {createStackNavigator } from "react-navigation-stack";
import { Container,Spinner } from "native-base";
import stack from './src/App';
import * as Font from "expo-font";

const Main = StackNavigator({
  stack: {screen: stack},

},{ headerMode: 'none' });

export default class App extends React.PureComponent{

  constructor(props) {
    super(props);
    this.state = {
        loading: true,
    };
}
  

  async componentDidMount(){
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });

    this.setState({ loading: false });
    
  }



  render(){
    if(this.state.loading)
        {
          return <View>
                <Spinner color='white'/>
            </View>;
        }
        else{
          return (
            <Container>
              <Main/>
            </Container>
          );

        }
  }


}

