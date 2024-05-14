import './App.css'
import { Provider } from 'react-redux'
//import Bottom_Navigation from './pages/dashboard/Nav';
import { store } from './stores/store';
import Login_Page from './pages/login/Login';
import { Toaster } from 'sonner';
import PersistentDrawerLeft from './pages/dashboard/PrivateRouter';
import { StyledEngineProvider } from '@mui/material/styles';

function App() {

  const isLoggedIn = !! localStorage.getItem('loginData');
  //console.log("ver actividad: ", localStorage.getItem('loginData'))
  return (
    <>
    <Provider store={store}>
    <Toaster richColors position="top-right" expand={true} offset={20} closeButton={true} visibleToasts={6}/>
      {isLoggedIn ? (<StyledEngineProvider injectFirst><PersistentDrawerLeft/></StyledEngineProvider>) : <Login_Page/>}
    </Provider>
    </>
  )
}

export default App;
