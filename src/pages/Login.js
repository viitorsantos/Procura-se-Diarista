import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Button, Text, StyleSheet,TextInput,TouchableOpacity, Image } from 'react-native';

import api from '../services/api';
import logo from '../assets/logo.png';

export default function Login(){    
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function loginSubmit(){
        let authentication = JSON.stringify({
            Email :email,
            Password :senha
        });
        
        const response = await api.post('api/authentication/login', {
            authentication : authentication
            },
            { headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        });

        console.log(response);
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


