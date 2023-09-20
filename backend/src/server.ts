import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import database from "./models";
import authRoute from './routes/auth';
import userRoutes from './routes/user';
import matchRoutes from './routes/match';
import ws, { WebSocket } from 'ws';
import matchController from './controllers/match';
import matchModelActions from './modelActions/match'
import { uuid } from "uuidv4";

const DEFAULT_PORT = 8080;
const PORT = process.env.PORT || DEFAULT_PORT;

const app = express();

const clients = {}
const rooms: { [roomName: string]: Set<WebSocket> | undefined} = {};

const wsServer = new ws.Server({ noServer: true });

const corsOptions = {
  origin: process.env.FRONTEND_URL
};

const updateClientsInRoom = (roomName: string, type: string, dataType: string, payload: unknown) => {
  const room = rooms[roomName];

  if (!room) {
    throw new Error(`Invalid room ${roomName}`);
  }

  room.forEach((client: WebSocket) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type,
        roomName,
        dataType,
        payload
      }));
    }
  });
}

const sendResonseToClient = (clientId: string, type: string, dataType: string, error: unknown, payload: unknown) => {
  const creator = clients[clientId];
  // Send the 'todo_created' event to the creator client only
  creator.send(JSON.stringify({
    type,
    dataType,
    error,
    payload
  }));

}

const joinRoom = (ws: WebSocket, dataType: string) => (
  (rooms[dataType] ??= new Set()).add(ws)
)

wsServer.on('connection', (ws) => {
  console.log('Client connected');

  const clientId = uuid();

  clients[clientId] = ws;

  ws.on('message', async (message) => {
    const data = JSON.parse(message);

    switch (data.type) {
      case 'join_room':
        joinRoom(ws, data.dataType)
        break;
      case 'fetch_data':
        if (data.dataType === 'matches') {
          const matches = await matchModelActions.getAll()
          updateClientsInRoom('matches', 'update_client', 'matches', matches)
        }
        if (data.dataType === 'match') {
          const match = await matchController.getOne(data.entityId);
          updateClientsInRoom(`match_${data.entityId}`, 'update_client', 'match', match)
        }
        if (data.dataType === 'match_users') {
          const matchUsers = await matchController.getUsers(data.entityId);
          updateClientsInRoom(`match_users_${data.entityId}`, 'update_client', 'match_users', matchUsers)
        }
        if (data.dataType === 'match_state') {
          const matchState = await matchController.getState(data.entityId);
          updateClientsInRoom(`match_state_${data.entityId}`, 'update_client', 'match_state', matchState)
        }
        break;
      case 'update':
        if (data.dataType === 'match_move') {
          const match = await matchController.move(data.payload);
          updateClientsInRoom(`match_${data.payload}`, 'update_client', 'match', match)
        }
        break
      default:
        throw new Error('Invalid type ${data.type}');
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    delete clients[clientId];
    for (const room of Object.values(rooms)) {
      room.delete(ws);
    }
  });
});

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// register routes
authRoute(app);
userRoutes(app);
matchRoutes(app, updateClientsInRoom);

const server = app.listen(PORT);
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});

if (process.env.CLEAR_DB === '1') {
  const initial = () => {
    database.role.create({
      id: 1,
      name: "user"
    });
  
    database.role.create({
      id: 2,
      name: "admin"
    });
  }
  database.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
  });
}
