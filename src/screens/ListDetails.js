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
import i18n from '../localization/index';

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

            //console.log("detailsData: " + JSON.stringify(res.data.results));

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

        if(this.props.navigation.state.params.dataType == i18n.t('people'))
        {
            return <Left style={styles.cardItem2}>
                <Text >
                {i18n.t('name')}: {dataRow.name}
                </Text>
                <Text >
                {i18n.t('height')}: {dataRow.height}
                </Text>
                <Text >
                {i18n.t('mass')}: {dataRow.mass}
                </Text>
                </Left>
        }else if (this.props.navigation.state.params.dataType == i18n.t('planets'))
        {
            return <Left style={styles.cardItem2}>
                <Text >
                {i18n.t('name')}: {dataRow.name}
                </Text>
                <Text >
                {i18n.t('diameter')}: {dataRow.diameter}
                </Text>
                <Text >
                {i18n.t('terrain')}: {dataRow.terrain}
                </Text>
                </Left>
        }
        else if (this.props.navigation.state.params.dataType == i18n.t('films'))
        {
            return <Left style={styles.cardItem2}>
                <Text >
                {i18n.t('title')}: {dataRow.title}
                </Text>
                <Text >
                {i18n.t('director')}: {dataRow.director}
                </Text>
                <Text >
                {i18n.t('release_date')}: {dataRow.release_date}
                </Text>
                </Left>
        }
        else if (this.props.navigation.state.params.dataType == i18n.t('species'))
        {
            return <Left style={styles.cardItem2}>
                <Text >
                {i18n.t('name')}: {dataRow.name}
                </Text>
                <Text >
                {i18n.t('lifespan')}: {dataRow.average_lifespan}
                </Text>
                <Text >
                {i18n.t('language')}: {dataRow.language}
                </Text>
                </Left>
        }
        else if (this.props.navigation.state.params.dataType == i18n.t('vehicles'))
        {
            return <Left style={styles.cardItem2}>
                <Text >
                {i18n.t('name')}: {dataRow.name}
                </Text>
                <Text >
                {i18n.t('crew')}: {dataRow.crew}
                </Text>
                <Text >
                {i18n.t('length')}: {dataRow.length}
                </Text>
                </Left>
        }
        else if (this.props.navigation.state.params.dataType == i18n.t('starships'))
        {
            return <Left style={styles.cardItem2}>
                <Text >
                {i18n.t('name')}: {dataRow.name}
                </Text>
                <Text >
                {i18n.t('crew')}: {dataRow.crew}
                </Text>
                <Text >
                {i18n.t('length')}: {dataRow.length}
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
                     <Body style={{ flex: 3, flexDirection: "row", justifyContent: 'center' }}>
                     <Title>{navigation.state.params.dataType}</Title>
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