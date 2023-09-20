import { useCallback, useContext } from 'react';
import WebSocketContext from '../contexts/WebSocketContext';

const useWebSocket = () => {
  const ws = useContext(WebSocketContext);

  if (!ws) {
    throw new Error('useWebSocket needs to be used inside WebSocketProvider');
  }

  const send = useCallback((data: unknown) => {
    ws.send(JSON.stringify(data));
  }, [ws]);

  return { ws, send };
};

export default useWebSocket;
