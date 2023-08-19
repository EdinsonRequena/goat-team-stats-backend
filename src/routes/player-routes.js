import routerx from "express-promise-router";
import playerController from "../controllers/player-controller";

const router = routerx();
// Rutas para equipos
router.post("/", playerController.createPlayer);
router.get("/", playerController.getPlayers);
router.get("/:playerId", playerController.getPlayerById);
router.put("/:playerId", playerController.updatePlayer);
router.delete("/:playerId", playerController.deletePlayer);

export default router;
