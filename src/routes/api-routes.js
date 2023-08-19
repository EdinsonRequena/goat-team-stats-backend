import routerx from "express-promise-router";
import teamRouter from "./team-routes";
import playerRouter from "./player-routes";
import tournamentRouter from "./tournaments-routes";
import matchRouter from "./match-routes";

const router = routerx();

router.use("/teams", teamRouter);
router.use("/players", playerRouter);
router.use("/tournament", tournamentRouter);
router.use("/match", matchRouter);

export default router;
