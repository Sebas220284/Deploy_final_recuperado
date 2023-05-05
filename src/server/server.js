const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 5000;
// Configura Socket.io
io.on("connection", (socket) => {
  console.log("Un nuevo cliente se ha conectado");

  // Maneja el evento 'nueva ubicación' del cliente
  socket.on("nueva ubicación", (data) => {
    console.log(`Nueva ubicación recibida: ${JSON.stringify(data)}`);

    // Envía la nueva ubicación a todos los clientes
    io.emit("nueva ubicación", data);
  });
});

// Inicia el servidor
//const PORT = process.env.PORT || 3000;
server.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`));
