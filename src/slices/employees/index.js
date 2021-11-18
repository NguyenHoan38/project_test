import { createSlice } from '@reduxjs/toolkit'
import {
  editEmployee,
  getEmployeeDetails,
  getFilteredEmployees,
  addEmployee
} from './thunk'

const initialState = {
  byId: {},
  allIds: [],
  data: [],
  total: 1,
  params: {},
  skills: {},
  roles: [],
  pending: false
}

const employees = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeDetails.fulfilled, (state, action) => {
        const { byId, allIds, total, skills, roles } = action.payload
        state.byId = byId
        state.allIds = allIds
        state.total = total
        state.skills = skills
        state.roles = roles
      })
      .addCase(getFilteredEmployees.fulfilled, (state, action) => {
        const { data, total } = action.payload
        state.data = data
        state.total = total
      })
      .addDefaultCase((state) => state)
  }
})

export default employees.reducer
