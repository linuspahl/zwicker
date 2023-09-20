import { useCallback, useEffect, useState } from 'react';
import useWebSocket from './useWebSocket';

type Props = {
  room: string,
  dataType: string,
  entityId?: string,
}
const useFetchData = <Entity>({ room, entityId, dataType }: Props) => {
  const { ws, send } = useWebSocket();
  const [data, setData] = useState<Entity | null>(null);

  const handleMessage = useCallback((event: MessageEvent) => {
    const newData = JSON.parse(event.data);
    if (newData.type === 'update_client' && newData.roomName === room) {
      setData(newData.payload);
    }
  }, [room]);

  useEffect(() => {
    ws.addEventListener('message', handleMessage);
    send({ type: 'join_room', dataType: room });
    send({ type: 'fetch_data', dataType, entityId });

    return () => {
      ws.removeEventListener('message', handleMessage);
    };
  }, [dataType, entityId, handleMessage, room, send, ws]);

  return { data };
};

export default useFetchData;
