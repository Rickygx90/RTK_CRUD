import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
	tasks: [],
	isLoading: true,
	error: null,
}

// First, create the thunk
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
	const res = await fetch('http://localhost:3000/api/tasks', {
		method: 'GET',
	})
	const resData = await res.json()
	return resData
})

export const taskSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, action) => {
			console.log(action.payload)
			fetch('http://localhost:3000/api/tasks', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(action.payload),
			})
		},
		deleteTask: (state, action) => {
			fetch(`http://localhost:3000/api/tasks/${action.payload}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
			})
		},
		editeTask: (state, action) => {
			fetch(`http://localhost:3000/api/tasks/${action.payload}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(action.payload),
			})
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTasks.pending, (state) => {
				console.log('extraReducers pending')
				state.isLoading = true
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				console.log('extraReducers fulfilled')

				state.tasks = action.payload
				state.isLoading = false
				state.error = null
			})
			.addCase(fetchTasks.rejected, (state, action) => {
				console.log('extraReducers rejected')
				console.log(action)
				state.isLoading = false
				state.error = action.error
			})
	},
})

export const { addTask, deleteTask, editeTask } = taskSlice.actions

export default taskSlice.reducer
