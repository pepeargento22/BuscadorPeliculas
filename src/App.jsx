import './App.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Peliculas } from './componentes/Peliculas.jsx'
import { usePelis } from './hooks/usePelis.js'
import debounce from 'just-debounce-it'

export function App() {

    // useRef() es un hook que te permite guardar una referencia mutable que persiste en el ciclo de vida del componente
    // es decir que al cambiar su valor, no se vuelve a renderizar el componente como pasa con useState()
    const inputRef = useRef()
    const {peliculas: lista_peliculas, obtenerPelis } = usePelis(inputRef) //con este custom hook extraemos data del valor del input y obtenemos un listado de peliculas
    
    const [error, setError] = useState(null)

    // useCallback(funcion ,[]) es un hook que al renderizar te vuelve a ejecutar la funcion que le pongas solo si cambian las dependencias que indiques.
    // en esencia, useCallback() es una version especifica del useMemo() y en este caso nos permite que el debouncePelis no se reinicie con cada renderizacion
    
    // debounce(funcion, tiempo) es una funcion que solo ejecuta la funcion dentro pasado el tiempo indicado y si se ejecuta la funcion 
    // devuelta antes de que pase el tiempo, se reinicia el temporizador con lo cual logras que se ejecute solo en la ultima llamada 
    const debouncePelis = useCallback(debounce(() => {
        obtenerPelis()
    }, 500),[])

    const manejarSubmit = (e) => {
        e.preventDefault()
        obtenerPelis()
        const valor_directo = inputRef.current.value
        const valor = valor_directo.replace(/\s/g, "")
        // VALIDACIONES
        if (valor.length < 3) {
            setError('Ingresar un título de al menos 3 caracteres')
            return
        }
        if (valor.match(/\W/)) {
            setError('Ingrese un título sin símbolos')
            return
        }
        setError(null)
    }

    const manejarCambio = (e) => {
        debouncePelis() // la funcion se ejecuta cuando la persona termina de escribir el titulo de la peli
    }

    return (
        <>
            <header>
                <h1>Buscador de Pelis</h1>
                <form className='form' onSubmit={manejarSubmit}>
                    <label htmlFor="buscador">Ingrese el titulo: </label>
                    <input ref={inputRef} // de esta forma obtenemos la referencia de este elemento input
                        onChange={manejarCambio}
                        id='buscador'
                        name='buscador' 
                        type="text" 
                        placeholder='Shrek, Titanic, The Matrix...'
                        maxLength={40}
                    />
                    <button>Buscar</button>
                    <div className='error-formulario'>{error}</div>
                </form>
            </header>

            <main>
                <div className='resultado-busqueda'>
                    <Peliculas lista_peliculas = { lista_peliculas }/>
                </div>
            </main>
        </>
    )
}