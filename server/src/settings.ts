export const PORT = 8080
export const CONN_STRING = `postgres://${process.env["POSTGRES_USER"]}:${process.env["POSTGRES_PASSWORD"]}@${process.env["POSTGRES_HOST"]}/${process.env["POSTGRES_DB"]}`

