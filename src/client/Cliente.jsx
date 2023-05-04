import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Mapa from "./Mapa";

const socket = io("http://localhost:8080");

 export function Cliente() {
  const [ubicaciones, setUbicaciones] = useState([]);

  useEffect(() => {
    // Maneja el evento 'nueva ubicación' del servidor
    socket.on("nueva ubicación", (data) => {
      setUbicaciones((ubicacionesAnteriores) => [...ubicacionesAnteriores, data]);
    });

    // Limpia la suscripción cuando el componente se desmonta
    return () => {
      socket.off("nueva ubicación");
    };
  }, []);

  return (
    <div className="App">
      <Mapa></Mapa>
      </div>
  )}
