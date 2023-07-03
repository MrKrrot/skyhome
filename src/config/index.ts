import 'dotenv/config'

const {
  DB_URI: C_DB_URI,
  DB_URI_TEST: C_DB_URI_TEST,
  JWT_ACCESS_SECRET: C_JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: C_JWT_REFRESH_SECRET,
  NODE_ENV: C_NODE_ENV,
  PORT: C_PORT
} = process.env

const ensureEnv = (env: string | undefined, name: string) => {
  if (!env) throw new Error(`${name} env is not defined`)

  return env
}

const DB_URI = ensureEnv(C_DB_URI, 'DB_URI')
const DB_URI_TEST = ensureEnv(C_DB_URI_TEST, 'DB_URI_TEST')
const JWT_ACCESS_SECRET = ensureEnv(C_JWT_ACCESS_SECRET, 'JWT_ACCESS_SECRET')
const JWT_REFRESH_SECRET = ensureEnv(C_JWT_REFRESH_SECRET, 'JWT_REFRESH_SECRET')
const NODE_ENV = ensureEnv(C_NODE_ENV, 'NODE_ENV')
const PORT = ensureEnv(C_PORT, 'PORT')

export { PORT, NODE_ENV, DB_URI, DB_URI_TEST, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET }
