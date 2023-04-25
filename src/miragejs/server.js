import { createServer, Response } from "miragejs";
export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    seeds(server) {
      server.db.loadData({
        pacientes: [
          {
            foto: "",
            nomeMae: "Amanda Bonfim Felix Souza",
            nomePaciente: "Alex Felix Souza",
            dataNascimento: "07/05/1997",
            cpf: "496.886.350-06",
            cns: "831226237640001",
          },
          {
            foto: "",
            nomeMae: "Deise Neves Greenfield",
            nomePaciente: "Douglas Neves Greenfield",
            dataNascimento: "17/02/1992",
            cpf: "069.436.720-61",
            cns: "209784675950000",
          },
          {
            foto: "",
            nomeMae: "Gloria Pereira Silva",
            nomePaciente: "Fernando Pereira Silva",
            dataNascimento: "12/12/2000",
            cpf: "573.161.990-59",
            cns: "137737439610007",
          },
        ],
      });
    },

    routes() {
      this.namespace = "api";
      this.urlPrefix = "http://localhost:3000";
      this.timing = 750;

      this.post("/login", (schema, request) => {
        console.log(request);
        let dados = JSON.parse(request.requestBody);
        console.log(dados);
        if (dados.email && dados.senha) {
          return new Response(200, {}, { token: "TOKEN-AUTH" });
        } else {
          return new Response(401, {}, { errors: ["credenciais incorretas"] });
        }
      });

      this.get("/pacientes", ({ db }) => {
        return db.pacientes;
      });

      this.patch("/pacientes/:id", (schema, request) => {
        let paciente = JSON.parse(request.requestBody).data;

        return schema.db.pacientes.update(paciente.id, paciente);
      });

      this.post("/pacientes", (schema, request) => {
        let paciente = JSON.parse(request.requestBody).data;

        return schema.db.pacientes.insert(paciente);
      });

      this.delete("/pacientes/:id", (schema, request) => {
        return schema.db.pacientes.remove(request.params.id);
      });
      this.passthrough("**");
      this.passthrough("https://viacep.com.br/**");
    },
  });

  window.server = server;

  return server;
}
