import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Alert, AsyncStorage, TouchableOpacity, Image } from 'react-native';
import { Icon, Body, Content, Card, CardItem, Left, Thumbnail, Right } from 'native-base';
import Moment from 'moment';

import limpeza from "../assets/limpeza.png";
import casa from "../assets/casa.jpg";
import { ActivityIndicator } from 'react-native-paper';

export default function Solicitacao({navigation}){    
    const [diarias, setDiarias] = useState([]);
    const [type, setType] = useState('');

    async function acceptService(id){
        await fetch('https://procurasediarista-api.azurewebsites.net/api/service/aceitar/'+id, { 
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response=> {
            if (response.status == 200) {
                loadDiarias();
            }else{
                Alert.alert(
                    'Erro ao aceitar',
                    'Verifique sua conexão e tente novamente',
                    [
                        {text: 'OK'},
                    ],
                );
            }
        });
    }

    async function recuseService(id){
        await fetch('https://procurasediarista-api.azurewebsites.net/api/service/recusar/'+id, { 
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response=> {
            if (response.status == 200) {
                loadDiarias();
            }else{
                Alert.alert(
                    'Erro ao aceitar',
                    'Verifique sua conexão e tente novamente',
                    [
                        {text: 'OK'},
                    ],
                );
            }
        });
    }

    async function loadDiarias(){    
        var user = JSON.parse(await AsyncStorage.getItem("user"));            
        setType(user.Type);
        var z = "";
        if(user.Type == 2){
            z = 'api/service/ListServiceCliSol/';
        }else{
            z = 'api/service/ListServiceDiaSol/';
        }
        const result = await fetch('https://procurasediarista-api.azurewebsites.net/'+z+user.Id, { 
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response=> {
            if (response.status == 200) {
                return response.json();
            }else{
                Alert.alert(
                    'Erro ao buscar diarias',
                    'Verifique sua conexão e tente novamente',
                    [
                        {text: 'OK'},
                    ],
                );
            }
        })
        .then(resposta => { return resposta; })
        .catch((error) => { console.error(error); });
        setDiarias(result);
    }

    useEffect(() => {  
        loadDiarias();
    }, []);

    if(type == 2){
        if(diarias.length > 0){
            return (
                <ScrollView>
                    <Content>
                        {diarias.map(item => (
                            <Card key={item.Id}>
                                <CardItem style={styles.carditem}>
                                    <Left>
                                        <Image style={styles.foto} source={limpeza} />
                                        <Body style={styles.body}>
                                            <Text>{item.Description}</Text>
                                            <Text>{Moment(item.DataServico).locale('pt-br').format('L')}</Text>
                                            <Text>{item.Residence.Rua}, {item.Residence.Number}</Text>
                                        </Body>
                                    </Left>
                                    <Right>          
                                        <Text style={styles.solicitado}>SOLICITADO</Text>                              
                                    </Right>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image source={casa} style={{height: 300, width: null, flex: 1}}/>
                                </CardItem>
                            </Card>))}
                    </Content>
                </ScrollView>
            );
        }else{
            return(
                <ScrollView>
                    <View style={styles.solicitacaoView}>
                        <Text style={styles.solicitacao}>Você ainda não possui diárias solicitadas.</Text>
                        <Text style={styles.solicitacao}>Agende uma diária agora mesmo clicando aqui</Text>                    
                        <Icon style={styles.icon3} type="Feather" name="plus-circle" 
                        onPress={() => navigation.navigate('SolicitaLimpeza')} />
                    </View>
                </ScrollView>
            );
        }    
    }else{
        if(diarias.length > 0){            
            return(                
                <ScrollView>
                    <Content>
                        {diarias.map(item => (
                            <Card key={item.Id} style={styles.card}>
                                <CardItem style={styles.carditem}>
                                    <Left>
                                        <Image style={styles.foto} source={limpeza} />
                                        <Body style={styles.body}>                                            
                                            <Text style={styles.solicitado}>SOLICITADO</Text>
                                            <Text>{item.Description}</Text>
                                            <Text>{Moment(item.DataServico).locale('pt-br').format('L')}</Text>
                                            <Text>{item.Residence.Rua}, {item.Residence.Number}</Text>
                                        </Body>
                                    </Left>
                                    <Right>
                                        <TouchableOpacity onPress={() => acceptService(item.Id)}>
                                            <Text style={styles.aceitar}>ACEITAR</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.recuse} onPress={() => recuseService(item.Id)}>
                                            <Text style={styles.cancelar}>RECUSAR</Text>
                                        </TouchableOpacity>
                                    </Right>
                                </CardItem>                                
                                <CardItem cardBody>
                                    <Image source={casa} style={{height: 300, width: null, flex: 1}}/>
                                </CardItem>
                            </Card>))}
                    </Content>
                </ScrollView>
            );
        }else{            
            return(
                <ScrollView>
                    <View style={styles.solicitacaoView}>
                        <Text style={styles.solicitacao}>Você ainda não possui diárias agendadas</Text>
                        <Text style={styles.solicitacao}>Aguarde até que seja solicitada uma diária</Text>
                    </View>
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    card:{
        marginHorizontal: 40
    },
    solicitado:{
        color: '#1E90FF'
    },
    aceitar:{
        color :'#1fab49'
    },
    cancelar:{
        color: '#ff0000'
    },
    foto: {
        width: 100,
        height: 100
    },
    solicitacao: {
        fontSize:15,
        marginTop:70,
        textAlign:'center',
        paddingHorizontal:30        
    },
    solicitacaoView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon3: {
        color:'#00BFFF',
        marginTop:40,
        fontSize:100,
        alignItems:'center',
        textAlign:'center',
    },
    recuse:{
        marginTop:10
    }
});