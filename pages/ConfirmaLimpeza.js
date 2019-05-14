import React from 'react';
import { StyleSheet, ScrollView, TextInput, Button} from 'react-native';
import { Body, View, Text, Content, Card, CardItem, Left, Thumbnail } from 'native-base';

//Dados
const listaDiaristas = [
  { id: 1, nome: 'Alice dos Santos', dia: '24/05/2019', hora:'09:00', endereco:'Rua Francisca de Oliveira, 116',
   descricao:'Limpeza geral e passar as roupas',
   foto: 'https://secure.gravatar.com/avatar/4a75e363796021a2bc2b9f805bacc2da?s=500&d=mm&r=g'},
];

const ConfirmaLimpeza = ({ navigation }) => (
  <ScrollView>
    <Content>
        <Text style={styles.titulo}>Diarista</Text>
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
            </CardItem>
        </Card>))}
        <Text style={styles.titulo}>Data e Horário</Text>
         <View style={styles.dataehora}>
           <View style={styles.data}>
             <Text note>Data</Text>
               <TextInput placeholder="dd/mm/aaaa"/>
           </View>
           <View style={styles.hora}>
             <Text note>Horário</Text>
              <TextInput placeholder="hh:mm"/>
            </View>
         </View>
         <Text style={styles.titulo}>Local</Text>
         <View style={styles.dataehora}>
                <Text note style={styles.endereco}>Rua: Francisca de Oliveira N 116</Text>
         </View>
         <Text style={styles.titulo}>Descrição</Text>
         <View style={styles.dataehora}>
                <Text note style={styles.endereco}>Limpeza Geral</Text>
         </View>
         <View style={styles.botao}>
            <Button title="Agendar" color="#00BFFF" onPress={() => navigation.navigate('ConfirmacaoLimpeza') }/>
         </View>
    </Content>
  </ScrollView>
);

const styles = StyleSheet.create({
  titulo:{
      padding:10,
      fontSize:18,
  },
  carditem:{
      backgroundColor:'#fafafa',
  },
  textodescricao:{
      fontSize:14,
  },
  dataehora:{
    borderWidth:2,
    borderColor:'#F8F8FF',
    height:70,
  },
  data:{
      width:100,
      marginLeft:100,
      marginTop:8,
  },
  hora:{
      width:100,
      marginLeft: 200,
      marginTop: -47,
  },
  endereco:{
      marginTop:22,
      textAlign:'center',
  },
  botao: {
    width:300,
    marginTop:5,
    marginLeft:31,
  },
});

export default ConfirmaLimpeza;