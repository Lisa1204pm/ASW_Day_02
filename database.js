const mysql = require("mysql2")
const dotenv = require("dotenv")
dotenv.config()

const pool = mysql
  .createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT || 3305,
  })
  .promise()

  async function getNotes(){
    let query = `
    SELECT * 
    FROM notes
    `
  
    const [rows] = await pool.query(query)
    return rows
    // if (!searchTerm){
    //   return notes
    // }
    // return notes.filter(note => note.title.includes(searchTerm) || note.contents.includes(searchTerm))
  }
  exports.getNotes = getNotes

  async function getNote(id){
    let query = `
    SELECT * 
    FROM notes
    WHERE id = ?
    `

    const [rows] = await pool.query(query, [id])
    return rows[0]
  }
  exports.getNote = getNote

  async function addNote(note){
    const [result] = await pool.query(`
    INSERT INTO notes (title, contents)
    VALUES (?, ?)
    `, [note.title, note.contents])
    return result
  }
  exports.addNote = addNote

  async function deleteNote(id){
    const [result] = await pool.query(`
    DELETE FROM notes
    WHERE id = ?
    `, [id])
    return result
  }
  exports.deleteNote = deleteNote