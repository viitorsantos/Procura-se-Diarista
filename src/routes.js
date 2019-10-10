import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import CadastroEnderecos from './pages/CadastroEnderecos';
import Principal from './pages/Principal';
import Perfil from './pages/Perfil';
import PerfilDiarista from './pages/PerfilDiarista';
import SolicitaLimpeza from './pages/SolicitaLimpeza';
import ConfirmaLimpeza from './pages/ConfirmaLimpeza';
import DiaristaPrincipal from './pages/DiaristaPrincipal';
import ConfirmacaoLimpeza from './pages/ConfirmacaoLimpeza';
import LimpezaConfirmada from './pages/LimpezaConfirmada';

const Routes = createAppContainer(
    createSwitchNavigator({
        Home,
        Login,
        Cadastro,
        CadastroEnderecos,
        Principal,
        Perfil,
        PerfilDiarista,
        SolicitaLimpeza,
        ConfirmaLimpeza,
        DiaristaPrincipal,
        ConfirmacaoLimpeza,
        LimpezaConfirmada
    })
)

export default Routes;