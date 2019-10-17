import { Dimensions } from "react-native";
var { height, width } = Dimensions.get('window');

var Constants = {

    API_BASE_URL: 'https://swapi.co/api',
    BASE_URL: 'https://swapi.co',

    SCREEN_WIDTH: width,
    SCREEN_HEIGHT: height,

};

export default Constants;