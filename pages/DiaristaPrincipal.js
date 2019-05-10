import React from 'react';
import { Container, Header, Body, View, Text, Tab, Tabs, Icon, TabHeading, Content,
Card, CardItem, Left, Thumbnail } from 'native-base';
import { StyleSheet, Button, ScrollView } from 'react-native';


//Dados
const listaDiaristas = [
    { id: 1, nome: 'Alice dos Santos', dia: '24/05/2019', hora:'09:00', endereco:'Rua Francisca de Oliveira, 116',
     descricao:'Limpeza geral e passar as roupas',
     foto: 'https://secure.gravatar.com/avatar/4a75e363796021a2bc2b9f805bacc2da?s=500&d=mm&r=g'},
    { id: 2, nome: 'Mariazinha da Silva', dia: '26/05/2019', hora:'09:00', endereco:'Av Republica, 15',
    descricao:'Limpeza geral',
     foto: 'https://secure.gravatar.com/avatar/8834a7ccea235ca4cca9c970d95e27f3?s=500&d=mm&r=g'},
  ];
  

const Pendente = ({ pendente }) => (
    <ScrollView>
    <View style={styles.solicitacaoView}>
        <Text style={styles.solicitacao}>Você ainda não possui diárias agendadas</Text>
        <Text style={styles.solicitacao}>Aguarde até que seja solicitada uma diária</Text>
    </View>
    </ScrollView>
);
const Agendado = ({ agendado }) => (
    <ScrollView>
    <Content>
        {listaDiaristas.map(lista => (
        <Card key={lista.id}>
            <CardItem style={styles.carditem}>
            <Left>
                <Thumbnail source={{ uri: lista.foto}} />
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
                <Text note style={styles.agendado}>INICIAR</Text>
            </View>
        </Card>))}
    </Content>
    </ScrollView>
);
const Realizado = ({ realizado }) => (
    <ScrollView>
    <Content>
        {listaDiaristas.map(lista => (
        <Card key={lista.id}>
            <CardItem style={styles.carditem}>
            <Left>
                <Thumbnail source={{ uri: lista.foto}} />
                <Body style={styles.body}>
                <Text>{lista.nome}</Text>
                <Text note>Dia {lista.dia} às {lista.hora}h</Text>
                <Text note>{lista.endereco}</Text>
                <Text style={styles.textodescricao}>{lista.descricao}</Text>
                </Body>
            </Left>
            </CardItem>
            <View style={styles.status}>
                <Text note style={styles.cancelar}>AGUARDANDO AVALIAÇÃO DO CLIENTE</Text>
            </View>
        </Card>))}
    </Content>
    </ScrollView>
);

const DiaristaPrincipal = ({ navigation }) => (
    <Container>
        <Header style={styles.header} >
            <Body>
                <Text style={styles.texto}>Agenda</Text>
            </Body>
            <Icon style={styles.icon} type="FontAwesome" name="user-o" 
            onPress={() => navigation.navigate('PerfilCliente') } />
            <Icon style={styles.icon2} type="Entypo" name="dots-three-vertical"
            onPress={() => navigation.navigate('Login') } />
        </Header>
        <View style={styles.container}>
            <Tabs>
            <Tab heading={<TabHeading style={styles.menu} ><Text>Pendente</Text></TabHeading>}>
                <Pendente />
            </Tab>
            <Tab heading={<TabHeading style={styles.menu} ><Text>Agendado</Text></TabHeading>}>
                <Agendado agendado={listaDiaristas}/>
            </Tab>
            <Tab heading={<TabHeading style={styles.menu} ><Text>Realizado</Text></TabHeading>}>
                <Realizado concluido={listaDiaristas}/>
            </Tab>
            </Tabs>
        </View>
    </Container>
);

const styles = StyleSheet.create({
    header: { 
        backgroundColor: "#00BFFF",
        marginTop: 24.2,
    },
    menu: {
        backgroundColor: "#1E90FF",
    },
    container: {
        flex: 1,
    },
    texto: {
        fontSize:20,
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
    solicitacaoView:{
        marginTop:80,
    },
    solicitacao: {
        fontSize:30,
        marginTop:40,
        textAlign:'center',
    },
    carditem:{
        backgroundColor:'#F8F8FF',
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
  
export default DiaristaPrincipal;