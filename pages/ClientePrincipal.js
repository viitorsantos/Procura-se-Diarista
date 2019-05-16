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
  



export default class ClientePrincipal extends React.Component{
    render() {
        const Solicitacao = ({ solicitacao }) => (
            <ScrollView>
            <View style={styles.solicitacaoView}>
                <Text style={styles.solicitacao}>Você ainda não possui diárias solicitadas.</Text>
                <Text style={styles.solicitacao}>Agende uma diária agora mesmo clicando no +</Text>
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
                        <Text note style={styles.agendado}>AGENDADO</Text>
                    </View>
                </Card>))}
            </Content>
            </ScrollView>
        );
        const Concluido = ({ concluido }) => (
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
                        <Text note style={styles.cancelar}>AVALIE O SERVIÇO</Text>
                    </View>
                </Card>))}
            </Content>
            </ScrollView>
        );
      return (
            <Container>
                <Header style={styles.header} >
                    <Body>
                        <Text style={styles.texto}>Agenda</Text>
                    </Body>
                    <Icon style={styles.icon3} type="Feather" name="plus-circle" 
                    onPress={() => this.props.navigation.navigate('SolicitaLimpeza') } />
                    <Icon style={styles.icon} type="FontAwesome" name="user-o" 
                    onPress={() => this.props.navigation.navigate('PerfilCliente') } />
                    <Icon style={styles.icon2} type="Entypo" name="dots-three-vertical"
                    onPress={() => this.props.navigation.navigate('Login') } />
                </Header>
                <View style={styles.container}>
                    <Tabs>
                    <Tab heading={<TabHeading style={styles.menu} ><Text>Solicitações</Text></TabHeading>}>
                        <Solicitacao />
                    </Tab>
                    <Tab heading={<TabHeading style={styles.menu} ><Text>Agendado</Text></TabHeading>}>
                        <Agendado agendado={listaDiaristas}/>
                    </Tab>
                    <Tab heading={<TabHeading style={styles.menu} ><Text>Concluídos</Text></TabHeading>}>
                        <Concluido concluido={listaDiaristas}/>
                    </Tab>
                    </Tabs>
                </View>
            </Container>
        );
    }
}

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
    icon3: {
        color:'white',
        marginTop:15,
        marginRight:30,
    },
    solicitacaoView:{
        marginTop:80,
    },
    solicitacao: {
        fontSize:15,
        marginTop:70,
        textAlign:'center',
    },
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
  