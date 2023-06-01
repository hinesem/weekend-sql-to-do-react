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
router.post('/', (reg, res) => {
    const newTask = req.body;
    const queryText = `
    INSERT INTO "tasks" ("task", "status", "description")
    VALUES ($1, $2, $3);`;
    pool.query(queryText, [newTask.task, newTask.status, newTask.description])

        .then((resutl) => {
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
    let deleteTask = req.body.id;
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
