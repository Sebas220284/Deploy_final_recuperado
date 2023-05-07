

/* eslint import/no-webpack-loader-syntax: off  */
import React, { useState, useEffect } from 'react';
//@ts-ignore
import mapboxgl from '!mapbox-gl';
import axios from 'axios';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2ViYXMyMjAyODQiLCJhIjoiY2xleG1temljMG8weDN3bXpjaTBjMnhxbyJ9.hlnZIM_0ujgLb1CHLejxrw';

function MapaConductor() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initializeMap = () => {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-58.381592, -34.603722], // Centro en Buenos Aires, Argentina
        zoom: 12
      });

      setMap(map);

      // Obtiene la ubicación del dispositivo y la muestra en el mapa
      navigator.geolocation.watchPosition(function(position) {
        const lngLat = [position.coords.longitude, position.coords.latitude];

        // Crea una marca en la ubicación del dispositivo
        const marker = new mapboxgl.Marker()
          .setLngLat(lngLat)
          .addTo(map);

        // Centra el mapa en la ubicación del dispositivo
        map.setCenter(lngLat);

        // Envía la ubicación del dispositivo al servidor
        axios.post("https://TU-URL-DE-API/ubicacion", {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }).then(response => {
          console.log(response.data);
        }).catch(error => {
          console.error(error);
        });
      });
    };

    if (!map) {
      initializeMap();
    }
  }, [map]);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
}

export default MapaConductor;
