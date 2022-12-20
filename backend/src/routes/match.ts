import { authJwt } from "../middleware";
import controller from "../controllers/match";

const matchRoutes = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/matches/create",
    [authJwt.verifyToken, controller.create],
  );
  app.get(
    "/api/matches",
    [authJwt.verifyToken, controller.getAll],
  );
  app.get(
    "/api/matches/:matchId",
    [authJwt.verifyToken, controller.getOne],
  );
  app.delete(
    "/api/matches/:matchId/delete",
    [authJwt.verifyToken, controller.deleteOne],
  );
  app.put(
    "/api/matches/:matchId/start",
    [authJwt.verifyToken, controller.start],
  );
  app.post(
    "/api/matches/:matchId/join",
    [authJwt.verifyToken, controller.join],
  );
  app.get(
    "/api/matches/:matchId/users",
    [authJwt.verifyToken, controller.getUsers],
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
