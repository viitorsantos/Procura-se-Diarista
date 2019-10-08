import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import axios from 'axios';


export default function Cadastro(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    
    async function registerSubmit(){
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <TextInput style={styles.input1} 
                    placeholder="Nome Completo"
                    value={nome}
                    onChangeText={setNome}
                    />
                <TextInput style={styles.input}
                    placeholder="CPF"
                    value={cpf}
                    onChangeText={setCpf}
                    />
                <TextInput style={styles.input}
                    placeholder="Celular"
                    value={phone}
                    onChangeText={setPhone}
                    />
                <TextInput style={styles.input}
                    placeholder="Email"
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
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>CADASTRAR</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
    container:{
        flex:1,        
        justifyContent:'center',
        alignItems:'center'
    },  
    form:{
        alignSelf: 'stretch',
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
    },
    botao: {
        marginTop:15,
        paddingLeft:30,
        paddingRight:30,
    },
});
