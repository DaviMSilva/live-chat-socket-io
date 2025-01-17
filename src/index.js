import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req,res)=> {
    res.sendFile(join(__dirname, 'index.html'))
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    
    socket.on('chat message', (msg, user)=>{
        console.log('message: %s from: %s' , msg, user)
        io.emit('chat message', msg, user);
    });
    
});

const PORT = 3333
server.listen(PORT, () => {
    console.log('server running on ',PORT );
})