import React from 'react';
import { View, Button, Text, StyleSheet, TextInput, ScrollView} from 'react-native';

const Cadastro = ({ navigation }) => (
  <ScrollView>
        <TextInput style={styles.input1} placeholder="Nome Completo"/>
        <TextInput style={styles.input} placeholder="CPF"/>
        <TextInput style={styles.input} placeholder="Data de Nascimento"/>
        <TextInput style={styles.input} placeholder="Celular"/>
        <TextInput style={styles.input} placeholder="Email"/>
        <TextInput style={styles.input} placeholder="Senha"/>
        <TextInput style={styles.input} placeholder="Confirmar Senha"/>
        <View style={styles.botao}>
             <Button title="Cadastrar" color="#00BFFF" onPress={() => navigation.navigate('') }/>
         </View>
  </ScrollView>
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
    botao: {
        width:300,
        marginTop:15,
        marginLeft:31,
    },
});
export default Cadastro;