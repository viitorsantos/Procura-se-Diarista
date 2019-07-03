import React from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { Body, Content, Card, CardItem, Left, Thumbnail, Icon } from 'native-base';


const perfil = [
  { id: 1, nome: 'Alice dos Santos', telefone: '14-996439992', email:'diarista@hotmail.com',
   foto: 'https://secure.gravatar.com/avatar/4a75e363796021a2bc2b9f805bacc2da?s=500&d=mm&r=g'},
];

const descricao = [
  { id: 1, descricao: 'texto texto texto texto texto texto texto texto texto texto texto texto texto'},
];

export default class PerfilCliente extends React.Component{
  render() {
    return (
    <ScrollView>
      <Content>
          {perfil.map(lista => (
          <Card  key={lista.id}>
              <CardItem>
              <Left>
                  <Thumbnail style={styles.foto} source={{uri: lista.foto}} />
                  <Body>
                  <Text style={styles.nome}>{lista.nome}</Text>
                  <Text style={styles.texto}>{lista.telefone}</Text>
                  <Text style={styles.texto}>{lista.email}</Text>
                  </Body>
              </Left>
              </CardItem>
          </Card>))}
      </Content>
      <Content>
          {descricao.map(lista2 => (
          <Card  key={lista2.id}>
              <CardItem style={styles.carditem}>
              <Left>
                  <Body>
                  <Text style={styles.texto}>{lista2.descricao}</Text>
                  </Body>
              </Left>
              </CardItem>
          </Card>))}
      </Content>
    </ScrollView>
   );
  }
}

const styles = StyleSheet.create({
    foto:{
      width:100,
      height:100,
    },
    nome:{
      fontWeight:'bold',
      fontSize:17,
      padding:5,
      paddingLeft:15,
    },
    texto:{
      paddingLeft:15,
    },
    carditem:{
      backgroundColor:'#fafafa',
    },
});
