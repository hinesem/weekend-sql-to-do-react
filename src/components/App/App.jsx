import { useEffect, useState } from 'react';
import './App.css';





function App() {
  const [taskList, setTaskList] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskStatus, setTaskStatus] = useState(false);
  const [taskDescription, setTaskDescription] = useState('');

  //on lead, call getTask function
  useEffect(() => {
    console.log('Fetching task');
    getTask().then(tasks => {
      console.log(tasks)
      setTaskList(tasks)
    });
  }, []);//end useEffect

  function getTask() { // function getTask() will return the tasks from /tasks route, and return them in json format
    return fetch('/todo')
      .then(response => response.json())
      .catch((error) => {
        console.error(error);
      });
  } //end getTask

  function addTask(task) {
    console.log(task);
    return fetch('/todo', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      console.log(response);
    })
      .catch((error) => {
        console.error(error);
      });
  }//end addTask

  function deleteTask(id) {
    return fetch(`/todo/${id}`, {
      method: 'DELETE'
    }).then((response) => {
      console.log(response);
      getTask().then(tasks => {
        console.log(tasks)
        setTaskList(tasks)
      });
    }).catch((error) => {
      console.error(error);
    })
  }

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
          <input type="text" placeholder='task' value={taskName} onChange={updateTask} />
          <label htmlFor="status-input">Status</label>
          <input type="text" placeholder='status' value={taskStatus} onChange={updateTaskStatus} />
          <label htmlFor="desc-input">Description</label>
          <input type="text" placeholder='description' value={taskDescription} onChange={udpateTaskDescription} />
          <button type="submit">add task</button>
        </form>
        <ul>
          {taskList.map((task, i) => {
            return (

              <li key={task.id}>
                {task.status ? <span className="taskComplete">DONE</span> : <span className="taskIncomplete">INCOMPLETE</span>}{' '}
                {task.id} {task.task} {task.status} {task.description} {/* render what I get back from DB, not related to components. Name, and not taskName. task.task -> structuring to my BD table */}
                <button type="button" onClick={() => editTask(task.id)}>edit</button>
                <button type="button" onClick={() => deleteTask(task.id)}>delete task</button>
                <button>mark as complete</button>

              </li>)
          })}
        </ul>
      </section>
    </div>
  );
} //end App() function

export default App


//put boolean straight in dom. after, needa  conditional for if completed if else display not completed. you get into a litttle bit of a new spot when doing stuff int eh return statement, bc it's all one expression, one big long value which is being returned together, which means tyou can't do an if block in the middle of it. coan't use if else in the jsx blob. 1) could have variable before like the stirng and use if ilse to ch. 2) or ternary diff is ternary is a value: it can go directly in a jsx

