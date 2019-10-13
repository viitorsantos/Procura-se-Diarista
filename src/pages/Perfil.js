import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-navigation";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  AsyncStorage
} from "react-native";
import {
  Body,
  Content,
  Card,
  CardItem,
  Left,
  Thumbnail,
  Icon
} from "native-base";

import avatar from "../assets/icon-avatar.png";


const enderecos = [
  {
    id: 1,
    tipo: "Casa",
    rua: "Rua A",
    numero: "10",
    bairro: "Centro",
    cidade: "Marília-SP"
  },
  {
    id: 2,
    tipo: "Escritório",
    rua: "Rua B",
    numero: "16",
    bairro: "Centro",
    cidade: "Marília-SP"
  }
];

export default function Perfil( { navigation } ) {
    const [user, setUser] = useState({});

    useEffect(() => {
        AsyncStorage.getItem("user").then(user => {
            setUser(JSON.parse(user));
        });
    }, []);
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
        <ScrollView>
            <Content>
                <Card>
                    <CardItem>
                        <Left>
                            <Image style={styles.foto} source={avatar} />
                            <Body>
                                <Text style={styles.nome}>{user.Name}</Text>
                                <Text style={styles.texto}>{user.Phone}</Text>
                                <Text style={styles.texto}>{user.Email}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            </Content>
            <View>
                <Text style={styles.endereco}>Meus Endereços</Text>
                <Icon
                    style={styles.icon}
                    type="Feather"
                    name="plus-circle"
                    onPress={() => this.props.navigation.navigate("CadastroEnderecos")}
                />
            </View>
            <Content>
                <Card>
                    <CardItem style={styles.carditem}>
                        <Left>
                            <Body>
                                <Text style={styles.texto}></Text>
                                <Text style={styles.texto}>
                                </Text>
                                <Text style={styles.texto}>
                                </Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            </Content>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    foto: {
        width: 100,
        height: 100
    },
    nome: {
        fontWeight: "bold",
        fontSize: 17,
        padding: 5,
        paddingLeft: 15
    },
    texto: {
        paddingLeft: 15
    },
    carditem: {
        backgroundColor: "#fafafa"
    },
    icon: {
        color: "#00BFFF",
        paddingRight: 10,
        flexGrow: 1,
        textAlign: "right",
        marginTop: -30
    },
    endereco: {
        fontWeight: "bold",
        fontSize: 15,
        padding: 5
    }
});
