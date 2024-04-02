import bodyParser from 'body-parser';
import ServerApp from './classes/server';
import cors from 'cors';
 
 
const server = ServerApp.instance;
server.app.use(cors())
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());
 
 
server.init(()=>{
    console.log('server works!!')
});
