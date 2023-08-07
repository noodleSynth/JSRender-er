



import './style.css'

const query = Object.fromEntries(window.location.search.replace('?', '').split("&").map(e => e.split("=")).map(([key, value]) => ([key, value])))


import { createApp } from 'vue'
import App from './App.vue'
import { Render } from './scene1/Render'

if (query.viewui !== undefined && !query.viewui) {
  Render.start()
} else {
  createApp(App).mount('#app')

}


// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000/");

// // connection
// socket.on("connect", () => {
//   console.log("Connected")
// });

// // receiving an event
// socket.on("hello", (value) => {
//   console.log(value)
// });

// socket.on("start", (value) => {
//   alert(value)
// })

// document.querySelector("#start")?.addEventListener("click", () => {
//   // Render.start()
//   socket.open()
//   console.log("Sending message")
//   socket.emit("start", "Now you fool")
//   // localStorage.Message = Math.random().toString()
//   // window.dispatchEvent(new Event('storage'))
//   // Render start loop goes here
// })
