# App
Aqui temos o primeiro arquivo de interface do sistema, dentro desse arquivo configuramos tudo que queremos que aparecem em todas as páginas, como estamos usando o `Outlet` do `router-dom` as demais páginas seram renderizadas dentro dele.

Então se necessário podemos adicionar menus ou rodapés.

```tsx
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

```