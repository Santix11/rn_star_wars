import React from "react";
import { StackNavigator, } from "react-navigation";
//import {createStackNavigator,createAppContainer } from "react-navigation-stack";
import { Root } from "native-base";

import InitialPage from './screens/init';
import ListDetails from './screens/ListDetails';
import nav from './utils/Navigator';

const App = StackNavigator(
    {
        InitialPage: { screen: InitialPage},
        ListDetails: { screen: ListDetails},
    },
    {
        index: 0,
        initialRouteName: "InitialPage",
        //initialRouteName: "Drawer",
        headerMode: "none",
        navigationOptions: ({ navigation }) => {
            nav.setRef(navigation);
            return {
                // put navigation options
                gesturesEnabled: false,
              }
        }
    }
 );

 //const AppContainer = createAppContainer(App);

 //export default AppContainer;

 export default () =>
   <Root>
       <App />
   </Root>;