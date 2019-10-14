import React, {useState, useEffect} from 'react';
import { Container, Header, View, Text, Body,Content, Card, CardItem, Left, Right, Icon } from 'native-base';
import { ScrollView, StyleSheet, KeyboardAvoidingView, FlatList, AsyncStorage, TouchableOpacity } from 'react-native';
import Moment from 'moment';

import casa from "../assets/casa.jpg";
import limpeza from "../assets/thumb.jpg";
import limpeza2 from "../assets/diana-pessoa.jpg";

export default function Concluido({navigation}) {
    const [diarias, setDiarias] = useState([]);
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(false);

    async function loadDiarias(){    
        setLoading(true);
        var user = JSON.parse(await AsyncStorage.getItem("user")); 
        setType(user.Type);    
        var z = "";
        if(user.Type == 2){
            z = 'api/service/ListServiceCliCon/';
        }else{
            z = 'api/service/ListServiceDiaCon/';
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

    if(type == 2)
    {
        if(diarias.length > 0 || loading){
            return (
                <KeyboardAvoidingView style={{flex: 1}}>
                    <FlatList
                    data={diarias}
                    keyExtractor={diaria => String(diaria.Id)}
                    onRefresh={loadDiarias}
                    refreshing={loading}
                    renderItem={({ item })=> (
                        <Card key={item.id}>
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
                                    <Text note style={styles.aceitar}>AVALIE O SERVIÇO</Text>
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
                        <Text style={styles.solicitacao}>Você não possui nenhuma diária concluída.</Text>
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
                    <Card key={item.id}>
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
                                <Text note style={styles.aceitar}>AGUARDANDO AVALIAÇAO</Text>    
                            </Right>
                        </CardItem>                        
                        <CardItem cardBody>
                            <Image source={casa} style={{height: 300, width: null, flex: 1}}/>
                        </CardItem>
                    </Card>
                    )}
                />
            );
        }
        else{     
            return(
                <ScrollView>
                    <View style={styles.solicitacaoView}>
                        <Text style={styles.solicitacao}>Você não possui nenhuma diária concluída</Text>
                        <Text style={styles.solicitacao}>Aguarde até que seja solicitada uma diária</Text>
                    </View>
                </ScrollView>
            );
        }
    }   
}

const styles = StyleSheet.create({
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
    aceitar:{
        color :'#1fab49',
        fontSize:20
    },
    agendado:{
        backgroundColor:'#F8F8FF',
        marginLeft:270,
        marginTop:-18,
    },
    solicitacao: {
        fontSize:25,
        textAlign:'center',     
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
    }
});