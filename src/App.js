import React, { useState } from 'react';

import shortid from 'shortid';

function App() {
  const [task, setTask] = useState('')
  const [listTask, setListTask] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [taskId, setTaskId] = useState('')
  const addTask = (e) => {
    e.preventDefault();
    if(!task.trim()){
      console.log("Debes ingresar la tarea")
      return
    }
    console.log("La tarea es: ", task)
    setListTask([
      {
        task: task,
        id: shortid.generate()
      },
      ...listTask
    ])
    setTask('');
    e.target.reset();
  }

  const deleteTask = (id) => {

    let new_data = listTask.filter( item => {
      return (
        item.id !== id 
      )
    })

    setListTask(
      new_data
    )

  }

  const editTask = (task) => {
    setEditMode(true)
    setTask(task.task)
    setTaskId(task.id)
  }

  const updateTask = (e) => {
    e.preventDefault();
    if(!task.trim()){
      console.log("Debes ingresar la tarea")
      return
    }
    console.log("La tarea es: ", task)
    const newListTask = listTask.map(
      item => (
        item.id === taskId ? {id: item.id , task } : item
      )
    )
    setListTask(newListTask)
    setTask('');
    setTaskId('')
    setEditMode(false)
    e.target.reset();
  }

  return (
    <div className="container">
      <h1>CRUD Simple</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">
            {listTask.length > 0 &&
              listTask.map( item => {
                return (
                  <li className="list-group-item" key={ item.id }>
                    <span className="lead">
                      { item.task }
                    </span>
                    <button 
                      className="btn btn-sm btn-danger float-right mx-2"
                      onClick={ () => deleteTask(item.id) }
                    >
                      Eliminar
                    </button>
                    <button 
                      className="btn btn-sm btn-warning float-right"
                      onClick={ () => editTask(item) }
                    >
                      Editar
                    </button>
                  </li>
                )
              })
            }
            {
              listTask.length <= 0 && 
              <div className="alert alert-warning">
                No hay tareas pendientes
              </div>
            }
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {editMode ? 'Editar Tarea' : 'Agregar Tarea' }
          </h4>
          <form onSubmit={ editMode ? updateTask : addTask } >
            <input 
              type="text" 
              className="form-control mb-2"
              placeholder="Ingrese Tarea"
              onChange={ (e) => setTask(e.target.value) }
              value={ task }
            />
            {
              editMode ? (
                <button className="btn btn-warning btn-block" type="submit">
                  Editar
                </button>
              ) : (
                <button className="btn btn-dark btn-block" type="submit">
                  Agregar
                </button>
              )
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
