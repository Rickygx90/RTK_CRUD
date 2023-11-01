import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addTask, editeTask } from '../features/tasks/taskSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

export const TaskForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	let params = useParams()

	useEffect(() => {
		if (params.id) {
			const fetchTaskById = async () => {
				const res = await fetch(
					`http://localhost:3000/api/tasks/${params.id}`,
					{
						method: 'GET',
					}
				)
				const data = await res.json()
				setValue('title', data.title)
				setValue('description', data.description)
				setValue('complete', data.complete)
			}
			fetchTaskById()
		}
	}, [params.id, setValue])

	const onSubmit = (data) => {
		if (params.id) {
			dispatch(editeTask({ ...data, id: params.id }))
		} else {
			dispatch(addTask({ ...data }))
		}
		navigate('/')
	}

	return (
		<div>
			{params.id ? <h2>Edit Task</h2> : <h2>Create Task</h2>}

			<form
				className='bg-zinc-800 max-w-sm p-4'
				onSubmit={handleSubmit(onSubmit)}
			>
				<label className='block text-sm font-bold'>Task:</label>
				<input
					className='w-full p-2 rounded-md bg-zinc-600 mb-2'
					placeholder='Write a title'
					autoFocus
					{...register('title', { required: true })}
				/>
				{errors.title && <span>This field is required</span>}
				<label className='block text-sm font-bold'>Description:</label>
				<textarea
					className='w-full p-2 rounded-md bg-zinc-600 mb-2'
					placeholder='Write a description'
					{...register('description', { required: true })}
				></textarea>
				{errors.description && <span>This field is required</span>}

				<label className='block text-sm font-bold'>Complete:</label>
				<input
					className='w-full p-2 rounded-md bg-zinc-600 mb-2'
					type='checkbox'
					{...register('complete')}
				></input>
				<br />
				<input className='bg-indigo-600 px-2 py-1' type='submit' />
			</form>
		</div>
	)
}
