import './App.css'
import { TaskForm } from './Components/TaskForm'
import { TasksList } from './Components/TasksList'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
	{
		path: '/',
		element: <TasksList />,
		errorElement: <div>ERROR</div>,
	},
	{
		path: '/create-task',
		element: <TaskForm />,
	},
	{
		path: '/edit-task/:id',
		element: <TaskForm />,
	},
])

function App() {
	return (
		<div className='bg-zinc-900 h-screen text-white'>
			<div className='flex items-center justify-center h-full'>
				<RouterProvider router={router} />
			</div>
		</div>
	)
}

export default App
