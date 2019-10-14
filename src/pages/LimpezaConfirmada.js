import React, {useEffect} from 'react';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, Button} from 'react-native';
import {Text, Content, Icon, View } from 'native-base';

export default function LimpezaConfirmada({navigation}){
    useEffect(() => {
        setTimeout(() =>{
            navigation.navigate('Principal');
        }, 2000);
    }, []);

    return(        
        <SafeAreaView forceInset={{top: 'always'}} style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
            <Icon style={styles.icon} type="MaterialIcons" name="done" />
            <Text style={styles.texto} >Diária agendada com sucesso!</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    icon:{
        color:'#00FA9A',
        textAlign:'center',
        fontSize:100
    },
    view:{        
        flex:1,        
        alignItems:'center',
        justifyContent: 'center'
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