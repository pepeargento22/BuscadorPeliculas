import "./Peliculas.css"

function PelisConResultado({ lista_peliculas }) {
    return (
        <ul>
            {
                lista_peliculas.map(peli => (
                    <li key={peli.id}>
                        <div className='contenedor-titulo'>
                        <h3>{peli.titulo}</h3>
                        </div>
                        <p>{peli.año}</p>
                        <img src={peli.poster} alt={peli.titulo} />
                    </li>
                    
                ))
            }
        </ul>
    )
}

function PelisSinResultado() {
    return (
        <p>No se encontró una pelicula con ese título</p>
    )
}

export function Peliculas({ lista_peliculas }) {
    const hayPeliculas = lista_peliculas?.length > 0 // el '?' no te evalua el .length si lista_peliculas es null

        

    return (
        hayPeliculas ? 
            <PelisConResultado lista_peliculas = { lista_peliculas } /> 
            : <PelisSinResultado /> 
    )
}

export default Peliculas