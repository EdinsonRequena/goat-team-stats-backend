import routerx from "express-promise-router";
import tournament from "../controllers/tournament-controller";

const router = routerx();
// Rutas para equipos
router.post("/", tournament.createTournament);
router.get("/", tournament.getTournaments);
router.get("/:tournamentId", tournament.getTournamentById);
router.put("/:tournamentId", tournament.updateTournament);

export default router;
