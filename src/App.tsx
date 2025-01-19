import './App.css';
import { Outlet } from 'react-router-dom';
import { SnackbarProvider } from './contexts/SnackbarContext';

function App() {
  return (
    <SnackbarProvider>
      <Outlet />
    </SnackbarProvider>
  )
}

export default App
