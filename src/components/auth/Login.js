import React, {useContext, useState} from 'react'
import Swal from 'sweetalert2'
import clienteAxios from '../../config/axios'
import { useNavigate } from 'react-router-dom'

import { CRMContext } from '../../context/CRMContext'

function Login(){
    const [auth, setAuth] = useContext(CRMContext)

    const navigate = useNavigate()
    const [credenciales, setCredenciales] = useState({
        email:'',
        password:''
    })

    const leerDatos = (e) => {
        setCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        })
    }

    const iniciarSesion = async (e) =>{
        e.preventDefault()

        // autenticar usuario
        try {
            const respuesta = await clienteAxios.post('login', credenciales)
            
            // extraer token y ponerlo en localstorage
            const { token } = respuesta.data
            localStorage.setItem('token', token)

            //colocarlo en el state
            setAuth({
                token,
                auth:true
            })

            Swal.fire(
                'Login Correcto',
                'Has iniciado Sesion',
                'success'
            )
            navigate('/')
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: error.response.data.mensaje,
            })
        }
    }

    return(
        <div className='login'>
            <h2>Iniciar Sesion</h2>
            <div className="contenedor-formulario">
                <form
                    onSubmit={iniciarSesion}
                >
                    <div className="campo">
                        <label htmlFor="">Email</label>
                        <input 
                            type="email" 
                            name='email'
                            placeholder='Email para iniciar sesion'
                            required
                            onChange={leerDatos}
                        />
                    </div>
                    <div className="campo">
                        <label htmlFor="">Password</label>
                        <input 
                            type="password" 
                            name='password'
                            placeholder='Password'
                            required
                            onChange={leerDatos}
                        />
                    </div>
                    <input type="submit" value='Iniciar Sesion' className='btn btn-verde btn-block' />
                </form>
            </div>
        </div>
    )
}

export default Login