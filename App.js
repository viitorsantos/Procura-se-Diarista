import React from 'react';
import Routes from './src/routes';

export default function App(){
  return <Routes/>
}

/*import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import CadastroEnderecos from './pages/CadastroEnderecos';
import ClientePrincipal from './pages/ClientePrincipal';
import PerfilCliente from './page s/PerfilCliente';
import PerfilDiarista from './pages/PerfilDiarista';
import SolicitaLimpeza from './pages/SolicitaLimpeza';
import ConfirmaLimpeza from './pages/ConfirmaLimpeza';
import DiaristaPrincipal from './pages/DiaristaPrincipal';
import ConfirmacaoLimpeza from './pages/ConfirmacaoLimpeza';
import LimpezaConfirmada from './pages/LimpezaConfirmada';
import { createAppContainer, createStackNavigator} from 'react-navigation'; 

const AppNavigator = createStackNavigator({
    'Main' : {
        screen : Home
    },
    'Login' : {
      screen : Login,
      navigationOptions:({navigation})=>{
        return({
            title:'Login',
            headerTitleStyle:{
              color:'white',
            },
        });
      }
    },
    'Cadastro' : {
      screen : Cadastro,
      navigationOptions:({navigation})=>{
        return({
            title:'Crie sua Conta',
            headerTitleStyle:{
              color:'white',
            }
        });
      }
    },
    'CadastroEnderecos' : {
      screen : CadastroEnderecos,
      navigationOptions:({navigation})=>{
        return({
            title:'Adicionar Endereços',
            headerTitleStyle:{
              color:'white',
            }
        });
      }
    },
    'Entrar' : {
      screen : ClientePrincipal,
      navigationOptions:({navigation})=>{
        return({
            header: null,
        });
      }
    },
    'PerfilCliente' : {
      screen : PerfilCliente,
      navigationOptions:({navigation})=>{
        return({
            title:'Perfil',
            headerTitleStyle:{
              color:'white',
            }
        });
      }
    },
    'PerfilDiarista' : {
      screen : PerfilDiarista,
      navigationOptions:({navigation})=>{
        return({
            title:'Perfil',
            headerTitleStyle:{
              color:'white',
            }
        });
      }
    },
    'SolicitaLimpeza' : {
      screen : SolicitaLimpeza,
      navigationOptions:({navigation})=>{
        return({
            title:'Escolha a Diarista',
            headerTitleStyle:{
              color:'white',
            }
        });
      }
    },
    'ConfirmaLimpeza' : {
      screen : ConfirmaLimpeza,
      navigationOptions:({navigation})=>{
        return({
            title:'Solicitar Diária',
            headerTitleStyle:{
              color:'white',
            }
        });
      }
    },
    'DiaristaPrincipal' : {
      screen : DiaristaPrincipal,
      navigationOptions:({navigation})=>{
        return({
            header: null,
        });
      }
    },
    'ConfirmacaoLimpeza' : {
      screen : ConfirmacaoLimpeza,
      navigationOptions:({navigation})=>{
        return({
            title:'Confirmar Diária',
            headerTitleStyle:{
              color:'white',
            }
        });
      }
    },
    'LimpezaConfirmada' : {
      screen : LimpezaConfirmada,
      navigationOptions:({navigation})=>{
        return({
            header: null,
        });
      }
    },
},
{
  defaultNavigationOptions:{
    title:'Procura-se Diarista',
    headerTintColor:'white',
    headerStyle:{
        backgroundColor:'#00BFFF',
        borderBottom:1,
        borderBottomColor:'#707070',
    },
    headerTitleStyle:{
        color:'white',
        fontSize: 20,
        flexGrow:1,
        textAlign:'center',
    }

  }
});

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;*/