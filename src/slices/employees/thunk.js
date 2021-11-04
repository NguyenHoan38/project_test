import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '@src/utility/axios'
import keyBy from 'lodash.keyby'
import { toast } from 'react-toastify'

const getEmployeeDetails = createAsyncThunk(
  'employees/extra/getEmployeeDetails',
  async (params) => {
    const [employees, skills, roles] = await Promise.all([
      axios.post('/resource/getListEmployee', params),
      axios.get('/resource/getListEmployeeSkill'),
      axios.get('/resource/getListEmployeeRole')
    ])

    return {
      byId: keyBy(employees.data, 'id'),
      allIds: Object.keys(employees.data),
      total: employees.data.length,
      skills: keyBy(skills.data, 'id'),
      roles: roles.data
    }
  }
)

const editEmployee = createAsyncThunk(
  'employees/extra/editEmployee',
  async (params) => {
    const { statusDetail, roles, locationDetail, skills, ...rest } = params

    const employee = {
      ...rest,
      status: statusDetail.id,
      roles: roles.map(({ id }) => id),
      location: locationDetail.id,
      skills: skills.map(({ skillId, levelSkillId }) => ({
        skillId,
        levelSkillId
      }))
    }

    // console.log(JSON.stringify(employee, null, 2))

    const { success } = await axios.post('/resource/editEmployee', employee)
    if (success) {
      toast('Employee updated successfully')
    }
    return params
  }
)

const addEmployee = createAsyncThunk(
  'employees/extra/addEmployee',
  async (params) => {
    const { statusDetail, roles, locationDetail, skills, ...rest } = params

    const employee = {
      ...rest,
      status: statusDetail.id,
      roles: roles.map(({ id }) => id),
      location: locationDetail.id,
      skills: skills.map(({ skillId, levelSkillId }) => ({
        skillId,
        levelSkillId
      }))
    }

    const { success, data } = await axios.post(
      '/resource/addEmployee',
      employee
    )

    const { empId } = data

    if (success) {
      toast('Employee added successfully')
      return { ...params, id: empId, projects: [] }
    }

    return null
  }
)

const getFilteredEmployees = createAsyncThunk(
  'employees/extra/getFilteredEmployees',
  async (params, { getState }) => {
    const { searchTerm = '', skills = [] } = params
    const employees = Object.values(getState().employees.byId)

    const filteredEmployees = employees.filter((user) => {
      const { name, skills: userSkills, email } = user
      const searchTermFormatted = searchTerm.toLowerCase()

      // Search for name
      const nameMatched = name.toLowerCase().includes(searchTermFormatted)

      // Search for email
      const emailMatched = email.toLowerCase().includes(searchTermFormatted)

      // Search for skills
      const skillsMatched = skills.length
        ? userSkills.some((skill) => {
            const { skillId } = skill
            return skills.includes(skillId)
          })
        : true

      return (nameMatched || emailMatched) && skillsMatched
    })

    return {
      data: filteredEmployees,
      total: filteredEmployees.length
    }
  }
)

export { getEmployeeDetails, editEmployee, getFilteredEmployees, addEmployee }
