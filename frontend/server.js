/* server.js */

const express = require("express");
const next  = require("next");

// swagger decumentation 
var restaurants2 = [{id:0, name:"Pollo Campero"},{id:1, name:"Pollo Brujo"}]
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const appSwagger = express();
appSwagger.use(express.json());
appSwagger.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
appSwagger.get("/restaurants", (req, res) => {
  res.send(restaurants2);
});
appSwagger.post("/restaurant", (req, res) => {
  restaurants2.push({ id: req.body.id, name: req.body.name });
  res.send(`${JSON.stringify(restaurants2)} create`);
});
appSwagger.delete("/restaurant/:id", (req, res) => {
  restaurants2 = restaurants2.filter((item) => item.id != req.params.id);
  res.send("restaurants left:" + JSON.stringify(restaurants2));
});
appSwagger.listen(4000, () => console.log('Listening on 4000 port'));
// end swagger documentation

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("/restaurants/:id", (req, res) => {
      const actualPage = "/restaurants";
      const queryParams = { id: req.params.id };
      console.dir("req.params.id = " + JSON.stringify(req.params.id));
      app.render(req, res, actualPage, queryParams);
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready server.js on http://localhost:3000");
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
