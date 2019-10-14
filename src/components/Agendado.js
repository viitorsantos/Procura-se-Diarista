import React, {useState, useEffect} from 'react';
import { Container, Header, Body, View, Text, Content, Card, CardItem, Left, Thumbnail, Right, Icon } from 'native-base';
import { TouchableOpacity, ScrollView, StyleSheet, AsyncStorage, Image, KeyboardAvoidingView, FlatList } from 'react-native';
import Moment from 'moment';

import limpeza from "../assets/thumb.jpg";
import casa from "../assets/casa.jpg";
import limpeza2 from "../assets/diana-pessoa.jpg";

export default function Agendado({navigation}) {
    const [diarias, setDiarias] = useState([]);
    const [type, setType] = useState('');    
    const [loading, setLoading] = useState(false);

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
        setLoading(true);       
        var user = JSON.parse(await AsyncStorage.getItem("user"));     
        setType(user.Type);    
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
        setLoading(false);
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
                        <Text style={styles.solicitacao}>Você não possui nenhuma diária agendada.</Text>
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
            return (
                <FlatList
                data={diarias}
                keyExtractor={diaria => String(diaria.Id)}
                onRefresh={loadDiarias}
                refreshing={loading}
                renderItem={({ item })=> (
                    <Card key={item.Id}>
                        <CardItem style={styles.carditem}>
                            <Left>
                                <Image style={styles.foto} source={limpeza2}/>
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
    solicitacao: {
        fontSize:25,
        textAlign:'center',     
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
    },
    icon3: {
        color:'#00BFFF',
        fontSize:80  
    },
    positionButton:{
        position: 'absolute',
        bottom: 10,
        right: 15
    }
});
  