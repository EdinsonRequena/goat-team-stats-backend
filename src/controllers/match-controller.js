import mongoose from "mongoose";
import Match from "../models/match-model";
import Tournament from "../models/tournament-model";
import Team from "../models/team-model";
import moment from "moment";

// Crear un nuevo partido
const createMatch = async (req, res) => {
  try {
    const {
      tournament,
      homeTeam,
      visitorTeam,
      date,
      goals,
      yellowCards,
      redCards,
      shots,
      shotsOnGoal,
      completedPasses,
      fouls,
      winner,
    } = req.body;

    // Validación del cuerpo de la solicitud
    if (!tournament || (!homeTeam && !visitorTeam) || !date) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Verificar si los equipos existen
    const homeExist = await Team.exists({
      _id: { $in: [homeTeam] },
    });

    const visitorExist = await Team.exists({
      _id: { $in: [visitorTeam] },
    });

    if (!homeExist && !visitorExist) {
      return res.status(400).json({ error: "Ninguno de los equipos existe" });
    }

    // Obtener información del torneo
    const tournamentInfo = await Tournament.findById(tournament);
    if (!tournamentInfo) {
      return res
        .status(400)
        .json({ error: "No se pudo obtener información del torneo" });
    }

    // Verificar si la fecha es válida
    const matchDate = moment(date);
    const tournamentEndDate = moment(tournamentInfo.endDate);

    if (matchDate.isAfter(tournamentEndDate)) {
      return res.status(400).json({
        error:
          "La fecha debe ser menor o igual a la fecha de finalización del torneo",
      });
    }

    //Agregar equipo al torneo si no esta registrado
    const teamsToAdd = [];
    if (homeTeam && homeExist) {
      teamsToAdd.push(homeTeam);
    }
    if (visitorTeam && visitorExist) {
      teamsToAdd.push(visitorTeam);
    }

    if (teamsToAdd.length > 0) {
      await Tournament.findByIdAndUpdate(tournamentInfo._id, {
        $addToSet: { teams: teamsToAdd },
      });
    }

    const newMatch = new Match({
      tournament,
      homeTeam,
      visitorTeam,
      date,
      goals,
      yellowCards,
      redCards,
      shots,
      shotsOnGoal,
      completedPasses,
      fouls,
      winner,
    });

    await newMatch.save();

    res.status(201).json({ data: newMatch });
  } catch (error) {
    res.status(500).json({ error, message: "Error al crear el partido" });
  }
};

// Obtener todos los partidos
const getMatches = async (req, res) => {
  try {
    const { tournamentID } = req.query;

    const matches = await Match.find(
      tournamentID ? { tournament: tournamentID } : {}
    ).populate("tournament homeTeam visitorTeam winner");

    res.json({ data: matches });
  } catch (error) {
    res.status(500).json({ error, message: "Error al obtener los partidos" });
  }
};

// Obtener un partido por su ID
const getMatchById = async (req, res) => {
  try {
    const { matchId } = req.params;
    const match = await Match.findById(matchId).populate(
      "tournament homeTeam visitorTeam winner"
    );

    if (!match) {
      return res.status(404).json({ error: "Partido no encontrado" });
    }

    res.json({ data: match });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el partido" });
  }
};

// Actualizar un partido por su ID
const updateMatch = async (req, res) => {
  try {
    const { matchId } = req.params;
    const {
      homeTeam,
      visitorTeam,
      date,
      goals,
      yellowCards,
      redCards,
      shots,
      shotsOnGoal,
      completedPasses,
      fouls,
      winner,
    } = req.body;

    // Validación del cuerpo de la solicitud
    const updatedMatch = await Match.findByIdAndUpdate(
      matchId,
      {
        homeTeam,
        visitorTeam,
        date,
        goals,
        yellowCards,
        redCards,
        shots,
        shotsOnGoal,
        completedPasses,
        fouls,
        winner,
      },
      { new: true }
    );

    if (!updatedMatch) {
      return res.status(404).json({ error: "Partido no encontrado" });
    }

    res.json({ data: updatedMatch });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el partido" });
  }
};

// Eliminar un partido por su ID
const deleteMatch = async (req, res) => {
  try {
    const { matchId } = req.params;
    const deletedMatch = await Match.findByIdAndDelete(matchId);

    if (!deletedMatch) {
      return res.status(404).json({ error: "Partido no encontrado" });
    }

    res.json({ message: "Partido eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el partido" });
  }
};

export default {
  createMatch,
  getMatches,
  getMatchById,
  deleteMatch,
  updateMatch,
};
