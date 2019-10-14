import React, {useState, useEffect} from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, ScrollView, TextInput, Button, TouchableOpacity, AsyncStorage, ActivityIndicator} from 'react-native';
import { Body, View, Text, Content, Card, CardItem, Left, Thumbnail, Header, Icon } from 'native-base';

import avatar from "../assets/thumb.jpg";
import casas from "../assets/casa.jpg";

export default function ConfirmaLimpeza({ navigation }) {
    const [diarista, setDiarista] = useState({});
    const [data, setData] = useState('');
    const [description, setDescription] = useState('');
    const [casa, setCasa] = useState({});    
    const [loading, setLoading] = useState(false);
    
    async function getHouse(){
        let casaId = await AsyncStorage.getItem('casaId');

        const result = await fetch('https://procurasediarista-api.azurewebsites.net/api/residence/detail/'+casaId, { 
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
                    'Erro ao buscar casa',
                    'Verifique sua conexão e tente novamente',
                    [
                        {text: 'OK'},
                    ],
                );
            }
        })
        .then(resposta => { return resposta; })
        .catch((error) => { console.error(error); });
        setCasa(result);
    }

    async function getDiarista(){
        let diaristaId = await AsyncStorage.getItem('diaristaId');

        const result = await fetch('https://procurasediarista-api.azurewebsites.net/api/user/GetUser/'+diaristaId, { 
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
                    'Erro ao buscar diarista',
                    'Verifique sua conexão e tente novamente',
                    [
                        {text: 'OK'},
                    ],
                );
            }
        })
        .then(resposta => { return resposta; })
        .catch((error) => { console.error(error); });
        setDiarista(result);
    }

    async function createService(){
        setLoading(true);
        let user = JSON.parse(await AsyncStorage.getItem('user'));
        let diaristaId = await AsyncStorage.getItem('diaristaId');
        let casaId = await AsyncStorage.getItem('casaId');

        let service = JSON.stringify({
            IdClient : user.Id,
            IdDiarist : diaristaId,
            IdResidence : casaId,
            DataServico : data,
            Description : description
        });

        await fetch('https://procurasediarista-api.azurewebsites.net/api/service/create', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: service
        })            
        .then(response=> {
            if (response.status == 200) {
                navigation.navigate('LimpezaConfirmada');
            }else{
                Alert.alert(
                    'Erro ao solicitar serviço',
                    [
                        {text: 'OK'},
                    ],
                );                    
                setLoading(false);
            }
        })  
    }

    useEffect(() =>{
        getDiarista();
        getHouse();
    }, []);

    if(!loading){
        return(
            <SafeAreaView forceInset={{top: 'always'}} style={{flex:1}}>
                <Header style={styles.header} >
                    <Body style={styles.body}>                    
                        <TouchableOpacity style={styles.positionButton}>
                            <Icon style={styles.icon3} type="MaterialIcons" name="arrow-back" 
                                onPress={() => navigation.navigate('ConfirmaCasa')} />
                        </TouchableOpacity>
                        <Text style={styles.perfill}>Confirmar Dados</Text>
                    </Body>                
                </Header>
                <Card>
                    <CardItem style={styles.carditem}>
                        <Left>
                            <Thumbnail source={avatar}/>
                            <Body>
                                <Text>{diarista.Name}</Text>
                                <Text style={styles.textodescricao}>{diarista.Phone}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>            
                <Card>     
                    <CardItem style={styles.carditem}>
                        <Left>
                            <Thumbnail source={casas}/>
                            <Body>
                                <Text style={styles.texto}>{casa.Description}</Text>
                                <Text style={styles.texto}>{casa.CEP}</Text>
                                <Text style={styles.texto}>{casa.Rua}, {casa.Number}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
                <View style={styles.form}>
                    <TextInput style={styles.input1} 
                    placeholder="Data"
                    value={data}
                    onChangeText={setData}
                    />
                    <TextInput style={styles.input}
                    placeholder="Descrição"
                    value={description}
                    onChangeText={setDescription}
                    />
                     <TouchableOpacity style={styles.button} onPress={createService}>
                        <Text style={styles.buttonText}>CADASTRAR SERVIÇO</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }else{
        return(
            <ActivityIndicator style={styles.container} size="large" color="#00BFFF"/>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    titulo: {
        padding: 10,
        fontSize: 18,
    },
    card:{
        marginHorizontal: 40
    },
    carditem: {
        backgroundColor: '#fafafa',
    },
    form:{
        alignSelf: 'stretch',
        justifyContent: 'center',
        paddingHorizontal: 30
    },
    input1:{
        height:50,
        borderBottomWidth:2,
        borderBottomColor:'#7B68EE',
        marginTop:40,
    },
    input:{
        height:50,
        borderBottomWidth:2,
        borderBottomColor:'#7B68EE',
        marginTop:10,
    },
    textodescricao: {
        fontSize: 14,
    },
    dataehora: {
        borderWidth: 2,
        borderColor: '#F8F8FF',
        height: 70,
    },
    data: {
        width: 100,
        marginLeft: 100,
        marginTop: 8,
    },
    hora: {
        width: 100,
        marginLeft: 200,
        marginTop: -47,
    },
    endereco: {
        marginTop: 22,
        textAlign: 'center',
    },
    button:{
        marginTop:10,
        height:40,
        backgroundColor: '#00BFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:2
    },
    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
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
    positionButton:{
        position: 'absolute',
        left: 10,
        top: -17
    },
});