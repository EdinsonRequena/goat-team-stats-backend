import Tournament from "../models/tournament-model";
import moment from "moment";

// Crear un nuevo torneo
const createTournament = async (req, res) => {
  try {
    const { name, teams, startDate, endDate } = req.body;

    // Validación del cuerpo de la solicitud
    if (!name || !teams) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Verificar si la fecha es válida
    const initDate = moment(startDate);
    const tournamentEndDate = moment(endDate);

    if (initDate.isAfter(tournamentEndDate)) {
      return res.status(400).json({
        error:
          "La fecha debe inicio deber ser menor o igual a la fecha de finalización del torneo",
      });
    }

    const newTournament = new Tournament({
      name,
      teams,
      startDate,
      endDate,
    });

    await newTournament.save();

    res.status(201).json({ data: newTournament });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el torneo", error });
  }
};

// Obtener todos los torneos
const getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find().populate("teams");
    res.json({ data: tournaments });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los torneos" });
  }
};

// Obtener un torneo por su ID
const getTournamentById = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const tournament = await Tournament.findById(tournamentId).populate(
      "teams"
    );

    if (!tournament) {
      return res.status(404).json({ error: "Torneo no encontrado" });
    }

    res.json({ data: tournament });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el torneo" });
  }
};

const updateTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const { name, teams, startDate, endDate } = req.body;

    // Obtener el torneo actual
    const currentTournament = await Tournament.findById(tournamentId);

    if (!currentTournament) {
      return res.status(404).json({ error: "Torneo no encontrado" });
    }

    // Validar si la fecha de inicio es mayor que la fecha actual
    const isStartDateFuture = moment(startDate).isAfter(moment());

    if (isStartDateFuture) {
      return res.status(400).json({
        error: "No se puede actualizar un torneo que ya ha iniciado",
      });
    }

    // Realizar la actualización si la fecha de inicio es mayor o igual a la fecha actual
    const updatedTournament = await Tournament.findByIdAndUpdate(
      tournamentId,
      { name, teams, startDate, endDate },
      { new: true }
    );

    res.json({ data: updatedTournament });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el torneo" });
  }
};

export default {
  createTournament,
  getTournaments,
  getTournamentById,
  updateTournament,
};
