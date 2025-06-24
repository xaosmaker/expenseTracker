import { Pool } from "pg";
import { CONN_STRING } from "../settings.js";

export const pool = new Pool({
  connectionString: CONN_STRING
})
