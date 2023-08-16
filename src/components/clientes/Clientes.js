import React, { useEffect, useState, Fragment, useContext } from 'react'

// importar clientes axios
import clienteAxios from '../../config/axios'
import Cliente from './Cliente'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../layout/Spinner'

import { CRMContext } from '../../context/CRMContext'

function Clientes() {
    const navigate = useNavigate()
    // Trabajar con el state
    //cliente = state,  guardarCliente = funcion para guardar el state
    const [clientes, guardarClientes] = useState([])

    const [auth, setAuth] = useContext(CRMContext)
    console.log(auth)
    //query a la API
    
    //use effect es similar a componentsdidmount y willmount
    useEffect( () => {
        if(auth.token !== ''){
            const consultarAPI = async () => {
                try {
                    const clientesConsulta = await clienteAxios.get('/clientes',{
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    })
                    // Colocar el resultado en el state
                    guardarClientes(clientesConsulta.data)
                    
                } catch (error) {
                    if(error.response.status === 500){
                        navigate('/iniciar-sesion')
                    }
                }
            }
            consultarAPI();
        } else {
            navigate('/iniciar-sesion')
        }
    }, [])

    if(!auth.auth){
        navigate('/iniciar-sesion')
    }

    // spinner de carga
    if(!clientes.length) return <Spinner />

    return (
        <Fragment>
            <h2>Clientes</h2>

            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
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