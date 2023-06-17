# SkyHome

SkyHome is a powerful and flexible network file storage solution that allows you to set up your own local server on your network for seamless file management and storage across your devices. With SkyHome, you can take control of your data and enjoy secure, accessible file storage within your home network.

## Table of Contents

- [Pre-requisites](#pre-requisites)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)

<h2 id="pre-requisites">Pre-requisites</h2>

- [Node.js](https://nodejs.org/en/) (>= v18.15.0)

<h2 id="installation">Installation</h2>

1. Clone the repository:

```bash
git clone https://github.com/MrKrrot/skyhome.git
```

2. Install dependencies:

```bash
npm run install # Install server & client dependencies
```

3. Set up environment variables:

   - In the `api` folder, create a `.env` file and provide the following environment variables:

   | Variable             | Description                                          |
   | -------------------- | ---------------------------------------------------- |
   | `DB_URI`             | MongoDB database URI                                 |
   | `JWT_ACCESS_SECRET`  | Secret key for JWT access token generation           |
   | `JWT_REFRESH_SECRET` | Secret key for JWT refresh token generation          |
   | `NODE_ENV`           | Environment mode (`development`, `production`, etc.) |
   | `PORT`               | Port number for the API server (e.g., `5000`)        |

   - In the `client` folder, create a `.env` file and provide the following environment variable:

   | Variable        | Description                               |
   | --------------- | ----------------------------------------- |
   | `REACT_API_URL` | API URL for the client-server interaction |

<h2 id="usage">Usage</h2>

```bash
# Build client & server
npm run build:client
npm run build:server
# Run server & client (production mode)
npm run start:server
npm run start:client
```

<h2 id="development">Development</h2>

```bash
# Run server & client (development mode)
npm run dev:server
npm run dev:client
```
