import React, { useState } from 'react';
import { SafeAreaView } from 'react-navigation';
import { View, Button, Text, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity, Alert, AsyncStorage, ActivityIndicator} from 'react-native';
import { Body, Header, Icon } from 'native-base';

export default function CadastroEnderecos({navigation}){    
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [number, setNumber] = useState('');
    const [loading, setLoading] = useState(false);

    async function registerHouse(){        
        setLoading(true);
        if(type == ""
        || description == ""
        || cep == ""
        || rua == ""
        || number == ""){
            Alert.alert(
                'Erro ao cadastrar',
                'Dados não foram preenchidos corretamente',
                [
                {text: 'OK'},
                ],
            );
            setLoading(false);
            return;
        }else{
            let user = JSON.parse(await AsyncStorage.getItem("user"));  

            let house = JSON.stringify({
                IdClient : user.Id,
                Type : type,
                Description : description,
                CEP : cep,
                Rua : rua,
                Number : number
            });

            await fetch('https://procurasediarista-api.azurewebsites.net/api/residence/create', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: house
            })            
            .then(response=> {
                if (response.status == 200) {
                    navigation.navigate('Perfil');
                }else{
                    Alert.alert(
                        'Erro ao cadastrar',
                        'Existem dados inválidos',
                        [
                            {text: 'OK'},
                        ],
                    );                    
                    setLoading(false);
                }
            })   
        }
    }
    if(!loading)
    {
        return(                                         
            <SafeAreaView forceInset={{top: 'always'}} style={styles.title}>
                <Header style={styles.header} >
                    <Body style={styles.body}>                    
                        <TouchableOpacity style={styles.positionButton}>
                            <Icon style={styles.icon3} type="MaterialIcons" name="arrow-back" 
                                onPress={() => navigation.navigate('Perfil')} />
                        </TouchableOpacity>
                        <Text style={styles.perfill}>Cadastrar Endereço</Text>
                    </Body>                
                </Header>              
                <View style={styles.form}>
                    <TextInput style={styles.input1} 
                        placeholder="Tipo"
                        value={type}
                        onChangeText={setType}
                        />
                    <TextInput style={styles.input}
                        placeholder="CEP"
                        value={cep}
                        onChangeText={setCep}
                        />
                    <TextInput style={styles.input} 
                        placeholder="Rua"
                        value={rua}
                        onChangeText={setRua}
                        />
                    <TextInput style={styles.input}
                        placeholder="Número"
                        value={number}
                        onChangeText={setNumber}
                        />
                    <TextInput style={styles.input}
                        placeholder="Descrição"
                        value={description}
                        onChangeText={setDescription}
                        />                              
                    <TouchableOpacity style={styles.button} onPress={registerHouse}>
                        <Text style={styles.buttonText}>CADASTRAR</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }else{        
        return(
            <ActivityIndicator style={styles.container} size="large" color="#00BFFF"/>
        );
    }
    
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
        marginTop:30,
        alignSelf: 'stretch',
        justifyContent: 'center',
        paddingHorizontal: 30
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
    body:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon3: {
        color:'white',
        marginTop:15,
        marginRight:30,
    },
    perfill:{
        fontSize:20,
        fontWeight: 'bold',
        color:'white',
        textAlign:'center'
    },
    icon: {
        color:'white',
        marginTop:15,
        marginRight:20,
    },
    header: { 
        backgroundColor: "#00BFFF",
    },
    positionButton:{
        position: 'absolute',
        left: 10,
        top: -17
    },
});
