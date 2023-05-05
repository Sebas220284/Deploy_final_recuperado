import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1Ijoic2ViYXMyMjAyODQiLCJhIjoiY2xleG1temljMG8weDN3bXpjaTBjMnhxbyJ9.hlnZIM_0ujgLb1CHLejxrw";

function Mapa({ ubicaciones }) {
  const mapRef = useRef(null);

  useEffect(() => {
    // Crea el mapa y lo agrega al contenedor
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.5, 40], // Establece el centro del mapa en Nueva York
      zoom: 9,
    });

    // Agrega los marcadores de ubicaciones al mapa
    ubicaciones.forEach((ubicacion) => {
      const marker = new mapboxgl.Marker().setLngLat([ubicacion.longitud, ubicacion.latitud]).addTo(map);
    });

    return () => {
      // Limpia el mapa cuando el componente se desmonta
      map.remove();
    };
  }, [ubicaciones]);

  return <div ref={mapRef} style={{ height: "500px" }} />;
}

export default Mapa;
