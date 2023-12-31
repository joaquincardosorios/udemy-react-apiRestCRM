import React, {Fragment, useState} from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios'

function NuevoCliente() {
    const navigate = useNavigate()
    const[cliente, guardarCliente] = useState({
        nombre:'',
        apellido:'',
        empresa:'',
        email:'',
        telefono:''
    })

    // leer los datos del formulario
    const actualizarState = e => {
        // almancenar lo que usuario escribe en el state
        guardarCliente({
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

    // Añade en la rest API un cliente nuevo
    const agregarCliente = e => {
        e.preventDefault()

        // enviar peticion a axios
        clienteAxios.post('/clientes', cliente)
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
                        'Se agregó el cliente',
                        res.data.mensaje,
                        'success'
                    )
                }
                // redireccionar
                navigate('/')
            })
    }
    return(
        <Fragment>
            <h2>Nuevo Cliente</h2>

            <form
                onSubmit={agregarCliente}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input  type="text" 
                        placeholder="Nombre Cliente" 
                        name="nombre"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" 
                        placeholder="Apellido Cliente" 
                        name="apellido"
                        onChange={actualizarState}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" 
                        placeholder="Empresa Cliente" 
                        name="empresa"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" 
                        placeholder="Email Cliente" 
                        name="email"
                        onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="text" 
                        placeholder="Teléfono Cliente" 
                        name="telefono"
                        onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                    <input type="submit" 
                        class="btn btn-azul" 
                        value="Agregar Cliente"
                        disabled={validarCliente()}
                    />
                </div>

            </form>

        </Fragment>
    )
}

export default NuevoCliente