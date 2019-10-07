import React from 'react';
import { Container, Header, Body, View, Text, Content, Card, CardItem, Left, Thumbnail } from 'native-base';
import { ScrollView, StyleSheet } from 'react-native';


export default function Agendado({agendado}) {
    return (
        <ScrollView>
            <Content>
                {agendado.map(lista => (
                    <Card key={lista.id}>
                        <CardItem style={styles.carditem}>
                            <Left>
                                <Thumbnail source={{ uri: lista.foto }} />
                                <Body style={styles.body}>
                                    <Text>{lista.nome}</Text>
                                    <Text note>Dia {lista.dia} às {lista.hora}h</Text>
                                    <Text note>{lista.endereco}</Text>
                                    <Text style={styles.textodescricao}>{lista.descricao}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <View style={styles.status}>
                            <Text note style={styles.cancelar}>CANCELAR</Text>
                            <Text note style={styles.agendado}>AGENDADO</Text>
                        </View>
                    </Card>
                ))}
            </Content>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
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
  