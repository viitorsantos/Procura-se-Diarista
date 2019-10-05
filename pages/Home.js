import React from 'react';
import { View, Button, Text, StyleSheet, Image, AppRegistry} from 'react-native';

export default class Home extends React.Component{
  render() {
    return (
  <View>      
    <View style={styles.viewLogo}>
      <Image style={styles.logo} source={require('../imagens/logo.png')}/>
    </View>
    <Text style={styles.desejoAcessar}>Deseja acessar como?</Text>
    <View style={styles.botao}>
      <Button title="Diarista" color="#00BFFF"
       onPress={() => this.props.navigation.navigate('Login',{id:1}) }/>
     </View>
     <View style={styles.botao}>
      <Button title="Cliente" color="#00BFFF" 
      onPress={() => this.props.navigation.navigate('Login',{id:2}) }/>
     </View>
   
  </View>
   );
  }
}

const styles = StyleSheet.create({
    logo:{
        width:170,
        height:300,
    },
    viewLogo:{
        alignItems:'center',
    },
    desejoAcessar:{
        fontSize:14,
        textAlign:'center',
    },
    botao: {
        marginTop:15,
        paddingLeft:30,
        paddingRight:30,
    },
});

