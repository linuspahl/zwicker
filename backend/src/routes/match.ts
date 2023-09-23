import { authJwt } from "../middleware";
import controller from "../controllers/match";
import modelActions from '../modelActions/match'

const extendReqLocals = (fnKey: string, fn) => (req, res, next) => {
  
  res.locals[fnKey] = fn;

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
    [authJwt.verifyToken, extendReqLocals('updateClientsInRoom', updateClientsInRoom), controller.create],
  );
  app.delete(
    "/api/matches/:matchId/delete",
    [authJwt.verifyToken, controller.deleteOne],
  );
  app.post(
    "/api/matches/:matchId/join",
    [authJwt.verifyToken, controller.join],
  );
  app.put(
    "/api/matches/:matchId/start",
    [authJwt.verifyToken, extendReqLocals('updateClientsInRoom', updateClientsInRoom), controller.start],
  );
  app.get(
    "/api/matches/:matchId/state",
    [authJwt.verifyToken, modelActions.getState],
  );
  app.post(
    "/api/matches/:matchId/move",
    [authJwt.verifyToken, extendReqLocals('updateClientsInRoom', updateClientsInRoom), controller.move],
  );
};

export default matchRoutes
