import Team from "../models/team-model";
import Player from "../models/player-model";
import mongoose from "mongoose";

// Crear un nuevo equipo
const createTeam = async (req, res) => {
  try {
    const { name, rif, coach } = req.body;

    // Validación del cuerpo de la solicitud
    if (!name || !rif || !coach) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const newTeam = new Team({ name, rif, coach });
    await newTeam.save();

    res.status(201).json({ data: newTeam });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el equipo" });
  }
};

// Obtener todos los equipos
const getTeams = async (req, res) => {
  try {
    const teamStats = await Team.aggregate([
      {
        $lookup: {
          from: "matches",
          let: { team_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    { $eq: ["$homeTeam", "$$team_id"] },
                    { $eq: ["$visitorTeam", "$$team_id"] },
                  ],
                },
              },
            },
            {
              $project: {
                winner: {
                  $cond: {
                    if: { $gt: ["$goals.home", "$goals.visitor"] },
                    then: "$homeTeam",
                    else: {
                      $cond: {
                        if: { $lt: ["$goals.home", "$goals.visitor"] },
                        then: "$visitorTeam",
                        else: null,
                      },
                    },
                  },
                },
                yellowCards: {
                  $switch: {
                    branches: [
                      {
                        case: { $eq: ["$homeTeam", "$$team_id"] },
                        then: "$yellowCards.home",
                      },
                      {
                        case: { $eq: ["$visitorTeam", "$$team_id"] },
                        then: "$yellowCards.visitor",
                      },
                    ],
                    default: 0,
                  },
                },
                redCards: {
                  $switch: {
                    branches: [
                      {
                        case: { $eq: ["$homeTeam", "$$team_id"] },
                        then: "$redCards.home",
                      },
                      {
                        case: { $eq: ["$visitorTeam", "$$team_id"] },
                        then: "$redCards.visitor",
                      },
                    ],
                    default: 0,
                  },
                },
                completedPasses: {
                  $switch: {
                    branches: [
                      {
                        case: { $eq: ["$homeTeam", "$$team_id"] },
                        then: "$completedPasses.home",
                      },
                      {
                        case: { $eq: ["$visitorTeam", "$$team_id"] },
                        then: "$completedPasses.visitor",
                      },
                    ],
                    default: 0,
                  },
                },
                shots: {
                  $switch: {
                    branches: [
                      {
                        case: { $eq: ["$homeTeam", "$$team_id"] },
                        then: "$shots.home",
                      },
                      {
                        case: { $eq: ["$visitorTeam", "$$team_id"] },
                        then: "$shots.visitor",
                      },
                    ],
                    default: 0,
                  },
                },
                shotsOnGoal: {
                  $switch: {
                    branches: [
                      {
                        case: { $eq: ["$homeTeam", "$$team_id"] },
                        then: "$shotsOnGoal.home",
                      },
                      {
                        case: { $eq: ["$visitorTeam", "$$team_id"] },
                        then: "$shotsOnGoal.visitor",
                      },
                    ],
                    default: 0,
                  },
                },
                fouls: {
                  $switch: {
                    branches: [
                      {
                        case: { $eq: ["$homeTeam", "$$team_id"] },
                        then: "$fouls.home",
                      },
                      {
                        case: { $eq: ["$visitorTeam", "$$team_id"] },
                        then: "$fouls.visitor",
                      },
                    ],
                    default: 0,
                  },
                },
              },
            },
          ],
          as: "match",
        },
      },
      {
        $addFields: {
          matchesWon: {
            $size: {
              $filter: {
                input: "$match",
                as: "match",
                cond: {
                  $eq: ["$$match.winner", "$_id"],
                },
              },
            },
          },
          matchesLost: {
            $size: {
              $filter: {
                input: "$match",
                as: "match",
                cond: {
                  $and: [
                    { $ne: ["$$match.winner", "$_id"] },
                    { $ifNull: ["$$match.winner", false] },
                  ],
                },
              },
            },
          },
          matchesDrawn: {
            $size: {
              $filter: {
                input: "$match",
                as: "match",
                cond: {
                  $eq: ["$$match.winner", null],
                },
              },
            },
          },
        },
      },
      {
        $addFields: {
          totalPoints: {
            $add: [
              { $multiply: ["$matchesWon", 3] },
              { $multiply: ["$matchesDrawn", 1] },
            ],
          },
        },
      },
      { $sort: { totalPoints: -1 } },
    ]);

    res.json({ data: teamStats });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los equipos" });
  }
};

