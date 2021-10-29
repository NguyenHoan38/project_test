import axios from '@src/utility/axios'

// Get all employees
export const getEmployees = (params) => {
  return async dispatch => {
    await axios.get('/resource/getListEmployee', params).then(response => {
      dispatch({
        type: 'GET_EMPLOYEES',
        allData: response.data,
        total: response.data.length
      })
    }).catch((error) => {
      console.log(error)
    })
  }
}


// Get employees skills
export const getEmployeeSkills = () => {
  return async dispatch => {
    await axios.get('/resource/getListEmployeeSkill').then(response => {
      dispatch({
        type: 'GET_EMPLOYEE_SKILLS',
        skills: response
      })
    }).catch((error) => {
      console.log(error)
    })
  }
}

// Get employees roles
export const getEmployeeRoles = () => {
  return async dispatch => {
    await axios.get('/resource/getListEmployeeRole').then(response => {
      dispatch({
        type: 'GET_EMPLOYEE_ROLES',
        roles: response
      })
    }).catch((error) => {
      console.log(error)
    })
  }
}

// ** Get Employee
export const getEmployee = employeeId => {
  return (dispatch, getState) => {
    const employees = getState().employees.allData
    const employee = employees.find(({ id }) => employeeId === id)
    dispatch({
      type: 'GET_EMPLOYEE',
      selectedEmployee: employee
    })
  }
}

// ** Get data with filter
export const getFilteredEmployees = params => {
  const { searchTerm = '', perPage = 10, page = 1, skills = [] } = params
  return async (dispatch, getState) => {
    const employees = getState().employees.allData
    const filteredEmployees = employees.filter((user) => {
      const { name, skills: userSkills, email } = user
      const nameMatched = name.toLowerCase().includes(searchTerm.toLowerCase())
      const skillsMatched = skills.length ? userSkills.some(({ skillId }) => skills.includes(skillId)) : true
      const emailMatched = email.toLowerCase().includes(searchTerm.toLowerCase())
      return (nameMatched || emailMatched) && skillsMatched
    })
    dispatch({
      type: 'GET_FILTERED_EMPLOYEES',
      data: filteredEmployees,
      total: filteredEmployees.length
    })
  }
}

export const resetEmployee = () => ({
  type: 'GET_EMPLOYEE',
  selectedEmployee: null
})
