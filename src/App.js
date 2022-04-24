import { useSelector } from 'react-redux';
import './App.css';
import Modal from './components/UI/Modal';
import AuthScreen from './screens/AuthScreen';
import MainScreen from './screens/MainScreen';

function App() {
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const modal = useSelector(state => state.modal);

  return (
    <>
      {modal.show && <Modal />}
      { !isAuthenticated && <AuthScreen />}
      { isAuthenticated && <MainScreen />}
    </>
  );
}

export default App;
