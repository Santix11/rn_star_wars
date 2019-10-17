import React, { Component } from "react";
import { StyleSheet,FlatList,TouchableWithoutFeedback } from 'react-native';
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
} from "native-base";
import axios from 'axios';
import Constants from '../utils/Constants';
import styles from './style';

class ListDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            detailsList: [],
            loading: true,
            page: 1,
            refreshing: false
        };
    }

    componentDidMount()
    {
        this.loadData();
    }

    loadData = () => 
    {
        let url = this.props.navigation.state.params.urlLink;

        axios.get(url).then(res => {

            console.log("detailsData: " + JSON.stringify(res.data.results));

            this.setState({
                detailsList: res.data.results,
                loading: false,
                refreshing: false
            }, () => {
                //console.log("data3: " + Object.keys(this.state.dataTypes));
            });

        }).catch(error => {
            console.log("dataTypes error: " + error);
        });
    }


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
        
    }

    buildList = (dataRow) => {

        if(this.props.navigation.state.params.dataType == 'people')
        {
            return <Left style={styles.cardItem2}>
                <Text style={{ fontWeight: "bold" }}>
                Name: {dataRow.name}
                </Text>
                <Text style={{ fontWeight: "bold" }}>
                Height: {dataRow.height}
                </Text>
                <Text style={{ fontWeight: "bold" }}>
                Mass: {dataRow.mass}
                </Text>
                </Left>
        }else if (this.props.navigation.state.params.dataType == 'planets')
        {
            return <Left style={styles.cardItem2}>
                <Text style={{ fontWeight: "bold" }}>
                Name: {dataRow.name}
                </Text>
                <Text style={{ fontWeight: "bold" }}>
                Diameter: {dataRow.diameter}
                </Text>
                <Text style={{ fontWeight: "bold" }}>
                Terrain: {dataRow.terrain}
                </Text>
                </Left>
        }
        else if (this.props.navigation.state.params.dataType == 'films')
        {
            return <Left style={styles.cardItem2}>
                <Text style={{ fontWeight: "bold" }}>
                Title: {dataRow.title}
                </Text>
                <Text style={{ fontWeight: "bold" }}>
                Director: {dataRow.director}
                </Text>
                <Text style={{ fontWeight: "bold" }}>
                Release Date: {dataRow.release_date}
                </Text>
                </Left>
        }
        else if (this.props.navigation.state.params.dataType == 'species')
        {
            return <Left style={styles.cardItem2}>
                <Text style={{ fontWeight: "bold" }}>
                Name: {dataRow.name}
                </Text>
                <Text style={{ fontWeight: "bold" }}>
                LifeSpan: {dataRow.average_lifespan}
                </Text>
                <Text style={{ fontWeight: "bold" }}>
                Language: {dataRow.language}
                </Text>
                </Left>
        }
        else if (this.props.navigation.state.params.dataType == 'vehicles')
        {
            return <Left style={styles.cardItem2}>
                <Text style={{ fontWeight: "bold" }}>
                Name: {dataRow.name}
                </Text>
                <Text style={{ fontWeight: "bold" }}>
                Crew: {dataRow.crew}
                </Text>
                <Text style={{ fontWeight: "bold" }}>
                Length: {dataRow.length}
                </Text>
                </Left>
        }
        else if (this.props.navigation.state.params.dataType == 'starships')
        {
            return <Left style={styles.cardItem2}>
                <Text style={{ fontWeight: "bold" }}>
                Name: {dataRow.name}
                </Text>
                <Text style={{ fontWeight: "bold" }}>
                Crew: {dataRow.crew}
                </Text>
                <Text style={{ fontWeight: "bold" }}>
                Length: {dataRow.length}
                </Text>
                </Left>
        }
    };
    

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
                       <Button transparent onPress={() => {
                           navigation.goBack();
                           }}>
                         <Icon name="arrow-back" />
                       </Button>
                     </Left>
                     <Body>
                     <Title>{navigation.state.params.dataType} List</Title>
                     </Body>
                     <Right />
                   </Header>


                   <View padder style={styles.listContentContainerStyle}>
                    <FlatList
                           style={[styles.card, {width: Constants.SCREEN_WIDTH - 10 }]}
                           data={this.state.detailsList}
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
                                       {this.buildList(dataRow)}
                                       
                                   </CardItem>
                            </View>
                            </TouchableWithoutFeedback>

                           )}

                           onEndReachedThreshold={0}
                           initialNumToRender={30}
                           onRefresh={this._handleRefresh}
                           refreshing={this.state.refreshing}

                           />
                    </View>

                
                </Container>
            )

        }
        
    }

}

export default ListDetails;