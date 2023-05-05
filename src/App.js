import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

import { AuthProvider } from "./context/authContext";
import Mapas from "./pages/Mapas";
import { ProtectedRoute } from "./components/ProtectedRoute";
import MapaConductor from "./components/MapaConductor";
import Location from "./components/MapaConductor";

import { Cliente } from "./client/Cliente";
import { MapasUbicacion } from "./pages/MapasUbicacion";


function App() {
  
  return (
    <div>
      {" "}
      {/* aqui este div tengo quye poner estilos para las rutas*/}
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
    
<Route path="/mapbox" element={<MapasUbicacion/>}/>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="/mapaV"
            element={
              <ProtectedRoute>
                <MapasUbicacion />
           
              </ProtectedRoute>
            }
          />
           
            <Route
            path="mapaV"
            element={
              <ProtectedRoute>
      <Location/>
           
              </ProtectedRoute>
            }
          />
        
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
