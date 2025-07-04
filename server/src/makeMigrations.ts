//TODO: refactor this later
// and make more validations like db users and users db to see if files exist
// and create a hash and refactor
import path from "path"
import fs from "fs/promises"
import { Client } from "pg"
import { CONN_STRING } from "./settings.js"

interface MigrationModuleInfo {
  tableName: string
  modulePath: string
  moduleFiles: string[]
}

const SCHEMA_NAME = "expense_schema"
const __dir = import.meta.dirname
const migrationDir = path.join(__dir, "../", "migrations")

const client = new Client({
  connectionString: CONN_STRING
})

async function createMigrationsSchema() {
  await client.query(`CREATE SCHEMA IF NOT EXISTS ${SCHEMA_NAME};`)


}
async function generateSchemaTables(modules: MigrationModuleInfo[]) {
  for (const module of modules) {

    await client.query(`CREATE TABLE IF NOT EXISTS ${SCHEMA_NAME}.${module.tableName}(
id BIGINT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
file_name varchar(50) NOT NULL UNIQUE
);`)

  }

}
function inOrder(arr: string[]) {
  const newArr = arr.map(str => str.split("_")[0])

  let val = 1

  for (const num of newArr) {
    if (Number(num) !== val) {
      throw new Error("no order detected")
    }
    val++
  }

}


async function checkModuleExistsAndFollowConvenction(migrationsModules: string[]) {
  const modules: MigrationModuleInfo[] = []
  for (const module of migrationsModules) {
    const mpath = path.join(migrationDir, module)
    try {

      await fs.access(mpath)
    } catch {
      throw new Error(`cant found ${module} on path:${migrationDir}`)
    }
    const migModules = await fs.readdir(mpath)
    if (migModules.length < 1) {
      throw new Error("Empty migrations dir")
    }
    migModules.map(mod => {
      if (mod.split("_")[0]?.length !== 4 && mod.endsWith("sql")) {
        throw new Error("module dont follow the convention XXXX_name.sql")
      }
    })
    migModules.sort((a: string, b: string) => {
      const aPrefix = a.split("_")[0]
      const bPrefix = b.split("_")[0]
      return Number(aPrefix) - Number(bPrefix)
    }
    )
    inOrder(migModules)



    modules.push({ tableName: `${module}_schema`, modulePath: mpath, moduleFiles: migModules })

  }
  return modules

}

function uniqueMigrationModules(migrationModules: MigrationModuleInfo[]) {
  for (const module of migrationModules) {
    const mod = module.moduleFiles.map(name => name.split("_")[0])
    const newSet = new Set(mod)
    if (newSet.size !== mod.length) {
      throw new Error(`there is dublicate file in the ${module.modulePath}`)
    }

  }
}

async function filterAndApplySchemas(migrationsModules: MigrationModuleInfo[]) {

  for (const module of migrationsModules) {
    const { rows } = await client.query(`SELECT * FROM ${SCHEMA_NAME}.${module.tableName}`)
    for (const row of rows) {
      module.moduleFiles = module.moduleFiles.filter(mod => mod !== row.file_name)
    }
  }
  for (const module of migrationsModules) {
    for (const mig of module.moduleFiles) {
      const file = await fs.readFile(path.join(module.modulePath, mig), "utf-8")
      console.log(file);
      await client.query(file)
      await client.query(`INSERT INTO ${SCHEMA_NAME}.${module.tableName}(file_name) 
VALUES ($1);`, [mig])
    }
  }
}


async function makeMigrations(migrationsModuleOrder: string[]) {
  if (migrationsModuleOrder.length < 1) {
    throw new Error("No migrations found")
  }

  client.connect()
  //1. create the schema for migrations
  await createMigrationsSchema()

  //2. check module exists and follow convenctions and not empty
  const migrationModules = await checkModuleExistsAndFollowConvenction(migrationsModuleOrder)

  //3. validate the modules is unique
  uniqueMigrationModules(migrationModules)


  //4. generate schemaTables
  await generateSchemaTables(migrationModules)



  //5. query the db for existing migrations
  //6 apply the non existing migrations
  await filterAndApplySchemas(migrationModules)

  console.log(migrationModules);

  client.end()

}


makeMigrations(["users", "payments"])



