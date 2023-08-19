# Nombre del Proyecto - Backend

## Descripción

Este proyecto es el backend para la aplicación de registro de partidos de fútbol. Proporciona API endpoints para manejar la lógica de registro, recuperación y visualización de partidos y detalles relacionados.

## Instalación y Uso

Sigue estos pasos para ejecutar el backend en tu entorno local:

1. Clona este repositorio en tu máquina local
2. Instala las dependencias con `npm install`
3. Inicia el servidor con `npm run dev`

## API Endpoints

### match

| Método | Endpoint | Descripción |
| ------ | -------- | ----------- |
| GET | /api/match | Obtiene todos los partidos registrados |
| GET | /api/match/:id | Obtiene un partido por su id |
| POST | /api/match | Crea un nuevo partido |
| PUT | /api/match/:id | Actualiza un partido por su id |
| DELETE | /api/match/:id | Elimina un partido por su id |

### team

| Método | Endpoint | Descripción |
| ------ | -------- | ----------- |
| GET | /api/team | Obtiene todos los equipos registrados |
| GET | /api/team/:id | Obtiene un equipo por su id |
| POST | /api/team | Crea un nuevo equipo |
| PUT | /api/team/:id | Actualiza un equipo por su id |
| DELETE | /api/team/:id | Elimina un equipo por su id |

### player

| Método | Endpoint | Descripción |
| ------ | -------- | ----------- |
| GET | /api/player | Obtiene todos los jugadores registrados |
| GET | /api/player/:id | Obtiene un jugador por su id |
| POST | /api/player | Crea un nuevo jugador |
| PUT | /api/player/:id | Actualiza un jugador por su id |
| DELETE | /api/player/:id | Elimina un jugador por su id |

### tournament

| Método | Endpoint | Descripción |
| ------ | -------- | ----------- |
| GET | /api/tournament | Obtiene todos los torneos registrados |
| GET | /api/tournament/:id | Obtiene un torneo por su id |
| POST | /api/tournament | Crea un nuevo torneo |
| PUT | /api/tournament/:id | Actualiza un torneo por su id |
| DELETE | /api/tournament/:id | Elimina un torneo por su id |


### Tecnologías

- Node.js
- Express
- MongoDB
- Mongoose