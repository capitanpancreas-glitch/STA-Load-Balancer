export default class LoadBalancer {
  // import vite.config;
  // Очень важное примечание к этому заданию: все полезные нагрузки запросов должны быть заменены числовым значением строки. В противном случае задание будет считаться невыполненным.

  constructor(servers) {
    // Ejemplo de un servidor:
    // {
    //   id: "server-2",
    //   power: 3,          // Unidades de trabajo por segundo simulado
    //   activeRequest: { id: "P01", payload: "08319462", work: 4 }, // null si está libre
    //   queuedRequests: [{ id: "P02", payload: "74150328", work: 2 }],
    //   activeProgress: 0.25 // Progreso de 0 a 1 (0 si está libre)
    // }
    // Los datos son de solo lectura y se actualizan durante la simulación.
    this.indice = 0;
    this.max = servers.length - 1;
    this.servers = Object.freeze([...servers]);
    this.arraypesos = [this.servers[0].power, this.servers[1].power, this.servers[2].power, this.servers[3].power];
    this.siguiente = 1;
  }
  
  async onRequestArrival(request, sendToServer) {
    // Ejemplo de la petición que llega:
    // {
    //   id: "request-17",
    //   payload: "08319462", // Datos que envía el cliente
    //   work: 4              // Unidades de trabajo necesarias
    // }
    if (this.indice > this.max) {
      this.indice = 0;
    }
    if (this.arraypesos[this.indice] != 0){
      this.siguiente = this.indice;
      this.arraypesos[this.indice]--;
      this.indice++;
    }
    else{
      this.indice++;
    }
    // Envía la petición al servidor y devuelve su respuesta al cliente.
    const server = this.servers[this.siguiente]
    return sendToServer(server.id);
  }
}
