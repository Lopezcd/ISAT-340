const knex = require("knex");
const svc = require("feathers-knex");
import { app } from "./feathers.service";

// connect to the DB
const db = knex({
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "../httc.sqlite3"
  },
  debug: true
});

// create your schema
// unnecessary?
// db.schema.createTable("courses", tbl => {
//   tbl.string("code");
//   tbl.string("title");
//   tbl.string("difficulty");
// });

// tell the feathers app to use it
app.use("/courses", svc({
  Model: db,
  name: "courses",
  id: "code"
}));

export const courses = app.service("courses");

courses.find({}).then(
  crs => {
    console.log(crs);
  }
);