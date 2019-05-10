import React from 'react';
import { View, Button, Text, StyleSheet,TextInput,TouchableOpacity } from 'react-native';


const Login = ({ navigation }) => (
    <View>
        <TextInput style={styles.input1} placeholder="Email"/>
        <TextInput style={styles.input} placeholder="Senha"/>
        <TouchableOpacity onPress={this._handleHelpPress}>
            <Text style={styles.helpLinkText}>Esqueceu sua senha? </Text>
        </TouchableOpacity>
        <View style={styles.botao}>
             <Button title="Entrar" color="#00BFFF" onPress={() => navigation.navigate('Entrar') }/>
        </View>
        <View style={styles.botao}>
             <Button title="Cadastrar" color="#00BFFF" onPress={() => navigation.navigate('Cadastro') }/>
        </View>
        <Text style={styles.ou}>OU</Text>
        <View style={styles.botao}>
             <Button title="Entrar com Facebook" color="#00BFFF" onPress={() => navigation.navigate('') }/>
        </View>
    </View>
);

  const styles = StyleSheet.create({
    input1:{
        width:300,
        height:50,
        borderBottomWidth:2,
        borderBottomColor:'#7B68EE',
        marginLeft:28,
        marginTop:40,
    },
    input:{
        width:300,
        height:50,
        borderBottomWidth:2,
        borderBottomColor:'#7B68EE',
        marginLeft:28,
        marginTop:10,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
        marginLeft:28,
        marginTop:15,
    },
    botao: {
        width:300,
        marginTop:30,
        marginLeft:31,
    },
    ou: {
        fontSize:10,
        textAlign:'center',
        marginTop:30,
    },
});

export default Login;
