# Main
O arquivo principal da aplicação React, aqui ficam todas as principais configurações iniciais.

Aqui nesse exemplos estamos configurando nossas rotas do react-dom, criando um objeto de rotas, onde nosso `App` é a rota inicial no path "/", e como filho dessa rota temos `Home` no path "card".

Essa configuração de rota reflete o que falamos em `App`, todos os filhos de App iram herdar elementos de interface configurados nele, porém no nosso `App` não fizemos nenhum elemento de interface como menu ou rodapés.

Aqui também temos a configuração de `<RouterProvider>` que atua criando o `SPA` ou `Single Page Application`, quando toda a aplicação é renderizada em uma página sem reloads ou carregamentos, deixando a aplicação mais flúida, todo o gerenciamento de elementos e rotas fica na responsabilidade do `react-dom`.

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
    children: [
      {
        path: "/card",
        element: <Home />,
      },
    ],
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

```