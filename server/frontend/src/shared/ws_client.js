const url = `ws://${window.location.hostname}:27149/ws`;
const wsClient = new WebSocket(url);

class WsClient {
  constructor(client) {
    this.client = client
  }
  send(data) {
    this.client.send(JSON.stringify(data))
  }
  onMessage(fn) {
    this.client.onmessage = ({ data }) => {
      fn(JSON.parse(data))
    }
  }
}


const promise = new Promise((resolve, reject) => {
  wsClient.onopen = () => {
    resolve(new WsClient(wsClient))
  }
  setTimeout(() => {
    reject(new Error('get ws connection timeout'))
  }, 10000)
})

export const getWsClient = () => promise