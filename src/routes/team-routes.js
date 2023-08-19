import routerx from "express-promise-router";
import teamController from "../controllers/team-controller";

const router = routerx();
// Rutas para equipos
router.post("/", teamController.createTeam);
router.get("/", teamController.getTeams);
router.get("/:teamId", teamController.getTeamById);
router.put("/:teamId", teamController.updateTeam);

export default router;
