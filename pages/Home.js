import React from 'react';
import { View, Button, Text, StyleSheet} from 'react-native';

export default class Home extends React.Component{
  render() {
    return (
  <View>

    <Text style={styles.logo}>Logo</Text>
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
        fontSize:40,
        textAlign:'center',
        marginTop:100,
    },
    desejoAcessar:{
        fontSize:14,
        textAlign:'center',
        marginTop:100,
    },
    botao: {
        width:300,
        marginTop:15,
        marginLeft:31,
    },
});
