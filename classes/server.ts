
import express from 'express';
import { SERVER_PORT } from '../globals/environment';
import { Server, Socket }  from 'socket.io';
import { createServer } from "http";
//import socketIO  from 'socket.io';
//import http from 'http';
import * as socket from '../sockets/socket';


export default class ServerApp {
    public app: express.Application;
    public port: number = 3000;
    public io: Server;
    private httpServer: any;
    private static _instance: ServerApp;


    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer=createServer(this.app);
        // this.io = new socketIO.Server( this.httpServer );
        this.io =  new Server(this.httpServer, {  cors: {
            origin: "http://localhost:4200",
            credentials: true
          } });
        this.escucharSockets();
       
    }
    public static get instance(): ServerApp{
        return this._instance || (this._instance = new this())
      }  
    
    start( callback: VoidFunction ) {

        this.app.listen( this.port, callback );

    }

    private escucharSockets() {
        console.log('escuchando conexiones sockets...');
        
        this.io.on('connection', (cliente: Socket) =>{
            console.log('Client Connected');
            // Mensajes
            socket.mensaje( cliente, this.io );

            // Desconectar
            socket.desconectar( cliente );
          });
    }
    public init(callback: any ): void {
        this.httpServer.listen(this.port, callback);
      }
     
}