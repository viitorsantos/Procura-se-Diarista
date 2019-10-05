import React from 'react';
import { View, Button, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import axios from 'axios';


export default class CadastroEnderecos extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            tipo:'',
            cep:'',
            endereco:'',
            numero:'',
            bairro:'',
            cidade:'',
            uf:'',
        }
    }

    alteraCampo(campos, value){
        this.setState({
            [campos]:value
        });
    }

    endereco(){
        console.log(this.state);
    }
    
    render(){
        return(
            <ScrollView>
                <View style={styles.form}>
                    <TextInput style={styles.input1} 
                        placeholder="Tipo"
                        value={this.state.tipo}
                        onChangeText={value => this.alteraCampo('tipo',value)}
                        />
                    <TextInput style={styles.input}
                        placeholder="CEP"
                        value={this.state.cep}
                        onChangeText={value => this.alteraCampo('cep',value)}
                        />
                    <TextInput style={styles.input} 
                        placeholder="Endereço"
                        value={this.state.endereco}
                        onChangeText={value => this.alteraCampo('endereco',value)}
                        />
                    <TextInput style={styles.input}
                        placeholder="Número"
                        value={this.state.numero}
                        onChangeText={value => this.alteraCampo('numero',value)}
                        />
                    <TextInput style={styles.input}
                        placeholder="Bairro"
                        value={this.state.bairro}
                        onChangeText={value => this.alteraCampo('bairro',value)}
                        />
                    <TextInput style={styles.input}
                        placeholder="Cidade"
                        value={this.state.cidade}
                        onChangeText={value => this.alteraCampo('cidade',value)}
                        />
                    <TextInput style={styles.input}
                        placeholder="UF"
                        value={this.state.uf}
                        onChangeText={value => this.alteraCampo('uf',value)}
                        />
                </View>
                <View style={styles.botao}>
                    <Button title="Cadastrar" color="#00BFFF"  onPress={()=>this.endereco()}/>
                </View>
            </ScrollView>
        )
    }
    
}

const styles = StyleSheet.create({
    form:{
        paddingLeft:30,
        paddingRight:30,
    },
    input1:{
        height:50,
        borderBottomWidth:2,
        borderBottomColor:'#7B68EE',
        marginTop:40,
    },
    input:{
        height:50,
        borderBottomWidth:2,
        borderBottomColor:'#7B68EE',
        marginTop:10,
    },
    botao: {
        marginTop:15,
        paddingLeft:30,
        paddingRight:30,
    },
});
