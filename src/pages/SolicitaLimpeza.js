import React, {useState, useEffect} from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, FlatList, Alert, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { Body, View, Text, Content, Card, CardItem, Left, Thumbnail, Header, Icon } from 'native-base';

import avatar from "../assets/thumb.jpg";

export default function SolicitaLimpeza({ navigation }) {
    const [diaristas, setDiaristas] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getDiaristas(){
        const result = await fetch('https://procurasediarista-api.azurewebsites.net/api/user/ListUsers/1', { 
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
        setDiaristas(result);
    }

    async function solicitaDiaria(id){
        await AsyncStorage.setItem('diaristaId', String(id));
        navigation.navigate('ConfirmaCasa');
    }

    useEffect(() => {          
        getDiaristas();
    }, []);

    return(
        <SafeAreaView forceInset={{top: 'always'}} style={{flex:1}}>
            <Header style={styles.header} >
                <Body style={styles.body}>                    
                    <TouchableOpacity style={styles.positionButton}>
                        <Icon style={styles.icon3} type="MaterialIcons" name="arrow-back" 
                            onPress={() => navigation.navigate('Principal')} />
                    </TouchableOpacity>
                    <Text style={styles.perfill}>Escolha sua diarista</Text>
                </Body>                
            </Header>
            <FlatList
            data={diaristas}
            keyExtractor={diarista => String(diarista.Id)}
            onRefresh={getDiaristas}
            refreshing={loading}
            renderItem={({item}) => (
                <TouchableOpacity onPress={() => solicitaDiaria(item.Id)}>
                    <Card>                                            
                        <CardItem cardBody>
                            <Image source={avatar} style={{height: 300, width: null, flex: 1}}/>
                        </CardItem>
                        <CardItem style={styles.carditem}>
                            <Left>
                                <Body>
                                    <Text>{item.Name}</Text>
                                    <Text style={styles.textodescricao}>{item.Phone}</Text>
                                </Body>
                            </Left>
                        </CardItem>    
                    </Card>
                </TouchableOpacity>
                )}
            />  
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    body:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    positionButton:{
        position: 'absolute',
        left: 10,
        top: -17
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
    header: { 
        backgroundColor: "#00BFFF",
    },
    carditem: {
        backgroundColor: '#fafafa',
    },
    textodescricao: {
        fontSize: 14,
    }
});
