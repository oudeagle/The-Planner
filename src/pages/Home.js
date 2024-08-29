import React, { useState, useEffect } from 'react'
import { Fab } from '@mui/material'
import TaskModal from '../Components/Modal'
import AddIcon from '@mui/icons-material/Add'
import '../App.css'

export function Home() {
  var [tasks, setTasks] = useState([])


  function label_for_check(id) {
    const labels = document.getElementsByTagName('label')
    for (let index = 0; index < labels.length; index++) {
      if (labels[index].htmlFor == id)
        return labels[index]
    }
    return null
  }

  function checked(item) {
    const checkbox = document.getElementById(item.id)
    if (checkbox.checked == true) {
      let label = label_for_check(item.id)
      label.className += " line-through"
      fetch('http://localhost:2000/checked', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: item.name })
      })
        .then(response => {
          if (!response.ok)
            console.log("Failed to Check Task");
          return response.json()
        })
      window.location.reload()
    }
    else {
      let label = label_for_check(item.id)
      label.className = "px-2 text-white"
    }
  }

  const [open, setOpen] = useState(false);

  const handleAddTask = (taskName) => {
    fetch('http://localhost:2000/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: taskName })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to add task")
        }
        return response.json()
      })
      .then(() => {
        const newTask = { id: `task${tasks.length + 1}`, name: taskName };
        setTasks(prevTasks => [...prevTasks, newTask]);
      })
      .catch(error => console.error("Error: ", error))
  }

  useEffect(() => {
    fetch('http://localhost:2000')
      .then(response => response.json())
      .then(data => {
        const newTasks = data.map((item, index) => ({
          id: `task${tasks.length + index + 1}`,
          name: item.name,
          completed: item.completed
        }))
        setTasks(newTasks)
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);


  return (
    <>
      <h1 className="text-3xl font-bold text-center py-4">The Planner</h1>
      <div className='flex flex-wrap justify-around items-center py-3'>
        <a href='/' className='hover:text-orange-800 font-semibold'>Current Tasks</a>
        <a href='/Completed' className='hover:text-green-800 font-semibold'>Completed Tasks</a>
      </div>
      <div className='container mx-auto px-4 items-center py-20 my-10 bg-gradient-to-b from-purple-300 to-purple-800 rounded-md'>
        <h2 className='text-xl font-bold py-5 ml-10'>Tasks:</h2>
        <div className='tasks-grid'>
          {tasks.map((item) => (
            <>
              <div className='container rounded w-60 h-20 bg-gray-700 shadow-lg mx-auto m-7 p-5 flex items-center justify-center'>
                <input type='checkbox' id={item.id} key={item.id} className='' onClick={() => checked(item)}></input>
                <label htmlFor={item.id} className='px-2 text-white'>{item.name}</label>
              </div>
            </>
          ))}
        </div>
        <Fab color='primary' aria-label='add' onClick={() => setOpen(true)} style={{ position: 'fixed', bottom: 20, right: 20 }}>
          <AddIcon />
        </Fab>
        <TaskModal open={open} onClose={() => setOpen(false)} onAddTask={handleAddTask} />
      </div>
    </>
  )
}
