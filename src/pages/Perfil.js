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

const perfil = [
  {
    id: 1,
    nome: "Alice dos Santos",
    telefone: "14-996439992",
    email: "diarista@hotmail.com",
    foto:
      "https://secure.gravatar.com/avatar/4a75e363796021a2bc2b9f805bacc2da?s=500&d=mm&r=g"
  }
];

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

export default function Perfil() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        async function loadPerfil() {
            AsyncStorage.getItem("user").then(user => {
                setNome(user.Name);
                setPhone(user.Phone);
                setEmail(user.Email);
                console.log(user);
            });
        }
    }, []);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
        <ScrollView>
            <Content>
                {perfil.map(lista => (
                    <Card key={lista.id}>
                    <CardItem>
                        <Left>
                            <Image style={styles.foto} source={avatar} />
                            <Body>
                                <Text style={styles.nome}>{nome}</Text>
                                <Text style={styles.texto}>{phone}</Text>
                                <Text style={styles.texto}>{email}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    </Card>
                ))}
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
                {enderecos.map(lista2 => (
                    <Card key={lista2.id}>
                        <CardItem style={styles.carditem}>
                            <Left>
                                <Body>
                                    <Text style={styles.texto}>{lista2.tipo}</Text>
                                    <Text style={styles.texto}>
                                    {lista2.rua},{lista2.numero}
                                    </Text>
                                    <Text style={styles.texto}>
                                    {lista2.bairro} {lista2.cidade}
                                    </Text>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>
                ))}
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
