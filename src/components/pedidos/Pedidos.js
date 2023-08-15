import React, {useEffect, useState} from 'react'
import clienteAxios from '../../config/axios'
import DetallesPedido from './DetallesPedido'



function Pedidos() {

    const [pedidos, setPedidos] = useState([])

    useEffect( () => {
        const consultarAPI = async () => {
            const resultado = await clienteAxios.get('/pedidos')
            setPedidos(resultado.data)
        }
        consultarAPI()
    }, [])
    return (
        <>
            <h2>Pedidos</h2>
            <ul className="listado-pedidos">
                {pedidos.map( pedido => (
                    <DetallesPedido
                        key={pedido._id}
                        pedido={pedido}
                    />
                ))}
            </ul>

        </>
    )
}

export default Pedidos