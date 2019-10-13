import React, {useState, useEffect} from 'react';
import { Container, Header, Body, View, Text, Content, Card, CardItem, Left, Thumbnail, Right } from 'native-base';
import { TouchableOpacity, ScrollView, StyleSheet, AsyncStorage, Image } from 'react-native';

import limpeza from "../assets/limpeza.png";

export default function Agendado({navigation}) {
    const [diarias, setDiarias] = useState([]);
    const [type, setType] = useState('');

    async function cancelService(id){
        await fetch('https://procurasediarista-api.azurewebsites.net/api/service/cancelar/'+id, { 
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
        var z = "";
        if(user.Type == 2){
            z = 'api/service/ListServiceCliAge/';
        }else{
            z = 'api/service/ListServiceDiaAge/';
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
                                    <Image style={styles.foto} source={limpeza}/>
                                    <Body style={styles.body}>
                                        <Text>{item.Description}</Text>
                                        <Text>{Moment(item.DataServico).locale('pt-br').format('L')}</Text>
                                        <Text>{item.Residence.Rua}, {item.Residence.Number}</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <TouchableOpacity onPress={() => cancelService(item.Id) }>
                                        <Text style={styles.cancelar}>CANCELAR</Text>
                                    </TouchableOpacity>                            
                                </Right>
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
    }
    else{
        if(diarias.length > 0){                         
            return (
                <ScrollView>
                    <Content>
                    {diarias.map(item => (
                        <Card key={item.Id}>
                            <CardItem style={styles.carditem}>
                                <Left>
                                    <Image style={styles.foto} source={limpeza}/>
                                    <Body style={styles.body}>
                                        <Text>{item.Description}</Text>
                                        <Text>{Moment(item.DataServico).locale('pt-br').format('L')}</Text>
                                        <Text>{item.Residence.Rua}, {item.Residence.Number}</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <TouchableOpacity onPress={() => cancelService(item.Id) }>
                                        <Text style={styles.cancelar}>CANCELAR</Text>
                                    </TouchableOpacity>                            
                                </Right>
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
    foto: {
        width: 100,
        height: 100
    },
    carditem:{
        backgroundColor:'#fafafa',
    },
    body:{
        marginLeft:35,
    },
    textodescricao:{
        fontSize:14,
    },
    status:{
        backgroundColor:'#F8F8FF',
    },
    cancelar:{
        color: '#ff0000'
    },
    agendado:{
        backgroundColor:'#F8F8FF',
        marginLeft:270,
        marginTop:-18,
    }
});
  