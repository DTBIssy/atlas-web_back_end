import express from "express"
import http from "node:http"
import { promisify } from "node:util"
import * as fs from "node:fs"

const app = express()
const port = 1245

const readFileAsync = promisify(fs.readFile)

export async function countStudents(path) {
    return new Promise((resolve, reject) => {
        let CS_students = {
            "CS" : 0,
            "List" : []
        }
        let SWE_students = {
            "SWE" : 0,
            "List" : []
        }
        readFileAsync(path, 'utf-8', (err, data) => {
            if (err){
                reject(new Error('Cannot load the database'))
                return;
        };
            const lines = data.split('\n')
            const students = lines.slice(1)
            // Minus the header and Null
            const n_o_s = lines.length - 2
            students.forEach(student => {
                if (student.includes('CS')) {
                    CS_students["CS"]++;
                    let sum = student.split(",")
                    CS_students["List"].push(" " + sum[0])
                }
                if (student.includes('SWE')) {
                    SWE_students["SWE"]++;
                    let sum = student.split(",")
                    SWE_students["List"].push(" " + sum[0])
                }
            });
            resolve((`NUmber of students: ${(n_o_s)}
        \rNumber of students in CS: ${CS_students["CS"]}. List: ${CS_students["List"]}
        \rNumber of students in SWE: ${SWE_students["SWE"]}. List: ${SWE_students["List"]}`)
        )})
    })
}

app.get("/", (req, res) => {
    res.end("Hello Holberton School")
}).listen(port)

app.get("/students", async (req,res) => {
    const database = process.argv[2]
    const results = await countStudents(database)
    res.end(`This is the list of students\n${results}`)
})
