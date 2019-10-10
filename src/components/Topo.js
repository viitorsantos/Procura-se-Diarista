import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { Container, Header, Body, View, Text, Tab, Tabs, Icon, TabHeading, Content,
Card, CardItem, Left, Thumbnail } from 'native-base';
import { StyleSheet, Button, ScrollView, AsyncStorage } from 'react-native';


export default function Topo({ navigation }){
    return(
        <Header style={styles.header} >
            <Body>
                <Text style={styles.texto}>Agenda</Text>
            </Body>
            <Icon style={styles.icon} type="FontAwesome" name="user-o" 
            onPress={() => navigation.navigate('Perfil') } />
            <Icon style={styles.icon2} type="Entypo" name="dots-three-vertical"
            onPress={() => navigation.navigate('Login') } />
        </Header>
    );
}

const styles = StyleSheet.create({
    header: { 
        backgroundColor: "#00BFFF"
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
    }
});
  