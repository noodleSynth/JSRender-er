import { serve } from "https://deno.land/std@0.150.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.1.1/mod.ts";

const io = new Server({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
  }
});

io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);

  socket.on("testing", () => {
    console.log("Testing resieved");
  })

  socket.on("update_control", (message) => {
    console.log(socket.id, message);
    io.emit('update_control', message)
  })


  socket.on("disconnect", (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
  });

});


await serve(io.handler(), {
  port: 3000,

});

