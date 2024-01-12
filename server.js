const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

const URL = process.env.URL || 'http://localhost';
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const rateLimit = require("express-rate-limit");

// Utilisation du middleware pour limiter le taux de requêtes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes par fenêtre
});

// Applique le middleware à toutes les routes
app.use(limiter);


// Utilisation du middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Exemple REST API with Node.js, Express and MySQL",
      version: "1.0.0",
      description:
        "REST API with Node.js, Express and MySQL documenté avec Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Can LEVET",
        url: "https://www.linkedin.com/in/can-levet/",
        email: "canaksuga@gmail.com",
      },
    },
    servers: [
      {
        url: `${URL}:${PORT}/api`,
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);


require("./src/routes/auteur.routes.js")(app);
require("./src/routes/genre.routes.js")(app);
require("./src/routes/couverture.routes.js")(app);
require("./src/routes/livre.routes.js")(app);
require("./src/routes/user.routes.js")(app);

app.listen(PORT, () => {
  console.log(`Le serveur est démarré sur le port ${PORT}.`);
  console.log(`URL : ${URL}:${PORT}`);
  console.log(`URL de la documentation : ${URL}:${PORT}/docs`);
});
