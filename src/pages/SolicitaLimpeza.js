import React from 'react';
import { StyleSheet, ScrollView} from 'react-native';
import { Body, View, Text, Content, Card, CardItem, Left, Thumbnail } from 'native-base';
import { RadioButton } from 'react-native-paper';

//Dados
const listaDiaristas = [
  { id: 1, nome: 'Alice dos Santos', dia: '24/05/2019', hora:'09:00', endereco:'Rua Francisca de Oliveira, 116',
   descricao:'Limpeza geral e passar as roupas',
   foto: 'https://secure.gravatar.com/avatar/4a75e363796021a2bc2b9f805bacc2da?s=500&d=mm&r=g'},
  { id: 2, nome: 'Mariazinha da Silva', dia: '26/05/2019', hora:'09:00', endereco:'Av Republica, 15',
  descricao:'Limpeza geral',
   foto: 'https://secure.gravatar.com/avatar/8834a7ccea235ca4cca9c970d95e27f3?s=500&d=mm&r=g'},
];

const SolicitaLimpeza = ({ navigation }) => (
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
                </Body>
            </Left>
            <RadioButton value="proximo"
            onPress={() => navigation.navigate('ConfirmaLimpeza') } />
            </CardItem>
        </Card>))}
    </Content>
  </ScrollView>
);

const styles = StyleSheet.create({
  carditem:{
      backgroundColor:'#fafafa',
  },
  textodescricao:{
      fontSize:14,
  }
});

export default SolicitaLimpeza;