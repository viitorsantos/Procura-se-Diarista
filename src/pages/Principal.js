import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-navigation';
import { Container, Body, View, Text, Tab, Tabs, Icon, TabHeading, Content,
Card, CardItem, Left, Thumbnail , Header} from 'native-base';
import { StyleSheet, Button, ScrollView, AsyncStorage } from 'react-native';

import Solicitacao from '../components/Solicitacao';
import Agendado from '../components/Agendado';
import Concluido from '../components/Concluido';

export default function Principal({ navigation }){    
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
            <Header style={styles.header} >
                <Body>
                    <Text style={styles.texto}>Agenda</Text>
                </Body>
                <Icon style={styles.icon} type="FontAwesome" name="user-o" 
                onPress={() => navigation.navigate('Perfil') } />
                <Icon style={styles.icon2} type="Entypo" name="dots-three-vertical"
                onPress={() => navigation.navigate('Login') } />
            </Header>
            <View style={styles.container}>
                <Tabs>
                    <Tab heading={<TabHeading style={styles.menu} ><Text>Solicitações</Text></TabHeading>}>
                        <Solicitacao solicitado={diarias}/>
                    </Tab>
                    <Tab heading={<TabHeading style={styles.menu} ><Text>Agendado</Text></TabHeading>}>
                        <Agendado agendado={diarias}/>
                    </Tab>
                    <Tab heading={<TabHeading style={styles.menu} ><Text>Concluídos</Text></TabHeading>}>
                        <Concluido concluido={diarias}/>
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
  