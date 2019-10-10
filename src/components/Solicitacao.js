import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

export default function Solicitacao({diarias , navigation})
{
    return(
        <ScrollView>
            <View style={styles.solicitacaoView}>
                <Text style={styles.solicitacao}>Você ainda não possui diárias solicitadas.</Text>
                <Text style={styles.solicitacao}>Agende uma diária agora mesmo clicando no +</Text>
                
                <Icon style={styles.icon3} type="Feather" name="plus-circle" 
                onPress={() => navigation.navigate('SolicitaLimpeza') } />
            </View>
        </ScrollView>
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
});