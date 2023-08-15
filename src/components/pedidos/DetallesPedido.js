import React from 'react'

function DetallesPedido(props) {
    const {pedido: pedidoTotal} = props
    const {cliente, pedido, total, _id} = pedidoTotal
    return(
        <li className="pedido">
            <div className="info-pedido">
                <p className="id">ID: {_id}</p>
                <p className="nombre">Cliente: {cliente.nombre} {cliente.apellido}</p>

                <div className="articulos-pedido">
                    <p className="productos">Artículos Pedido: </p>
                    <ul>
                        {pedido.map(articulo => (
                            <li key={_id+Math.random()}>
                                <p>{articulo.producto?.nombre}</p>
                                <p>Precio: ${articulo.producto?.precio}</p>
                                <p>Cantidad: {articulo.cantidad}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="total">Total: ${total}</p>
            </div>
            <div className="acciones">
                <button type="button" className="btn btn-rojo btn-eliminar">
                    <i className="fas fa-times"></i>
                    Eliminar Pedido
                </button>
            </div>
        </li>
    )
}

export default DetallesPedido