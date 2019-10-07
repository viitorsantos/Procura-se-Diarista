import React from 'react';
import { StyleSheet, Button} from 'react-native';
import {Text, Content, Icon, View } from 'native-base';


const LimpezaConfirmada = ({ navigation }) => (
    <Content>
        <View style={styles.view}>
            <Icon style={styles.icon} type="AntDesign" name="checkcircleo" />
            <Text style={styles.texto} >Diária agendada com sucesso!</Text>
        </View>
        
        <View style={styles.botao}>
            <Button title="Voltar para Agenda" color="#00BFFF" onPress={() => navigation.navigate('Entrar') }/>
         </View>
    </Content>
);

const styles = StyleSheet.create({
    icon:{
        color:'#00FA9A',
        flexGrow:1,
        textAlign:'center',
    },
    view:{
        marginTop:250,
    },
    texto:{
        textAlign:"center",
        fontSize:25,
    },
    botao:{
        width:300,
        marginTop:10,
        marginLeft:31,
    },
  });

export default LimpezaConfirmada;