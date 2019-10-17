import React, { Component } from "react";
import { StyleSheet,FlatList,TouchableWithoutFeedback,DeviceEventEmitter } from 'react-native';
import {
    Container,
    Content,
    Text,
    Item,
    Input,
    Button,
    Icon,
    View,
    Toast,
    Spinner,
    Header,
    Title,
    Left,
    Right,
    Body,
    CardItem,
    Picker
} from "native-base";
import axios from 'axios';
import Constants from '../utils/Constants';
import styles from './style';
import simpleStore from 'react-native-simple-store';

class InitialPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataTypes: [],
            loading: true,
            page: 1,
            refreshing: false,
            selectedLanguage: '',
        };
    }

    componentDidMount()
    {
        simpleStore.get('language').then(data => {
            if(data)
                this.setState({selectedLanguage: data});
            else this.setState({selectedLanguage: 'en'});
        });

        this.loadData();

        DeviceEventEmitter.addListener('LANGUAGE_CHANGED', data => {
            this.loadData();
        });
        
    }

    loadData = () => 
    {
        let url = `${Constants.API_BASE_URL}`;

        axios.get(url).then(res => {

            //console.log("data: " + JSON.stringify(res.data));

            this.setState({
                dataTypes: res.data,
                loading: false,
                refreshing: false
            }, () => {
                //console.log("data3: " + Object.keys(this.state.dataTypes));
            });

        }).catch(error => {
            console.log("dataTypes error: " + error);
        });

        
    }

    onLanguageChange = (value) => {
        this.setState({selectedLanguage: value});
        i18n.locale = value;
        simpleStore.update('language', value).then(data => {
            console.log('Language Updated!!!', data);
            DeviceEventEmitter.emit('LANGUAGE_CHANGED', {  });
            /*this.setState({showLanguageSpinner: true}, () => {
                setTimeout(() => {
                    this.setState({showLanguageSpinner: false});
                }, 1000);
            });*/
        });
    };

    _handleRefresh = () => {
        this.setState(
          {
            page: 1,
            refreshing: true
          },
          () => {
            this.loadData();
          }
        );
      };

      actionOnRow(item) {
          let url = this.state.dataTypes[item];
        //console.log('Selected Item :', url);

        this.props.navigation.navigate("ListDetails",{
            dataType: item,
            urlLink: url,
        });
     }

    render(){
        const navigation = this.props.navigation;
        if(this.state.loading)
        {
            return <View>
                <Spinner color='white'/>
            </View>;
        }
        else{
            return(
                <Container >
                    <Header >
                  <Left>
                      
                  </Left>
                  <Body style={{ flex: 3, flexDirection: "row", justifyContent: 'center' }}>
                      <Title style={{ marginRight: 5 }}>Star Wars List</Title>
                      
                  </Body>
                 <Right >
                    
                  </Right>
              </Header>


                    <View padder style={styles.listContentContainerStyle}>
                    <FlatList
                           style={[styles.card, {width: Constants.SCREEN_WIDTH - 10 }]}
                           data={Object.keys(this.state.dataTypes)}
                           keyExtractor={(item, index) => index.toString()}
                           renderItem={({ item: dataRow}) => (
                            <TouchableWithoutFeedback onPress={ () => this.actionOnRow(dataRow)}>
                            <View style={[styles.cardView, {flexDirection: 'row', justifyContent: 'space-between'}]}>
                                <CardItem style={{
                                       backgroundColor: "transparent",
                                       flexDirection: 'column',
                                       justifyContent: 'space-between',
                                       flex:1
                                   }} >
                                       <Left style={styles.cardItem}>
                                           
                                           <Text style={{ fontWeight: "bold" }}>
                                               {dataRow}
                                           </Text>
                                       </Left>
                                   </CardItem>
                            </View>
                            </TouchableWithoutFeedback>

                           )}

                           onEndReachedThreshold={0}
                           initialNumToRender={10}
                           onRefresh={this._handleRefresh}
                           refreshing={this.state.refreshing}

                           />
                    </View>

                    <View style={{justifyContent: 'center'}}>
                        <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down"/>}
                        placeholder="Select your language"
                        placeholderStyle={{color: "#bfc6ea"}}
                        placeholderIconColor="#007aff"
                        style={{width: undefined}}
                        selectedValue={this.state.selectedLanguage}
                        onValueChange={this.onLanguageChange}
                        >
                        <Picker.Item label="English" value="en"/>
                        <Picker.Item label="Spanish" value="es"/>
                        <Picker.Item label="French" value="fr"/>
                        </Picker>
                    </View>
                </Container>
            )

        }
        
    }


}



export default InitialPage;