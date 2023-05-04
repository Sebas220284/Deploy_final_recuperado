import React from 'react'
import { MapaUsuario } from '../components/MapaUsuario'
import { SocketProvider } from '../context/socketContext'

export const MapasUbicacion = () => {
  return (
    <SocketProvider>
  <MapaUsuario/>
    </SocketProvider>

  )
}
