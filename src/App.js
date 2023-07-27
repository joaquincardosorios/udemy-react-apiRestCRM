import React, {Fragment} from 'react'

// Layout
import Header from './components/layout/Header';
import Navegacion from './components/layout/Navegacion';


function App() {
  return (
    <Fragment>
      <Header />
      <div class="grid contenedor contenido-principal">
        <Navegacion />
        <main class="caja-contenido col-9">
          {/* TODO : Routing a los diferentes Componentes */}
        </main>
      </div>
    </Fragment>
  )
}
export default App;
