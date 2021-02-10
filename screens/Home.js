import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {ListItem, Header} from 'react-native-elements';
import axios from 'axios'

export default class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            listData: [],
            url: 'http://localhost:5000/'
        }
    }

    renderItem = ({item,index})=>{
        <ListItem 
        key= {index}
        title= {`Planet : ${item.Name}`}
        subtitle= {`Distance From Earth : ${item.Distance}`}
        titleStyle= {styles.titleStyle}
        containerStyle= {styles.container}
        bottomDivider
        onPress={this.props.navigation.navigate('Details',{planet_name: item.Name})}
        ></ListItem>
    }

    KeyExtractor= (item,index)=>{
        index.toString()
    }

    getPlanets=()=>{
        const {url} = this.state.url
        axios.get(url).then((response)=>{
            return(
                this.setState({
                    listData : response.data
                })
            )
        })
    }

    componentDidMount=()=>{
        this.getPlanets()
    }

    render(){
        const listData = this.state.listData
        if(listData.length === 0){
            return(
                <View style={styles.container}>
                    <Text>
                        Loading....
                    </Text>
                </View>
            )
        }
        else{
            return(
                <View style={styles.container}>
                    <Header centerComponent= {{title: 'Stars World', style:{color: '#000'}}}
                    backgroundColor= '#00ff00'
                    >
                    </Header>
                    <View style={styles.container}>
                        <FlatList
                        keyExtractor= {this.KeyExtractor()}
                        data= {this.state.listData}
                        renderItem= {this.renderItem()}
                        />
                    </View>
                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    titleStyle:{
        fontSize: 20,
        fontFamily: 'cursive',
        fontWeight: 'bold'
    },
    containerStyle:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'    
    }
  });