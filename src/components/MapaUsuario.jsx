 '!react-map-gl';
import './styles/mapas.css'


import { useMapbox } from '../hooks/useMapbox'

import { useContext, useEffect } from 'react';
import { SocketContext } from '../context/socketContext';



const puntoInicial={
    lng:-91.866186,
    lat:16.381093,
    zoom:10
}
export const MapaUsuario = () => {
   const {coords,setRef,nuevoMarcador$,nuevaUbicacion$,movimientoMarcador$,movimientoUbi$,agregarMarcador,actualizarPosision}=useMapbox(puntoInicial)
const {socket}=useContext(SocketContext)


//escuchar marcasdores
useEffect(()=>{
socket.on('marcadores-activos',marcadores=>{
  for (const key of Object.keys(marcadores)){
    agregarMarcador(marcadores[key],key)
  }
 
})
},[socket,agregarMarcador])

   useEffect(()=>{
    nuevaUbicacion$.subscribe(ubi=>{
     
    })
    },[nuevaUbicacion$])

    useEffect(()=>{
        movimientoUbi$.subscribe(ubi=>{
         console.log(ubi)
        })
        },[movimientoUbi$])

useEffect(()=>{
    movimientoMarcador$.subscribe(mar=>{
    socket.emit('marcador-actualizado',mar)
    })
    },[movimientoMarcador$,socket])

useEffect(()=>{
nuevoMarcador$.subscribe(marcador=>{
    socket.emit('marcador-nuevo',marcador)
})
},[nuevoMarcador$,socket])

useEffect(()=>{
  socket.on('marcador-actualizado',(marcador)=>{
    actualizarPosision(marcador)


  })
},[socket,actualizarPosision])

useEffect(()=>{
  socket.on('marcador-nuevo',(marcador)=>{
   agregarMarcador(marcador,marcador.id)
  })
},[socket,agregarMarcador])

  return (
    <>
    <div className='info'>lgn:{coords.lng} | lan:{coords.lat} | zoom:{coords.zoom} </div>
   <div ref={setRef} className='mapContainer'>


</div>

    </>
  )
}
