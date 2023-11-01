import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, fetchTasks } from '../features/tasks/taskSlice'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export const TasksList = () => {
	const { tasks, isLoading, error } = useSelector((state) => state.tasks)
	console.log(tasks)
	const dispatch = useDispatch()

	const handleDelete = (id) => {
		dispatch(deleteTask(id))
		dispatch(fetchTasks())
	}

	useEffect(() => {
		dispatch(fetchTasks())
	}, [dispatch])

	if (isLoading) {
		return (
			<div className='w-4/6'>
				<p>LOADING...</p>
			</div>
		)
	}

	if (error) {
		return (
			<div className='w-4/6'>
				<p>{error.message}</p>
			</div>
		)
	}

	return (
		<div className='w-4/6'>
			<header className='flex justify-between items-center py-4'>
				<h1>Tasks {tasks && tasks.length}</h1>
				<Link
					to={'/create-task'}
					className='bg-indigo-600 px-2 py-1 rounded-sm text-sm shadow-sm'
				>
					Create Task
				</Link>
			</header>
			<div className='grid grid-cols-3 gap-3'>
				{tasks &&
					tasks.length > 0 &&
					tasks.map((task) => (
						<div className='bg-neutral-800 p-4 rounded-md' key={task.id}>
							<header className='flex justify-between'>
								<h3>{task.title}</h3>
								<div className='flex gap-x-2'>
									<Link
										className='bg-zinc-600 px-2 py-1 text-xs rounded-md self-center'
										to={`/edit-task/${task.id}`}
									>
										Edit
									</Link>
									<button
										className='bg-red-500 px-2 py-1 text-xs rounded-md'
										onClick={() => handleDelete(task.id)}
									>
										Delete
									</button>
								</div>
							</header>
							<p>{task.description}</p>
							<p>
								{task.complete ? (
									<strong>Complete</strong>
								) : (
									<strong>Incomplete</strong>
								)}
							</p>
							<p className='text-xs text-slate-400'>{task.id}</p>
						</div>
					))}
			</div>
		</div>
	)
}
