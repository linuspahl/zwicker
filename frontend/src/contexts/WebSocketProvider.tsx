import { useEffect, useMemo } from 'react';
import WebSocketContext from './WebSocketContext';

type Props = {
  url: string;
  children: React.ReactNode;
}

const WebSocketProvider = ({ url, children }: Props) => {
  const ws = useMemo(() => new WebSocket(url), [url]);

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
