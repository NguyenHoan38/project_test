import axios from '@src/utility/axios'
import keyBy from 'lodash.keyby'
import { ToastContainer, toast } from 'react-toastify'

// Chưa có API
const statusOptions = [
  { value: 1, label: 'Active' },
  { value: 2, label: 'Inactive' },
  { value: 3, label: 'Onboarding' },
  { value: 4, label: 'Off Board' }
]

// Get employee details
export const getEmployeeDetails = (params) => async (dispatch) => {
  try {
    const [employees, skills, roles] = await Promise.all([
      axios.post('/resource/getListEmployee', params),
      axios.get('/resource/getListEmployeeSkill'),
      axios.get('/resource/getListEmployeeRole')
    ])

    dispatch({
      type: 'GET_EMPLOYEE_DETAILS',
      payload: {
        byId: keyBy(employees.data, 'id'),
        allIds: Object.keys(employees.data),
        total: employees.data.length,
        skills: keyBy(skills.data, 'id'),
        roles: roles.data
      }
    })
  } catch (error) {
    console.log(error)
  }
}

export const updateEmployee = (params) => async (dispatch) => {
  try {
    const { status, roles, location, dob, skills, ...rest } = params
    const employee = {
      ...rest,
      status: status.value,
      roles: roles.map(({ value }) => value),
      location: location.value,
      dob: dob.toISOString(),
      skills: skills.map(({ skillId, levelSkillId }) => ({
        skillId,
        levelSkillId
      }))
    }

    const employeeUpdated = {
      ...rest,
      statusDetail: {
        id: status.value,
        name: status.label
      },
      roles: roles.map(({ value, label }) => ({
        empRoleId: value,
        empRoleName: label
      })),
      locationDetail: {
        id: location.value,
        name: location.label
      },
      dob: dob.toISOString(),
      skills
    }

    const result = await axios.post('/resource/editEmployee', employee)
    toast('Employee updated successfully')
    console.log(result)

    dispatch({
      type: 'SET_EMPLOYEE_DETAILS',
      payload: employeeUpdated
    })
  } catch (error) {
    console.log(error)
  }
}

// ** Get employees with filter
export const getFilteredEmployees = (params) => {
  const { searchTerm = '', perPage = 10, page = 1, skills = [] } = params
  return async (dispatch, getState) => {
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
            return skills.includes(String(skillId)) // Tạm thời
          })
        : true

      return (nameMatched || emailMatched) && skillsMatched
    })

    dispatch({
      type: 'GET_FILTERED_EMPLOYEES',
      data: filteredEmployees,
      total: filteredEmployees.length
    })
  }
}
