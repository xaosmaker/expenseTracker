import path from "path"
import fs from "fs/promises"
import { CONN_STRING } from "./settings.js"
import { Client } from "pg"



const __dir = import.meta.dirname

const migrationDir = path.join(__dir, "../", "migrations")


const client = new Client({
  connectionString: CONN_STRING
})



// i name it dirOrder is the dir of migrations
async function makeMigrations(dirOrder: string[]) {
  const schemaToApply = dirOrder.map(dir => {
    return {
      dirName: dir,
      dirPath: path.join(__dir, dir)
    }
  })


  client.connect()
  const schema = path.join(migrationDir, "schema.sql")

  const file = await fs.readFile(schema)
  await client.query(file.toString())
  client.end()





  console.log(schemaToApply);









}


await makeMigrations(["users"])




