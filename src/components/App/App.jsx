import { useEffect, useState } from 'react';

function getTask() { // function getTask() will return the tasks from /tasks route, and return them in json format
  return fetch('/todo')
    .then(response => response.json())
    .catch((error) => {
      console.error(error);
    });
} //end getTask

function addTask(task) {
  return fetch('/todo', {
    method: 'POST',
    body: JSON.stringify(task),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => {
      if (response.status !== 201) {
        throw new Error('Bad status');
      }
    });
}//end addTask

function App() {
  const [taskList, setTaskList] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskStatus, setTaskStatus] = useState(false);
  const [taskDescription, setTaskDescription] = useState('');

  //on lead, call getTask function
  useEffect(() => {
    console.log('Fetching task');
    getTask().then(tasks => setTaskList(tasks));
  }, []);//end useEffect

  const handleAddTask = (event) => { //arrow function sets copmonent fields to be empty
    event.preventDefault();
    setTaskName('');
    setTaskStatus('');
    setTaskDescription('');

    addTask({ taskName: taskName, taskStatus: taskStatus, taskDescription: taskDescription }).then(() => {
      getTask().then(setTaskList);
    });
  }; //end handleTask

  const updateTask = (event) => { //arrow function which takes the value of the user's input
    setTaskName(event.target.value);
  };//end updateTask

  const updateTaskStatus = (event) => {
    setTaskStatus(event.target.value);
  };//end updateTaskStatus

  const udpateTaskDescription = (event) => {
    setTaskDescription(event.target.value);
  };//end updateTaskDescription

  //fetch list of tasks from the server
  return (
    <div>
      <div>
        <h1>TO DO APP</h1>
      </div>
      <section className="new-task-section">
        <form onSubmit={handleAddTask}>
          <label htmlForm="task-input">Task</label>
          <input type="text" placeholder='task' value={taskName} onChange={(updateTask)} />
          <label htmlForm="status-input">Status</label>
          <input type="text" placeholder='status' value={taskStatus} onChange={(updateTaskStatus)} />
          <label htmlForm="desc-input">Description</label>
          <input type="text" placeholder='description' value={taskDescription} onChange={(udpateTaskDescription)} />
          <ipnut id="desc-input" onChange={event => setTaskDescription(event.target.value)} />
          <button type="submit">add task</button>
        </form>
        <ul>
          {taskList.map((task, i) => (
            <li key={i}>
              {task.taskName}, {task.taskStatus}, {task.taskDescription}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App


//put boolean straight in dom. after, needa  conditional for if completed if else display not completed. you get into a litttle bit of a new spot when doing stuff int eh return statement, bc it's all one expression, one big long value which is being returned together, which means tyou can't do an if block in the middle of it. coan't use if else in the jsx blob. 1) could have variable before like the stirng and use if ilse to ch. 2) or ternary diff is ternary is a value: it can go directly in a jsx