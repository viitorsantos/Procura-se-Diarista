import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Button, Text, StyleSheet,TextInput,TouchableOpacity, Image, Alert, AsyncStorage } from 'react-native';

import baseUrl from '../services/api';
import logo from '../assets/logo.png';

export default function Login({ navigation }){    
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user){
                if(user.Type == 1){
                    navigation.navigate('ClientePrincipal');
                }else{
                    navigation.navigate('DiaristaPrincipal');
                }                
            }
        })
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
            if (response.ok) {
                return response.json();
            }else{
                Alert.alert(
                    'Erro conectar',
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

        if(result.Type == 1){
            navigation.navigate('DiaristaPrincipal');
        }else{
            navigation.navigate('ClientePrincipal');
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <View style={styles.form}>
                <TextInput 
                    style={styles.input1}
                    placeholder="E-Mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
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
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>CADASTRAR-SE</Text>
                </TouchableOpacity>
                <Text style={styles.ou}>OU</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>ENTRAR COM FACEBOOK</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
        
        /*<View>
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
        </View>*/
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
    input1:{
        height:50,
        borderBottomWidth:1,
        borderBottomColor:'#7B68EE'
    },
    input:{
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


