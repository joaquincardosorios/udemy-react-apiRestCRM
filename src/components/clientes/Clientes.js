import React, { useEffect, useState, Fragment } from 'react'

// importar clientes axios
import clienteAxios from '../../config/axios'
import Cliente from './Cliente'
import { Link } from 'react-router-dom'


function Clientes() {

    // Trabajar con el state
    //cliente = state,  guardarCliente = funcion para guardar el state
    const [clientes, guardarClientes] = useState([])

    //query a la API
    const consultarAPI = async () => {
        const clientesConsulta = await clienteAxios.get('/clientes')

        // Colocar el resultado en el state
        guardarClientes(clientesConsulta.data)

    }

    //use effect es similar a componentsdidmount y willmount
    useEffect( () => {
        consultarAPI();
    }, [])

    return (
        <Fragment>
            <h2>Clientes</h2>

            <Link to={"/clientes/nuevo"} class="btn btn-verde nvo-cliente"> 
                <i class="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className='listado-clientes'>
                {clientes.map(cliente => (
                    <Cliente 
                        key={cliente._id}
                        cliente={cliente}
                    />
                ))}
            </ul>
        </Fragment>
    )
}

export default Clientes