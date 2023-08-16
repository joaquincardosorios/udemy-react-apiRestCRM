import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios'
import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';
import Swal from 'sweetalert2'

function NuevoPedido(props) {
    const navigate = useNavigate()
    // extraer id cliente
    const {id} = useParams()
    
    //state
    const [cliente, setCliente] = useState({})
    const [busqueda, setBusqueda] = useState('')
    const [productos, setProductos] = useState([])
    const [total, setTotal] = useState(0)

    useEffect( () => {
        // obtener cliente
        const consultarApi = async () => {
            // consulktar cliente actual
            const resultado = await clienteAxios.get(`/clientes/${id}`)
            setCliente(resultado.data)
        }
        consultarApi()
        actualizarTotal()
    },[productos])

    const buscarProducto = async (e) => {
        e.preventDefault()

        // obtener productos de la busqueda
        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`)

        // si no hay resultado, una alerta, contrario agregarlo al state
        if(resultadoBusqueda.data[0]){
            let productoResultado = resultadoBusqueda.data[0]
            if(productos.some(producto => producto._id === resultadoBusqueda.data[0]._id)) return
            // Agregar la llave 'producto' (copia de id)
            productoResultado.producto = resultadoBusqueda.data[0]._id
            productoResultado.cantidad = 1

            // ponerlos en el state
            setProductos([...productos, productoResultado])
        } else {
            //no hay resultado
            Swal.fire({
                icon: 'error',
                title:'No resultados',
                text: 'No hay resultados'
            })
        }
    }

    // Almacenar busqueda en el state
    const leerDatosBusqueda = (e) => {
        setBusqueda(e.target.value)
    }

    // actualizar cantidad de producto
    const restarProductos = (index) => {
        const todosProductos = [...productos]

        if(todosProductos[index].cantidad === 0) return

        todosProductos[index].cantidad--

        setProductos(todosProductos)

    }

    const aumentarProductos = (index) => {
        const todosProductos = [...productos]
        todosProductos[index].cantidad++
        setProductos(todosProductos)

    }

    // eliminar producto del state
    const eliminarProducto = id => {
        const todosProductos = productos.filter(producto => producto.producto !== id)
        setProductos(todosProductos)
    }

    // actualizar total a pagar
    const actualizarTotal = () => {
        // si el arreglo de los producto es igual a 0: el total es cero
        if(productos.length === 0) {
            setTotal(0)
            return
        }

        // calcular nuevo total
        let nuevoTotal = 0;

        //recorrer todos los productos y sus cantidades y precios
        productos.map( producto => nuevoTotal += producto.cantidad * producto.precio)
        setTotal(nuevoTotal)
    }

    const enviarPedido = async(e) => {
        e.preventDefault()
        console.log(productos)

        // construir el objeto
        const pedido = {
            cliente: id,
            pedido: productos,
            total: total
        }
        

        // almacenarlos en la DB
        const resultado = await clienteAxios.post(`/pedidos`, pedido)

        // leer resultado
        if(resultado.status === 200){
            // alerta todo bien
            Swal.fire({
                icon: 'success',
                title:'Correcto',
                text: resultado.data.mensaje
            })
        } else {
            // alerta error
            Swal.fire({
                icon: 'error',
                title:'Hubo un error',
                text: 'Intenta nuevamente'
            })
        }

        navigate('/pedidos')
    }
    return(
        <>
        <h2>Nuevo Pedido</h2>

        <div className="ficha-cliente">
            <h3>Datos de Cliente</h3>
            <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
            <p>Telefono: {cliente.telefono}</p>
        </div>
        <FormBuscarProducto
            buscarProducto={buscarProducto} 
            leerDatosBusqueda={leerDatosBusqueda}
        />
        
            <ul className="resumen">
                {productos.map( (producto, index) => (
                    <FormCantidadProducto 
                        producto={producto} 
                        key={producto.producto} 
                        restarProductos={restarProductos}
                        aumentarProductos={aumentarProductos}
                        eliminarProducto={eliminarProducto}
                        index={index}
                    />
                ))}
            </ul>
            <p className='total'>Total a Pagar: <span>$ {total}</span></p>
            { total > 0 ? (
                <form
                    onSubmit={e => enviarPedido(e)}
                >
                    <input 
                        type='submit'
                        className='btn btn-verde btn-block'
                        value='Realizar Pedido'
                    ></input>
                </form>
            ) : null}
        </>
    )
}

export default NuevoPedido