import { useCallback, useEffect, useState } from 'react';
import useWebSocket from './useWebSocket';

const useFetchData = <Entity>(room: string) => {
  const { ws, send } = useWebSocket();
  const [data, setData] = useState<Entity | null>(null);

  const handleMessage = useCallback((event: MessageEvent) => {
    const newData = JSON.parse(event.data);
    if (newData.type === 'update_client' && newData.dataType === room) {
      setData(newData.payload);
    }
  }, [room]);

  useEffect(() => {
    ws.addEventListener('message', handleMessage);
    send({ type: 'join_room', dataType: room });
    send({ type: 'fetch_data', dataType: room });

    return () => {
      ws.removeEventListener('message', handleMessage);
    };
  }, [handleMessage, room, send, ws]);

  return { data };
};

export default useFetchData;
