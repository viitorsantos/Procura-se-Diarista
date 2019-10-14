import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import CadastroEnderecos from './pages/CadastroEnderecos';
import Principal from './pages/Principal';
import Perfil from './pages/Perfil';
import SolicitaLimpeza from './pages/SolicitaLimpeza';
import ConfirmaCasa from './pages/ConfirmaCasa';
import ConfirmaLimpeza from './pages/ConfirmaLimpeza';
import LimpezaConfirmada from './pages/LimpezaConfirmada';

const Routes = createAppContainer(
    createSwitchNavigator({
        Home,
        Login,
        Cadastro,
        CadastroEnderecos,
        Principal,
        Perfil,
        SolicitaLimpeza,
        ConfirmaCasa,
        ConfirmaLimpeza,
        LimpezaConfirmada
    })
)

export default Routes;