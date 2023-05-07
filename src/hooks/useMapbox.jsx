/* eslint import/no-webpack-loader-syntax: off  */

import { useCallback, useEffect, useRef, useState } from 'react'
//@ts-ignore

import mapboxgl from '!mapbox-gl'
import { v4 } from 'uuid'
import { Subject } from 'rxjs'

mapboxgl.accessToken = 'pk.eyJ1Ijoic2ViYXMyMjAyODQiLCJhIjoiY2xleG1temljMG8weDN3bXpjaTBjMnhxbyJ9.hlnZIM_0ujgLb1CHLejxrw'

export const useMapbox = (puntoInicial) => {
  const mapaDiv = useRef()
  const setRef = useCallback((node) => {
    mapaDiv.current = node
  }, [])

  const mapa = useRef()
  const marcadores=useRef({})
  const movimientoUbi=useRef(new Subject())
  const nuevaUbicacion=useRef(new Subject())
const movimientoMarcador=useRef(new Subject())
const nuevoMarcador=useRef(new Subject())


  const [coords, setCoords] = useState(puntoInicial)

  const  agregarMarcador=useCallback((e,id)=>{

    const { lng, lat } = e.lngLat || e
    const marker = new mapboxgl.Marker()
    marker.id =id ?? v4()


    marker.setLngLat([lng, lat]).addTo(mapa.current).setDraggable(true)
    marcadores.current[marker.id]=marker

if(!id ){
  nuevoMarcador.current.next({
    id:marker.id,
    lng,
    lat
   
})
}


    //escuchar movimientos del marcador
    marker.on('drag',({target})=>{
const{id}=target
const {lng,lat}= target.getLngLat()


//emitir los cambios del marcador
movimientoMarcador.current.next({id,lng,lat})
    })
  },[])
  

const actualizarCoordenadas = useCallback(
    ({ longitude, latitude }) => {
      const marker = new mapboxgl.Marker();
      marker.id = v4();
      marker.setLngLat([longitude, latitude]).addTo(mapa.current);

      setCoords({
        lng: longitude.toFixed(4),
        lat: latitude.toFixed(4),
        zoom: 10,
      });

      mapa.current.flyTo({
        center: [longitude, latitude],
        zoom: 15,
        speed: 0.5,
        essential: true,
      });

      marcadores.current[marker.id] = marker;
      marker.on('drag',({target})=>{
        const{id}=target
        const {lng,lat}= target.getLngLat()
        console.log(lng,lat)
        movimientoMarcador.current.next({id,lng,lat})
        
        //emitir los cambios del marcador
        
            })
      
    },
    [mapa, marcadores],
  );

const actualizarPosision=useCallback(({id,lng,lat})=>{

marcadores.current[id].setLngLat([lng,lat])

},[])


useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        actualizarCoordenadas({ latitude, longitude });
      });
    }, 2000);





    return () => clearTimeout(timeoutId);
  }, [actualizarCoordenadas]);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapaDiv.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [puntoInicial.lng, puntoInicial.lat],
      zoom: puntoInicial.zoom
    })

    mapa.current = map

    return () => map.remove()
  }, [puntoInicial])

  useEffect(() => {
    mapa.current?.on('move', () => {
      const { lng, lat } = mapa.current.getCenter()
      setCoords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: mapa.current.getZoom().toFixed(2)
      })
    })
  }, [])

  useEffect(() => {
    mapa.current?.on('click', agregarMarcador ) 
   
  }, [agregarMarcador])

  return {
    agregarMarcador,
    actualizarCoordenadas,
    coords,
    marcadores,
    nuevoMarcador$:nuevoMarcador.current,
    nuevaUbicacion$:nuevaUbicacion.current,
    movimientoMarcador$:movimientoMarcador.current,
    movimientoUbi$:movimientoUbi.current,
    actualizarPosision,
    setRef
  }
}
