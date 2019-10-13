import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-navigation';
import { Container, Body, View, Text, Tab, Tabs, Icon, TabHeading, Content,
Card, CardItem, Left, Thumbnail , Header} from 'native-base';
import { StyleSheet, Button, ScrollView, AsyncStorage, Alert } from 'react-native';

import Agendado from '../components/Agendado';
import Concluido from '../components/Concluido';
import Solicitacao from '../components/Solicitacao';

export default function Principal({ navigation }){    

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
                        <Solicitacao navigation={navigation}/>
                    </Tab>
                    <Tab heading={<TabHeading style={styles.menu} ><Text>Agendado</Text></TabHeading>}>
                        <Agendado navigation={navigation}/>
                    </Tab>
                    <Tab heading={<TabHeading style={styles.menu} ><Text>Concluídos</Text></TabHeading>}>
                        <Concluido navigation={navigation}/>
                    </Tab>
                </Tabs>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    solicitacao: {
        fontSize:15,
        marginTop:70,
        textAlign:'center',
    },
    solicitacaoView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
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
  