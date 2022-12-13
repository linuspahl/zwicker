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
    [
      authJwt.verifyToken,
      controller.create
    ],
  );
  app.get(
    "/api/matches",
    [
      authJwt.verifyToken,
      controller.getAll
    ],
  );
  app.get(
    "/api/matches/:matchId",
    [
      authJwt.verifyToken,
      controller.getOne
    ],
  );
  app.delete(
    "/api/matches/:matchId/delete",
    [
      authJwt.verifyToken,
      controller.deleteOne
    ],
  );
  app.put(
    "/api/matches/:matchId/start",
    [
      authJwt.verifyToken,
      controller.start
    ],
  );
};

export default matchRoutes
