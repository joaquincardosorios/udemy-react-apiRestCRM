import React, {Fragment} from 'react'

// Routing
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Layout
import Header from './components/layout/Header';
import Navegacion from './components/layout/Navegacion';

// Componentes
import Clientes from './components/clientes/Clientes';
import Productos from './components/productos/Productos';
import Pedidos from './components/pedidos/Pedidos';


function App() {
  return (
  <BrowserRouter>
    <Fragment>
        <Header />
        <div class="grid contenedor contenido-principal">
          <Navegacion />
          <main class="caja-contenido col-9">
            <Routes>
              <Route path="/" element={<Clientes/>}/>
              <Route path="/productos" element={<Productos/>}/>
              <Route path="/pedidos" element={<Pedidos/>}/>
            </Routes>
          </main>
        </div>
      </Fragment>
  </BrowserRouter>
  )
}
export default App;
