import React, {Fragment, useState, useEffect} from 'react'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios'

function EditarCliente(props) {
    const navigate = useNavigate()

    const { id } = useParams()

    const[cliente, datosCliente] = useState({
        nombre:'',
        apellido:'',
        empresa:'',
        email:'',
        telefono:''
    })

    // Query a la API
    const consultarAPI = async () => {
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`)

        // colocar en el state
        datosCliente(clienteConsulta.data)
    }

    // useEffect cuando el componente carga
    useEffect( () => {
        consultarAPI()
    // eslint-disable-next-line
    },[])

    // leer los datos del formulario
    const actualizarState = e => {
        // almancenar lo que usuario escribe en el state
        datosCliente({
            ...cliente,
            [e.target.name] : e.target.value
        })
    }

    //Validar formulario
    const validarCliente = () => {
        const {nombre, apellido, email, empresa, telefono} = cliente

        // revisar que las propiedades del objeto tengan contenido
        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length

        return valido
    }

    // envia una peticion por axios para actualizar clientes
    const actualizarCliente = e => {
        e.preventDefault()
        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
            .then(res => {
                // Validar si hay errores de mongo
                if(res.data.code === 11000){
                    Swal.fire({
                        icon: 'error',
                        title:'Hubo un error',
                        text: 'Ese cliente ya esta registrado'
                    })
                } else {
                    Swal.fire(
                        'Correcto',
                        'Se actualizo correctamente',
                        'success'
                    )
                }
                // redireccionar
                navigate('/')
            })
    }


    return(
        <Fragment>
            <h2>Editar Cliente</h2>

            <form
                onSubmit={actualizarCliente}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input  type="text" 
                        placeholder="Nombre Cliente" 
                        name="nombre"
                        onChange={actualizarState}
                        value={cliente.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" 
                        placeholder="Apellido Cliente" 
                        name="apellido"
                        onChange={actualizarState}
                        value={cliente.apellido}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" 
                        placeholder="Empresa Cliente" 
                        name="empresa"
                        onChange={actualizarState}
                        value={cliente.empresa}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" 
                        placeholder="Email Cliente" 
                        name="email"
                        onChange={actualizarState}
                        value={cliente.email}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="text" 
                        placeholder="Teléfono Cliente" 
                        name="telefono"
                        onChange={actualizarState}
                        value={cliente.telefono}
                    />
                </div>

                <div className="enviar">
                    <input type="submit" 
                        className="btn btn-azul" 
                        value="Guardar Cliente"
                        disabled={validarCliente()}
                    />
                </div>

            </form>

        </Fragment>
    )
}

export default EditarCliente