import React, {useState, useEffect} from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, FlatList, Alert, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { Body, View, Text, Content, Card, CardItem, Left, Thumbnail, Header, Icon } from 'native-base';

import casa from "../assets/casa.jpg";

export default function ConfirmaCasa({navigation}){    
    const [casas, setCasas] = useState([]);
    const [loading, setLoading] = useState(false);

    async function loadHouses(){        
        setLoading(true);
        var user = JSON.parse(await AsyncStorage.getItem("user")); 
        if(user.Type == 2)
        {
            const result = await fetch('https://procurasediarista-api.azurewebsites.net/api/residence/ListHouse/'+user.Id, { 
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
                        'Erro ao buscar casas',
                        [
                            {text: 'OK'},
                        ],
                    );
                }
            })
            .then(resposta => { return resposta; })
            .catch((error) => { console.error(error); });
            setCasas(result);
            setLoading(false);
        }       
    }

    async function solicitaCasa(id){
        await AsyncStorage.setItem('casaId', String(id));
        navigation.navigate('ConfirmaLimpeza');
    }

    useEffect(() => {
        loadHouses();
    }, []);

    return(
        <SafeAreaView forceInset={{ top: "always" }}>
            <Header style={styles.header} >
                <Body style={styles.body}>                    
                    <TouchableOpacity style={styles.positionButton}>
                        <Icon style={styles.icon3} type="MaterialIcons" name="arrow-back" 
                            onPress={() => navigation.navigate('SolicitaLimpeza')} />
                    </TouchableOpacity>
                    <Text style={styles.perfill}>Escolha a casa</Text>
                </Body>                
            </Header>
            <FlatList
            data={casas}
            keyExtractor={casa => String(casa.Id)}
            onRefresh={loadHouses}
            refreshing={loading}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => solicitaCasa(item.Id)}>
                    <Card>                                            
                        <CardItem cardBody>
                            <Image source={casa} style={{height: 300, width: null, flex: 1}}/>
                        </CardItem>
                        <CardItem style={styles.carditem}>
                            <Left>
                                <Body>
                                    <Text style={styles.texto}>{item.Description}</Text>
                                    <Text style={styles.texto}>{item.CEP}</Text>
                                    <Text style={styles.texto}>{item.Rua}, {item.Number}</Text>
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
    foto: {
        width: 150,
        height: 150
    },
    positionButton:{
        position: 'absolute',
        left: 10,
        top: -17
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
    nome: {
        fontWeight: "bold",
        fontSize: 20,
        paddingLeft: 15
    },
    texto: {
        fontSize:15,
        paddingLeft: 15
    },
    carditem: {
        backgroundColor: "#fafafa"
    },
    icon: {
        color: "#00BFFF",
        paddingRight: 10,
        flexGrow: 1,
        textAlign: "right",
        marginTop: -30
    },
    endereco: {
        fontWeight: "bold",
        fontSize: 20,
        padding: 5
    }
});
