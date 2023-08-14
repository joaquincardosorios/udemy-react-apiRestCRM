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
        // eslint-disable-next-line 
    },[])

    // edita un producto en la base de datos
    const editarProducto = async e => {
        e.preventDefault()
        console.log(producto.nombre)
        console.log(producto.precio)

        // crear un formdata
        const formData = new FormData()
        formData.append('nombre', producto.nombre)
        formData.append('precio', producto.precio)
        formData.append('imagen', archivo)

        console.log(id)

        try {
            const res = await clienteAxios.put(`/productos/${id}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            console.log(res)
            if (res.status === 200){
                Swal.fire(
                    'Se actualizó Correctamente',
                    res.data.mensaje,
                    'success'
                )
            }
            // redireccionar
            navigate('/productos')
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title:'Hubo un error',
                text: 'Vuelve a intentarlo'
            })
        }
    }

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

    if(!nombre) return <Spinner />
    return (
        <Fragment>
            <h2>Editar Producto</h2>
            <form 
                onSubmit={editarProducto}
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
                        <img src={`http://192.168.1.114:10001/${imagen}`} alt="imagen" width="300"/>
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
                        value="Editar Producto" 
                    />
                </div>
            </form>

        </Fragment>
    )
}

export default EditarProducto