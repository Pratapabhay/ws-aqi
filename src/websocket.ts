const subscribe = {
  type: "subscribe",
};

export const ws = new WebSocket("ws://city-ws.herokuapp.com");
ws.onopen = () => {
  ws.send(JSON.stringify(subscribe));
};