// Obtener un equipo por su ID
const getTeamById = async (req, res) => {
  try {
    const { teamId } = req.params;

    const team = await Team.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(teamId) } },
      {
        $lookup: {
          from: "matches",
          let: { team_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    { $eq: ["$homeTeam", "$$team_id"] },
                    { $eq: ["$visitorTeam", "$$team_id"] },
                  ],
                },
              },
            },
            {
              $project: {
                winner: {
                  $cond: {
                    if: { $gt: ["$goals.home", "$goals.visitor"] },
                    then: "$homeTeam",
                    else: {
                      $cond: {
                        if: { $lt: ["$goals.home", "$goals.visitor"] },
                        then: "$visitorTeam",
                        else: null,
                      },
                    },
                  },
                },
                yellowCards: {
                  $switch: {
                    branches: [
                      {
                        case: { $eq: ["$homeTeam", "$$team_id"] },
                        then: "$yellowCards.home",
                      },
                      {
                        case: { $eq: ["$visitorTeam", "$$team_id"] },
                        then: "$yellowCards.visitor",
                      },
                    ],
                    default: 0,
                  },
                },
                redCards: {
                  $switch: {
                    branches: [
                      {
                        case: { $eq: ["$homeTeam", "$$team_id"] },
                        then: "$redCards.home",
                      },
                      {
                        case: { $eq: ["$visitorTeam", "$$team_id"] },
                        then: "$redCards.visitor",
                      },
                    ],
                    default: 0,
                  },
                },
                completedPasses: {
                  $switch: {
                    branches: [
                      {
                        case: { $eq: ["$homeTeam", "$$team_id"] },
                        then: "$completedPasses.home",
                      },
                      {
                        case: { $eq: ["$visitorTeam", "$$team_id"] },
                        then: "$completedPasses.visitor",
                      },
                    ],
                    default: 0,
                  },
                },
                shots: {
                  $switch: {
                    branches: [
                      {
                        case: { $eq: ["$homeTeam", "$$team_id"] },
                        then: "$shots.home",
                      },
                      {
                        case: { $eq: ["$visitorTeam", "$$team_id"] },
                        then: "$shots.visitor",
                      },
                    ],
                    default: 0,
                  },
                },
                shotsOnGoal: {
                  $switch: {
                    branches: [
                      {
                        case: { $eq: ["$homeTeam", "$$team_id"] },
                        then: "$shotsOnGoal.home",
                      },
                      {
                        case: { $eq: ["$visitorTeam", "$$team_id"] },
                        then: "$shotsOnGoal.visitor",
                      },
                    ],
                    default: 0,
                  },
                },
                fouls: {
                  $switch: {
                    branches: [
                      {
                        case: { $eq: ["$homeTeam", "$$team_id"] },
                        then: "$fouls.home",
                      },
                      {
                        case: { $eq: ["$visitorTeam", "$$team_id"] },
                        then: "$fouls.visitor",
                      },
                    ],
                    default: 0,
                  },
                },
              },
            },
          ],
          as: "match",
        },
      },
      {
        $addFields: {
          matchesWon: {
            $size: {
              $filter: {
                input: "$match",
                as: "match",
                cond: {
                  $eq: ["$$match.winner", "$_id"],
                },
              },
            },
          },
          matchesLost: {
            $size: {
              $filter: {
                input: "$match",
                as: "match",
                cond: {
                  $and: [
                    { $ne: ["$$match.winner", "$_id"] },
                    { $ifNull: ["$$match.winner", false] },
                  ],
                },
              },
            },
          },
          matchesDrawn: {
            $size: {
              $filter: {
                input: "$match",
                as: "match",
                cond: {
                  $eq: ["$$match.winner", null],
                },
              },
            },
          },
        },
      },
      {
        $addFields: {
          totalPoints: {
            $add: [
              { $multiply: ["$matchesWon", 3] },
              { $multiply: ["$matchesDrawn", 1] },
            ],
          },
        },
      },
    ]);

    const teamStats = team[0];
    teamStats.totalYellowCards = teamStats.match.reduce(
      (acc, match) => acc + match.yellowCards,
      0
    );
    teamStats.totalRedCards = teamStats.match.reduce(
      (acc, match) => acc + match.redCards,
      0
    );
    teamStats.totalCompletedPasses = teamStats.match.reduce(
      (acc, match) => acc + match.completedPasses,
      0
    );
    teamStats.totalShots = teamStats.match.reduce(
      (acc, match) => acc + match.shots,
      0
    );
    teamStats.totalShotsOnGoal = teamStats.match.reduce(
      (acc, match) => acc + match.shotsOnGoal,
      0
    );
    teamStats.totalFouls = teamStats.match.reduce(
      (acc, match) => acc + match.fouls,
      0
    );

    if (!team) {
      return res.status(404).json({ error: "Equipo no encontrado" });
    }

    res.json({ data: team });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener el equipo" });
  }
};

// Actualizar un equipo por su ID
const updateTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { name, rif, coach } = req.body;

    // Validación del cuerpo de la solicitud
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { name, rif, coach },
      { new: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ error: "Equipo no encontrado" });
    }

    res.json({ data: updatedTeam });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el equipo" });
  }
};

const updateTeamPlayers = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { playerId, add } = req.body;

    // Validación del cuerpo de la solicitud
    if (!playerId || add === undefined) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const team = await Team.findById(teamId);
    const player = await Player.findById(playerId);

    if (!team) {
      return res.status(404).json({ error: "Equipo no encontrado" });
    }

    if (!player) {
      return res.status(404).json({ error: "Jugador no encontrado" });
    }

    let updateQuery = {};

    if (add === 1) {
      // Agregar al jugador al equipo si add es 1
      updateQuery = { $addToSet: { players: playerId } };
    } else if (add === 0) {
      // Eliminar al jugador del equipo si add es 0
      updateQuery = { $pull: { players: playerId } };
    } else {
      return res
        .status(400)
        .json({ error: "Valor inválido para el parámetro 'add'" });
    }

    const newTeam = await Team.findByIdAndUpdate(teamId, updateQuery, {
      new: true,
    });
    res.json({ message: "Actualización exitosa del equipo", data: newTeam });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el equipo" });
  }
};

export default {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  updateTeamPlayers,
};
