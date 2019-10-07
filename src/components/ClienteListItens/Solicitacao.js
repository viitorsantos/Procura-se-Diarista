import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

export default function Solicitacao({diarias})
{
    return(
        <ScrollView>
            <View style={styles.solicitacaoView}>
                <Text style={styles.solicitacao}>Você ainda não possui diárias solicitadas.</Text>
                <Text style={styles.solicitacao}>Agende uma diária agora mesmo clicando no +</Text>
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
        marginTop:80,
    },
});