import React from 'react';
import { View, Button, Text, StyleSheet,TextInput,TouchableOpacity } from 'react-native';


export default class Login extends React.Component{
    render() {
        const id = this.props.navigation.getParam('id', '');
        let tipologin = '';
        if(id==1){
            tipologin = 'DiaristaPrincipal';
        }else{
            tipologin = 'Entrar';
        }
      
      return (
    <View>
        <View style={styles.form}>
            <TextInput style={styles.input1} placeholder="Email"/>
            <TextInput style={styles.input}
                secureTextEntry
            placeholder="Senha"/>
            <TouchableOpacity onPress={this._handleHelpPress}>
                <Text style={styles.helpLinkText}>Esqueceu sua senha? </Text>
            </TouchableOpacity>
        </View>
        <View style={styles.botao}>
             <Button title="Entrar" color="#00BFFF" 
             onPress={() => this.props.navigation.navigate(tipologin) }/>
        </View>
        <View style={styles.botao}>
             <Button title="Cadastrar" color="#00BFFF" 
             onPress={() => this.props.navigation.navigate('Cadastro') }/>
        </View>
        <Text style={styles.ou}>OU</Text>
        <View style={styles.botao}>
             <Button title="Entrar com Facebook" color="#00BFFF" 
             onPress={() => navigation.navigate('') }/>
        </View>
    </View>
  );
}
}

  const styles = StyleSheet.create({
    form:{
        paddingLeft:30,
        paddingRight:30,
    },
    input1:{
        height:50,
        borderBottomWidth:2,
        borderBottomColor:'#7B68EE',
        marginTop:40,
    },
    input:{
        height:50,
        borderBottomWidth:2,
        borderBottomColor:'#7B68EE',
        marginTop:10,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
        marginTop:15,
    },
    botao: {
        marginTop:30,
        paddingLeft:30,
        paddingRight:30,
  
    },
    ou: {
        fontSize:10,
        textAlign:'center',
        marginTop:30,
    },
});


