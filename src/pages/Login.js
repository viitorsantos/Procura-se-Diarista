import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Button, Text, StyleSheet,TextInput,TouchableOpacity, Image, Alert, AsyncStorage } from 'react-native';

import baseUrl from '../services/api';
import logo from '../assets/logo.png';

export default function Login({ navigation }){    
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    var tp = navigation.state.params.type != undefined && navigation.state.params.type != null && navigation.state.params.type != "" ? navigation.state.params.type : 0;
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user){
                navigation.navigate('Principal');
            }
        });
    }, []);

    async function loginSubmit(){
        let authentication = JSON.stringify({
            Email :email,
            Password :senha
        });

        var result = await fetch(baseUrl + 'api/authentication/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: authentication
        })
        .then(response=> {
            if (response.status == 200) {
                return response.json();
                console.log()
            }else{
                Alert.alert(
                    'Erro logar',
                    'E-mail ou senha invalidos',
                    [
                        {text: 'OK'},
                    ],
                );
            }
        })
        .then(resposta => { return resposta; })
        .catch((error) => { console.error(error); });

        await AsyncStorage.setItem('user', JSON.stringify(result));

        navigation.navigate('Principal');

    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <View style={styles.form}>
                <TextInput 
                    style={styles.email}
                    placeholder="E-Mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.senha}
                    secureTextEntry
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                    autoCorrect={false}
                    placeholder="Senha"
                    value={senha}
                    onChangeText={setSenha}
                />
                <TouchableOpacity onPress={this._handleHelpPress}>
                    <Text style={styles.helpLinkText}>Esqueceu sua senha? </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={loginSubmit}>
                    <Text style={styles.buttonText}>ENTRAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('Cadastro', { type: tp })}>
                    <Text style={styles.buttonText}>CADASTRAR-SE</Text>
                </TouchableOpacity>
                <Text style={styles.ou}>OU</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>ENTRAR COM FACEBOOK</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        height:250,
        resizeMode: "contain"
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
    email:{
        height:50,
        borderBottomWidth:1,
        borderBottomColor:'#7B68EE'
    },
    senha:{
        height:50,
        borderBottomWidth:1,
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


