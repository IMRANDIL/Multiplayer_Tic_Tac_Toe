import {SocketControllers} from 'socket-controllers'
import { Server } from "socket.io";
import Container from 'typedi';

export default (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  new SocketControllers({
    port: 9001,
    container: Container,
    controllers: [__dirname + "/api/controllers/*.ts"],
    io: io
  });

  return io;
};
