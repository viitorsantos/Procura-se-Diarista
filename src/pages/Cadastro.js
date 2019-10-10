import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { SafeAreaView } from 'react-navigation';

import baseUrl from '../services/api';

export default function Cadastro({navigation}){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    
    async function registerSubmit(){
        if(password != passwordCheck 
            || password == ""
            || nome == ""
            || email == ""
            || cpf == ""
            || phone == ""){
            Alert.alert(
                'Erro conectar',
                'Dados não foram preenchidos corretamente',
                [
                  {text: 'OK'},
                ],
            );
            return;
        }else{
            let register = JSON.stringify({
                Name : nome,
                CPF : cpf,
                Email : email,
                Password : password,
                Phone : phone,
                Type : navigation.state.params.type
            });

            var result = await fetch(baseUrl + 'api/user/Create', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: register
            })            
            .then(response=> {
                console.log(response, register);
                if (response.status == 200) {
                    return response.json();
                }else{
                    Alert.alert(
                        'Erro ao cadastrar',
                        'Existem dados inválidos',
                        [
                            {text: 'OK'},
                        ],
                    );
                }
            })                       
            .then(resposta => { return resposta; })
            .catch((error) => { console.error(error); });

            console.log(result);
            Alert.alert(
                'Usuário Cadastrado',
                'Sua conta foi cadastrada com sucesso',
                [
                    {text: 'OK', onPress: () => navigation.navigate('Login', { type : 2 })},
                ],
            );
        }
    }

    return(
        <KeyboardAvoidingView behavior="padding" style={styles.container}>            
            <SafeAreaView forceInset={{top: 'always'}} style={styles.title}>
                <Text style={styles.titleText}>CADASTRAR-SE</Text>
            </SafeAreaView>
            <View style={styles.form}>
                <TextInput style={styles.input1} 
                    placeholder="Nome Completo"
                    value={nome}
                    autoCapitalize="words"
                    onChangeText={setNome}
                    />
                <TextInput style={styles.input}
                    placeholder="CPF"
                    value={cpf}
                    keyboardType="numeric"
                    onChangeText={setCpf}
                    />
                <TextInput style={styles.input}
                    placeholder="Celular"
                    textContentType="telephoneNumber"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                    />
                <TextInput style={styles.input}
                    placeholder="Email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                    />
                <TextInput style={styles.input}
                    placeholder="Senha"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    />
                <TextInput style={styles.input}
                    placeholder="Confirmar Senha"
                    secureTextEntry
                    value={passwordCheck}
                    onChangeText={setPasswordCheck}
                    />                    
                <TouchableOpacity style={styles.button} onPress={registerSubmit}>
                    <Text style={styles.buttonText}>CADASTRAR</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
    
}

const styles = StyleSheet.create({
    title:{
        marginBottom: 20
    },
    titleText: {
        color:'#00BFFF',
        fontSize:16,
        fontWeight:'bold'
    },  
    container:{
        flex:1,        
        alignItems:'center',
        justifyContent: 'center'
    },  
    form:{
        alignSelf: 'stretch',
        justifyContent: 'center',
        paddingHorizontal: 30
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
        marginBottom:10
    },
    botao: {
        marginTop:15,
        paddingLeft:30,
        paddingRight:30,
    },
});
