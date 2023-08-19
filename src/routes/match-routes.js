import routerx from "express-promise-router";
import matchController from "../controllers/match-controller";

const router = routerx();
// Rutas para equipos
router.post("/", matchController.createMatch);
router.get("/", matchController.getMatches);
router.get("/:playerId", matchController.getMatchById);
router.put("/:playerId", matchController.updateMatch);
router.delete("/:playerId", matchController.deleteMatch);

export default router;
