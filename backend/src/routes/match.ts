import { authJwt } from "../middleware";
import controller from "../controllers/match";
import clients from "../clients/match";

const test = (updateClientsInRoom) => (req, res, next) => {
  
  res.locals.updateClientsInRoom = updateClientsInRoom;

  next();
};

const matchRoutes = (app, updateClientsInRoom) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/matches/create",
    [authJwt.verifyToken, test(updateClientsInRoom), controller.create],
  );
  app.delete(
    "/api/matches/:matchId/delete",
    [authJwt.verifyToken, controller.deleteOne],
  );
  app.post(
    "/api/matches/:matchId/join",
    [authJwt.verifyToken, controller.join],
  );
  app.get(
    "/api/matches/:matchId/state",
    [authJwt.verifyToken, controller.getState],
  );
  app.post(
    "/api/matches/:matchId/move",
    [authJwt.verifyToken, controller.move],
  );
};

export default matchRoutes
