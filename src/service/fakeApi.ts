import { createServer } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,

    routes() {
      this.namespace = "api";
      this.timing = 1000;

      this.get("/jornadas", () => {
        return [
          {
            uid: "lang-1",
            linguagem: {
              cor: "#ffff00",
              nome: "JavaScript",
              url: "https://2ality.com/2011/10/logo-js/js.jpg",
            },
            progresso_percent: 75,
          },
          {
            uid: "lang-2",
            linguagem: {
              cor: "#3178c6",
              nome: "TypeScript",
              url: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
            },
            progresso_percent: 60,
          },
          {
            uid: "lang-3",
            linguagem: {
              cor: "#61dafb",
              nome: "React",
              url: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
            },
            progresso_percent: 45,
          },
          {
            uid: "lang-4",
            linguagem: {
              cor: "#339933",
              nome: "Node.js",
              url: "https://nodejs.org/static/images/logo.svg",
            },
            progresso_percent: 80,
          },
          {
            uid: "lang-5",
            linguagem: {
              cor: "#4B8BBE",
              nome: "Python",
              url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngteam.com%2Fimages%2Fpython-logo-png-1024x1024_7d6af8d1_transparent_2023e8.png.png&f=1&nofb=1&ipt=0bdf63f9293fbefeccbcd3ca15802c88c35b6a7f6970ee56f783e7db9834779b",
            },
            progresso_percent: 65,
          },
          {
            uid: "lang-6",
            linguagem: {
              cor: "#FF4500",
              nome: "Rust",
              url: "https://www.rust-lang.org/logos/rust-logo-512x512.png",
            },
            progresso_percent: 30,
          },
        ];
      });
    },
  });
}
