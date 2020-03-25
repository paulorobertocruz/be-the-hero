const express = require("express");
const NonProfitsController = require("./controllers/NonProfitsController");
const IncidentsController = require("./controllers/IncidentsController");
const ProfileController = require("./controllers/ProfileController");
const SessionsController = require("./controllers/SessionsController");

routes = express.Router();

routes.get('/about', function (request, response) {
    return response.json({
        name: "Be a Hero",
        description: "Be a hero helping non-profits work for the world.",
        developer: {
            name: "Paulo Roberto Cruz",
            email: "paulo.cruz@gmai.com"
        }
    });
});
routes.post('/sessions', SessionsController.create);
routes.get('/profile', ProfileController.list);
routes.get('/non_profits', NonProfitsController.list);
routes.post('/non_profits', NonProfitsController.create);
routes.get('/incidents', IncidentsController.list);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.delete);
module.exports = routes;