import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import next from "next";
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = createServer(server);

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.emit("connected");
    socket.on("updateOrder", (data) => {
      try {
        console.log("line 27 :-tableId is", data);
        socket.broadcast.emit("updateOrder", data);
      } catch (err) {
        console.error("Error handling addOrder:", err);
      }
    });
    socket.on("clearOrders", () => {
      try {
        socket.broadcast.emit("clearOrders");
      } catch (err) {
        console.error("Error handling addOrder:", err);
      }
    });

    socket.on("productCompleted", (data) => {
      try {
        socket.broadcast.emit("productCompleted", data);
      } catch (error) {
        console.log("Error providing notification", error);
      }
    });
    socket.on("deleteNotification", (data) => {
      try {
        socket.broadcast.emit("deleteNotification", data);
      } catch (error) {
        console.log("Error deleting notification", error);
      }
    });
    socket.on("occupyTable", () => {
      try {
        socket.broadcast.emit("occupyTable");
      } catch (error) {
        console.log("Error switching to occupied", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(3001, () => {
    console.log("> Ready on http://localhost:3001");
  });
});
