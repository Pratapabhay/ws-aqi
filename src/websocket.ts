const subscribe = {
  type: "subscribe",
};

export const ws = new WebSocket("wss://city-ws.herokuapp.com");
ws.onopen = () => {
  ws.send(JSON.stringify(subscribe));
};
