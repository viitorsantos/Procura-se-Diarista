import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-navigation';
import { Container, Body, View, Text, Tab, Tabs, Icon, TabHeading, Content,
Card, CardItem, Left, Thumbnail } from 'native-base';
import { StyleSheet, Button, ScrollView, AsyncStorage } from 'react-native';


//Dados
const listaDiaristas = [
    { id: 1, nome: 'Alice dos Santos', dia: '24/05/2019', hora:'09:00', endereco:'Rua Francisca de Oliveira, 116',
     descricao:'Limpeza geral e passar as roupas',
     foto: 'https://secure.gravatar.com/avatar/4a75e363796021a2bc2b9f805bacc2da?s=500&d=mm&r=g'},
    { id: 2, nome: 'Mariazinha da Silva', dia: '26/05/2019', hora:'09:00', endereco:'Av Republica, 15',
    descricao:'Limpeza geral',
     foto: 'https://secure.gravatar.com/avatar/8834a7ccea235ca4cca9c970d95e27f3?s=500&d=mm&r=g'},
  ];
  
import Solicitacao from '../components/Solicitacao';
import Agendado from '../components/Agendado';
import Concluido from '../components/Concluido';
import Topo from '../components/Topo';

export default function Principal(){    
    const [id, setId] = useState('');
    const [type, setType] = useState('');
    const [diarias, setDiarias] = useState([]);

    useEffect(() => {
        async function loadDiarias(){
            await AsyncStorage.getItem('user').then(user => {
                setId(user.Id);
                setType(user.Type);
            })

            var apiUrl = type == 2 ? 'api/service/ListServiceCli/' : 'api/service/ListServiceDia';
            var result = await fetch(baseUrl + apiUrl + id, {
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
    })
    return (
        <SafeAreaView forceInset={{top: 'always'}} style={styles.container}>
            <Topo/>
            <View style={styles.container}>
                <Tabs>
                    <Tab heading={<TabHeading style={styles.menu} ><Text>Solicitações</Text></TabHeading>}>
                        <Solicitacao solicitado={listaDiaristas}/>
                    </Tab>
                    <Tab heading={<TabHeading style={styles.menu} ><Text>Agendado</Text></TabHeading>}>
                        <Agendado agendado={listaDiaristas}/>
                    </Tab>
                    <Tab heading={<TabHeading style={styles.menu} ><Text>Concluídos</Text></TabHeading>}>
                        <Concluido concluido={listaDiaristas}/>
                    </Tab>
                </Tabs>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    agenda:{

    },
    header: { 
        backgroundColor: "#00BFFF"
    },
    menu: {
        backgroundColor: "#1E90FF",
    },
    container: {
        flex: 1,
    },
    texto: {
        fontSize:20,
        fontWeight: 'bold',
        color:'white',
        marginLeft:30,
    },
    icon: {
        color:'white',
        marginTop:15,
        marginRight:20,
    },
    icon2: {
        color:'white',
        marginTop:15,
    },
    icon3: {
        color:'white',
        marginTop:15,
        marginRight:30,
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
        backgroundColor:'#F8F8FF',
        marginLeft:10,
    },
    agendado:{
        backgroundColor:'#F8F8FF',
        marginLeft:270,
        marginTop:-18,
    }
  });
  