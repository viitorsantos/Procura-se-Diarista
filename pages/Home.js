import React from 'react';
import { View, Button, Text, StyleSheet} from 'react-native';
import { createAppContainer, createStackNavigator} from 'react-navigation'; 

const Home = ({ navigation }) => (
  <View>

    <Text style={styles.logo}>Logo</Text>
    <Text style={styles.desejoAcessar}>Deseja acessar como?</Text>
    <View style={styles.botao}>
      <Button title="Diarista" color="#00BFFF" onPress={() => navigation.navigate('Login') }/>
     </View>
     <View style={styles.botao}>
      <Button title="Cliente" color="#00BFFF" onPress={() => navigation.navigate('Login') }/>
     </View>
   
  </View>
);

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
export default Home;