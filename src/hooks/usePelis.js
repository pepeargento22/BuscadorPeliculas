// creo 2 archivos json a partir de resultados de busqueda de la API para usarlos mientras codeo la logica sin necesidad de hacer ningun fetch()
import busquedaPositiva from '../tests/busqueda-positiva.json'
import busquedaNegativa from '../tests/busqueda-negativa.json'
import { useRef, useState } from 'react'

export function usePelis(inputRef) {

    const [busquedaPelis, setBusquedaPelis] = useState([])
    const busquedaAnterior = useRef({}) // utilizo useRef() para que no me haga la misma busqueda 2 veces guardando el input anterior
    
    const peliculas_API = busquedaPelis.Search
    const lista_peliculas = peliculas_API?.map(pelicula => ({ // el '?' hace que no haga el .map() si peliculas_API es null
        id : pelicula.imdbID,
        titulo : pelicula.Title,
        año : pelicula.Year,
        poster: pelicula.Poster
    }))
    
    const obtenerPelis = () => {
        const valor_busqueda = inputRef.current.value
        if (busquedaAnterior.current.value == valor_busqueda) return (console.log('busqueda repetida'))
        busquedaAnterior.current.value = valor_busqueda
        if (valor_busqueda.length > 0) {
            // si el fetch no funciona como debe, fijate en las Dev Tools -> Network -> Fetch/XHR para ver los Headers y la Response
            // asi podes fijarte si el problema esta en el fetch() o en otra parte de tu codigo
            fetch(`http://www.omdbapi.com/?apikey=b563b023&s=${valor_busqueda}&type=movie`)
            .then(response => response.json())
            .then(array_pelis => {
                setBusquedaPelis(array_pelis)
            })
        } else {
            setBusquedaPelis(busquedaNegativa)
        }
    }
    
    return (
        { peliculas: lista_peliculas, obtenerPelis } //del custom hook extraemos la lista de pelis y la funcion que tira las pelis de la busqueda
    )
}