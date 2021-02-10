import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Card, Cards} from 'react-native-elements';

export default class Details extends Component{
    constructor(props){
        super(props)
        
        this.state={
            details: {},
            imagePath: '',
            url: `http://localhost:5000/planet?name=${this.props.navigation.getParam('planet_name')}`
        }
    }

    getDetails=()=>{
        const {url} = this.state.url
        axios.get(url).then((response)=>{
            return(
                this.setState({
                    details : response.data
                })
            )
        })        
    }

    setDetails=(planetDetails)=>{
        const planetType = planetDetails.planet_type
        let imagePath = ''

        switch(planetType){

            case 'gas_giant':
                imagePath = require('../assets/gas_giant.png')
                break;
            
                case 'terrestrial':
                    imagePath = require('../assets/terrestrial.png')
                    break;
                
                case 'super_earth':
                    imagePath = require('../assets/super_earth.png')
                    break;
                
                case 'neptune_like':
                    imagePath = require('../assets/neptune_like.png')
                    break;    

        }

        this.setState({
            details: planetDetails,
            imagePath: imagePath
        })

    }

    componentDidMount=()=>{
        this.getDetails()
    }
    render(){
        const Details = this.state.details;
        const imagePath = this.state.imagePath;

        if(Details.specifications){
            return(
                <View style={styles.container}>
                    <Cards style = {styles.card}>

                        <Card.Title style={styles.cardtitle}>{Details.name}</Card.Title>

                        <Card.Divider/>

                        <Card.Image source={imagePath} style={styles.image}/>

                    </Cards>
                    <View style={styles.container}>
                        <Text style={styles.subtitle}>
                            {`Distance From Earth: ${Details.Distance}`}
                        </Text>

                        <Text style={styles.subtitle}>
                            {`Distance From Host Star: ${Details.Distance}`}
                        </Text>

                        <Text style={styles.subtitle}>
                            {`Gravity: ${Details.Gravity}`}
                        </Text>    

                        <Text style={styles.subtitle}>
                            {`Planet Mass: ${Details.Mass}`}
                        </Text>                                 

                        <Text style={styles.subtitle}>
                            {`Planet Radius: ${Details.Meters}`}
                        </Text> 

                    </View>

                    <View style={{flexDirection: 'column'}}>
                        <Text>{Details.specifications ? `Specifications: `:''}</Text>
                    </View>
                    
                </View>
            )
        }
        return(
            <View>
                <Text>Details Screen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card:{
        flex:1,
        alignItems: 'Right',
        justifyContent: 'Right'
      },
      cardtitle :{
        flex:1,
        fontSize: 35,
        justifyContent:'center',
        alignItems:'center',
        fontStyle: 'Bold',
      },
      image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
      subtitle :{
        flex:1,
        fontSize: 20,
        justifyContent:'center',
        alignItems:'center',
        fontWeight: 'bold'
      },
  });