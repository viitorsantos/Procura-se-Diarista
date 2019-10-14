import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Alert, AsyncStorage, TouchableOpacity, Image, KeyboardAvoidingView, FlatList } from 'react-native';
import { Icon, Body, Card, CardItem, Left, Thumbnail, Right } from 'native-base';
import Moment from 'moment';

import limpeza from "../assets/thumb.jpg";
import limpeza2 from "../assets/diana-pessoa.jpg";
import casa from "../assets/casa.jpg";

export default function Solicitacao({navigation}){    
    const [diarias, setDiarias] = useState([]);
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(false);

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
        await fetch('https://procurasediarista-api.azurewebsites.net/api/service/rejeitar/'+id, { 
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
                    'Erro ao rejeitar',
                    'Verifique sua conexão e tente novamente',
                    [
                        {text: 'OK'},
                    ],
                );
            }
        });
    }

    async function loadDiarias(){          

        let isPage = true;

        setLoading(true);       
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
        setLoading(false);
        setDiarias(result);
    }

    useEffect(() => {  
        loadDiarias();
    }, []);

    if(type == 2){
        if(diarias.length > 0 || loading){
            return (
                <KeyboardAvoidingView style={{flex: 1}}>
                    <FlatList
                    data={diarias}
                    keyExtractor={diaria => String(diaria.Id)}
                    onRefresh={loadDiarias}
                    refreshing={loading}
                    renderItem={({ item })=> (
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
                        </Card>
                        )}
                    />       
                    <TouchableOpacity style={styles.positionButton}>
                        <Icon style={styles.icon3} type="MaterialIcons" name="add-circle" 
                            onPress={() => navigation.navigate('SolicitaLimpeza')} />
                    </TouchableOpacity>             
                </KeyboardAvoidingView>
            );
        }else{
            return(
                <KeyboardAvoidingView style={{flex: 1}}>
                    <View style={styles.solicitacaoView}>
                        <Text style={styles.solicitacao}>Você não possui nenhuma diária solicitada.</Text>
                        <Text style={styles.solicitacao}>Solicite uma agora mesmo.</Text>
                    </View>                
                    <View>
                        <TouchableOpacity style={styles.positionButton}>
                            <Icon style={styles.icon3} type="MaterialIcons" name="add-circle" 
                                onPress={() => navigation.navigate('SolicitaLimpeza')} />
                        </TouchableOpacity>             
                    </View>
                </KeyboardAvoidingView>   
            );
        }    
    }else{
        if(diarias.length > 0 || loading){       
            return(                
                <FlatList
                data={diarias}
                keyExtractor={diaria => String(diaria.Id)}
                onRefresh={loadDiarias}
                refreshing={loading}
                renderItem={({ item })=> (
                    <Card key={item.Id} style={styles.card}>
                        <CardItem style={styles.carditem}>
                            <Left>
                                <Image style={styles.foto} source={limpeza2} />
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
                                    <Text style={styles.cancelar}>REJEITAR</Text>
                                </TouchableOpacity>
                            </Right>
                        </CardItem>                                
                        <CardItem cardBody>
                            <Image source={casa} style={{height: 300, width: null, flex: 1}}/>
                        </CardItem>
                    </Card>
                    )}
                />
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
        color :'#1fab49',
        fontSize:20
    },
    cancelar:{
        color: '#ff0000'
    },
    foto: {
        width: 100,
        height: 100
    },
    solicitacao: {
        fontSize:25,
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
        fontSize:80  
    },
    positionButton:{
        position: 'absolute',
        bottom: 10,
        right: 15
    },
    recuse:{
        marginTop:20
    }
});