import { useCallback, useEffect, useState } from 'react';
import useWebSocket from './useWebSocket';

const actionMap = {
  create: 'created',
  update: 'updated',
  start: 'started',
};

const useActionRequest = <Entity>(type: 'create' | 'update', dataType: string) => {
  const { ws, send } = useWebSocket();
  const [data, setData] = useState<Entity | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const handleActionResponse = useCallback((event: MessageEvent) => {
    const newData = JSON.parse(event.data);
    if (newData.type === actionMap[type] && newData.dataType === dataType) {
      setData(newData.payload);
      setError(newData.error);
    }
  }, [dataType, type]);

  const performAction = useCallback((payload: unknown) => send({
    type,
    dataType,
    payload,
  }), [dataType, send, type]);

  useEffect(() => {
    ws.addEventListener('message', handleActionResponse);

    return () => {
      ws.removeEventListener('message', handleActionResponse);
    };
  }, [handleActionResponse, ws]);

  return { data, error, performAction };
};

export default useActionRequest;
