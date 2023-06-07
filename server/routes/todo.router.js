const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    let query = 'SELECT * FROM "tasks";';
    pool.query(query)
        .then((result) => {
            res.status(200).send(result.rows);
        })
        .catch((error) => {
            console.log('Error with request', error);
            alert('Something went wrong');
        });
});

// POST
router.post('/', (req, res) => {
    //TODO look up object destructuring
    //const {taskName, taskStatus, taskDescription} = req.body; <- pulls out key names and sets them as variables IOT write code better. 21, 29 preferred. which are syn w 23 & 28
    console.log(req.body);
    let newTask = req.body;
    const queryText = `
    INSERT INTO "tasks" ("task", "status", "description")
    VALUES ($1, $2, $3);`;
    // pool.query(queryText, [newTask.taskName, newTask.status, newTask.description])
    pool.query(queryText, [newTask.taskName, newTask.taskStatus, newTask.taskDescription])
    //pool.query(queryText, [taskName, taskStatus, taskDescription])

        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`Error making query ${queryText}`, err);
            res.sendStatus(500);
        });
})
// PUT
router.put('/:id', (req, res) => {
    let taskId = req.params.id;
    console.log(req.body.description);
    let description = req.body.description;
    let sqlText = '';
    sqlText = `UPDATE "tasks" SET "description" = '${description}' WHERE id = '${taskId};`;

    pool.query(sqlText)
        .then((dbRsponse) => {
            res.send(dbRsponse.rows);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

// DELETE
router.delete('/:id', (req, res) => {
    let deleteTask = req.params.id; //it's not req.body.id it's req.params (anything with /:id => req.params.id  or req.params.taco or req.params.name)
    console.log('Delete task for id', deleteTask);
    let sqlText = `DELETE FROM tasks WHERE id=${deleteTask}`;
    pool.query(sqlText)

        .then((result) => {
            console.log('task deleted');
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        })
})

module.exports = router;
