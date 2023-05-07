import React, { useEffect, useState } from 'react'
import {io}from 'socket.io-client'



const socket=io('http://localhost:4000')
function SoporteUsuarios() {
    const[isConnected,setIsConnected]=useState(false)
    const [nuevoMsj,setNuevoMsj]=useState('')
    const [msj,setMsj]=useState([])
    useEffect(()=>{
socket.on('connect',()=>setIsConnected(true))
socket.on('chat_msj',(data)=>{
    console.log(data)
    setMsj(msj=>[...msj,data])


})
return()=>{
    socket.off('connect')
    socket.off('chat_msj')
}



    },[])

const enviarMsj=()=>{

socket.emit('chat_msj',{
    usuario:socket.id,
    mensaje:nuevoMsj
})

}



  return (
    <>
<h1>{isConnected ? 'conectado':'no conectado'}</h1>



<ul>
    {msj.map(msj=>(
 <li>
{ msj.usuario} : {msj.mensaje}
</li>
    ))}
   
</ul>
<input type="text" onChange={e=>setNuevoMsj(e.target.value)}/>
<button onClick={enviarMsj}>Enviar</button>
    </>
  )
}

export default SoporteUsuarios
