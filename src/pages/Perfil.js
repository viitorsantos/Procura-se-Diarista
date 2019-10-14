import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-navigation";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    AsyncStorage,
    FlatList,
    TouchableOpacity
} from "react-native";
import {
    Body,
    Content,
    Card,
    CardItem,
    Left,
    Thumbnail,
    Icon,
    Right,    
    Header
} from "native-base";

import avatar from "../assets/icon-avatar.png";
import casa from "../assets/casa.jpg";

const enderecos = [
  {
    id: 1,
    tipo: "Casa",
    rua: "Rua A",
    numero: "10",
    bairro: "Centro",
    cidade: "Marília-SP"
  },
  {
    id: 2,
    tipo: "Escritório",
    rua: "Rua B",
    numero: "16",
    bairro: "Centro",
    cidade: "Marília-SP"
  }
];

export default function Perfil({navigation}) {
    const [user, setUser] = useState({});
    const [houses, setHouses] = useState([]);
    const [loading, setLoading] = useState(false);

    async function loadHouses(){        
        setLoading(true);
        var user = JSON.parse(await AsyncStorage.getItem("user")); 
        setUser(user);
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
            setHouses(result);
            setLoading(false);
        }       
    }

    useEffect(() => {
        loadHouses();
    }, []);

    if(user.Type == 2){
        return (
            <SafeAreaView forceInset={{ top: "always" }}>
                <Header style={styles.header} >
                    <Body style={styles.body}>
                        
                        <TouchableOpacity style={styles.positionButton}>
                            <Icon style={styles.icon3} type="MaterialIcons" name="arrow-back" 
                                onPress={() => navigation.navigate('Principal')} />
                        </TouchableOpacity>
                        <Text style={styles.perfill}>Perfil</Text>
                    </Body>                
                </Header>
                <ScrollView>
                    <Content>
                        <Card>
                            <CardItem>
                                <Left>
                                    <Image style={styles.foto} source={avatar} />   
                                    <Body>
                                        <Text style={styles.nome}>{user.Name}</Text>
                                        <Text style={styles.texto}>{user.Phone}</Text>
                                        <Text style={styles.texto}>{user.Email}</Text>
                                    </Body>                         
                                </Left>
                            </CardItem>
                        </Card>
                    </Content>
                </ScrollView>
                <View style={{paddingLeft:20}}>
                    <Text style={styles.endereco}>Meus Endereços</Text>
                    <Icon style={styles.icon} type="MaterialIcons" name="add-circle"
                        onPress={() => navigation.navigate("CadastroEnderecos")}
                    />
                </View>
                <FlatList
                data={houses}
                keyExtractor={house => String(house.Id)}
                onRefresh={loadHouses}
                refreshing={loading}
                renderItem={({ item }) => (
                    <Card>     
                        <CardItem style={styles.carditem}>
                            <Left>
                                <Thumbnail  source={casa}/>
                                <Body>
                                    <Text style={styles.texto}>{item.Description}</Text>
                                    <Text style={styles.texto}>{item.CEP}</Text>
                                    <Text style={styles.texto}>{item.Rua}, {item.Number}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>
                    )}
                />
            </SafeAreaView>
        );
    }else{
        return (
            <SafeAreaView forceInset={{ top: "always" }}>
                <Header style={styles.header} >
                    <Body style={styles.body}>
                        
                        <TouchableOpacity style={styles.positionButton}>
                            <Icon style={styles.icon3} type="MaterialIcons" name="arrow-back" 
                                onPress={() => navigation.navigate('Principal')} />
                        </TouchableOpacity>
                        <Text style={styles.perfill}>Perfil</Text>
                    </Body>                
                </Header>
                <ScrollView>
                    <Content>
                        <Card>
                            <CardItem>
                                <Left>
                                    <Image style={styles.foto} source={avatar} />   
                                    <Body>
                                        <Text style={styles.nome}>{user.Name}</Text>
                                        <Text style={styles.texto}>{user.Phone}</Text>
                                        <Text style={styles.texto}>{user.Email}</Text>
                                    </Body>                         
                                </Left>
                            </CardItem>
                        </Card>
                    </Content>
                </ScrollView>
            </SafeAreaView>
        );
    }
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
