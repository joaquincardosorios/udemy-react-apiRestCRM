import React, {useState, useEffect, Fragment} from 'react'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios'
import Spinner from '../layout/Spinner'

function EditarProducto() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [producto, guardarProducto] = useState({
        nombre:'',
        precio:'',
        imagen:''
    })

    // archivo = state, guardarArchivo = setSate
    const [archivo, guardarArchivo] = useState('')
    
    // cuando el componente carga
    useEffect(() => {
        
        // consultar la API para traer el producto a editar
        const consultarAPI = async () => {
            const productoConsulta = await clienteAxios.get(`/productos/${id}`)
            guardarProducto(productoConsulta.data)
        }

        consultarAPI()
    },[])

    // leer los datos del formulario
    const leerInformacionProducto = e => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    //coloca la imagen en el state 
    const leerArchivo = e => {
        guardarArchivo ( e.target.files[0])
    }

    // extaer los valores del state
    const { nombre ,precio, imagen } = producto
    console.log(producto)

    if(!nombre) return <Spinner />
    return (
        <Fragment>
            <h2>Editar Producto</h2>
            <form 
 
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Producto" 
                        name="nombre"  
                        onChange={leerInformacionProducto}
                        defaultValue={nombre}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input 
                        type="number"  
                        name="precio" min="0.00" 
                        step="10" 
                        placeholder="Precio" 
                        onChange={leerInformacionProducto}
                        defaultValue={precio}
                    />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    { imagen ? (
                        <img src={`http://localhost:5000/${imagen}`} alt="imagen" width="300"/>
                    ) : null}
                    <input 
                        type="file"  
                        name="imagen"
                        onChange={leerArchivo} 
                        
                    />
                </div>

                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Agregar Producto" 
                    />
                </div>
            </form>

        </Fragment>
    )
}

export default EditarProducto