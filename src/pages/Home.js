import React from 'react';
import { View, TouchableOpacity, Button, Text, StyleSheet, Image, AppRegistry} from 'react-native';

import logo from '../assets/logo.png';
export default class Home extends React.Component{
  render() {
    return (
  <View style={styles.container}>      
    <Image style={styles.logo} source={logo} />
    <Text style={styles.desejoAcessar}>Deseja acessar como?</Text>
     <View style={styles.form}>
      <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Login',{id:1}) }>
          <Text style={styles.buttonText}>DIARISTA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Login',{id:2}) }>
            <Text style={styles.buttonText}>CLIENTE</Text>
        </TouchableOpacity>
      </View>
  </View>
   );
  }
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    logo:{
        width:170,
        height:300,
    },
    button:{
        marginTop:10,
        height:40,
        backgroundColor: '#00BFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:2
    },
    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    form:{
        alignSelf: 'stretch',
        paddingHorizontal:30
    },
    viewLogo:{
        alignItems:'center',
    },
    desejoAcessar:{
        fontSize:14,
        textAlign:'center',
    },
    botao: {
        width: 50
    },
});

