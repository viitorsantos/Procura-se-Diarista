import React from 'react';
import { StyleSheet, ScrollView, Button} from 'react-native';
import { Body, View, Text, Content, Card, CardItem, Left, Thumbnail } from 'native-base';

//Dados
const listaDiaristas = [
  { id: 1, nome: 'Alice dos Santos', dia: '24/05/2019', hora:'09:00', endereco:'Rua Francisca de Oliveira, 116',
   descricao:'Limpeza geral',
   foto: 'https://secure.gravatar.com/avatar/4a75e363796021a2bc2b9f805bacc2da?s=500&d=mm&r=g'},
];

const ConfirmacaoLimpeza = ({ navigation }) => (
<ScrollView>
    <Content>
        {listaDiaristas.map(lista => (
        <Card key={lista.id}>
            <CardItem style={styles.carditem}>
            <Left>
                <Thumbnail source={{ uri: lista.foto}} />
                <Body style={styles.body}>
                    <Text>{lista.nome}</Text>
                    <Text style={styles.textodescricao}>{lista.descricao}</Text>
                    <Text style={styles.textodescricao}>Dia {lista.dia} às {lista.hora}h</Text>
                    <Text style={styles.textodescricao}>{lista.endereco}</Text>
                    <Text style={styles.textodescricao}>{lista.descricao}</Text>
                </Body>
            </Left>     
            </CardItem>
        </Card>))}

         <View style={styles.botao}>
            <Button title="Confirmar" color="#00BFFF" onPress={() => navigation.navigate('LimpezaConfirmada') }/>
         </View>
    </Content>
  </ScrollView>
);

const styles = StyleSheet.create({
    carditem:{
        marginTop:10,
        backgroundColor:'#fafafa',
    },
    textodescricao:{
        fontSize:14,
    },

    botao: {
        width:300,
        marginTop:5,
        marginLeft:31,
        },
  });

export default ConfirmacaoLimpeza;