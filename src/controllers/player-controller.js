import Player from "../models/player-model";

// Crear un nuevo jugador
const createPlayer = async (req, res) => {
  try {
    const { phoneNumber, ci, birthDate, firstName, lastName } = req.body;

    console.log(phoneNumber, ci, birthDate, firstName, lastName);

    // Validación del cuerpo de la solicitud
    if (!phoneNumber || !ci || !birthDate || !firstName || !lastName) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const newPlayer = new Player({
      phoneNumber,
      ci,
      birthDate,
      firstName,
      lastName,
    });

    await newPlayer.save();

    res.status(201).json({ data: newPlayer });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el jugador" });
  }
};

// Obtener todos los jugadores
const getPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.json({ data: players });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los jugadores" });
  }
};

// Obtener un jugador por su ID
const getPlayerById = async (req, res) => {
  try {
    const { playerId } = req.params;
    const player = await Player.findById(playerId);

    if (!player) {
      return res.status(404).json({ error: "Jugador no encontrado" });
    }

    res.json({ data: player });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el jugador" });
  }
};

// Actualizar un jugador por su ID
const updatePlayer = async (req, res) => {
  try {
    const { playerId } = req.params;
    const { phoneNumber, ci, birthDate, firstName, lastName } = req.body;

    // Validación del cuerpo de la solicitud
    const updatedPlayer = await Player.findByIdAndUpdate(
      playerId,
      { phoneNumber, ci, birthDate, firstName, lastName },
      { new: true }
    );

    if (!updatedPlayer) {
      return res.status(404).json({ error: "Jugador no encontrado" });
    }

    res.json({ data: updatedPlayer });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el jugador" });
  }
};

// Eliminar un jugador por su ID
const deletePlayer = async (req, res) => {
  try {
    const { playerId } = req.params;
    const deletedPlayer = await Player.findByIdAndDelete(playerId);

    if (!deletedPlayer) {
      return res.status(404).json({ error: "Jugador no encontrado" });
    }

    res.json({
      message: "Jugador eliminado correctamente",
      data: deletedPlayer,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el jugador" });
  }
};

export default {
  createPlayer,
  getPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
};
