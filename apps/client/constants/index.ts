const ENV = "DEV";
// const ENV = "STAGE";
// const ENV: string = "PROD";

const URLS = {
  DEV: {
    BASE: "http://localhost:5000/api/v1",
    PAYMENT: "http://localhost:5000/payments",
    SOCKET: "ws://localhost:5000",
    APP: "http://app.localhost:3000",
  },
  //   PROD: {
  //     BASE: "https://backend.leadseeder.co/api/v1",
  //     PAYMENT: "https://backend.leadseeder.co/payments",
  //     INTERNAL_TOOLS: "https://backend.leadseeder.co/internal-tools",
  //     SOCKET: "wss://backend.leadseeder.co",
  //   },
};

export const APP_URL = URLS[ENV].APP;

export const SOCKET_URL = URLS[ENV].SOCKET;

export const BASE_URL = URLS[ENV].BASE;
