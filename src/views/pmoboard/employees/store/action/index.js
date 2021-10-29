import axiosN from '@src/utility/axios'
import axios from 'axios'

// Get all employees
export const getEmployees = (params) => {
  return async dispatch => {
    await axiosN.get('/resource/getListEmployee', params).then(response => {
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
    await axiosN.get('/resource/getListEmployeeSkill').then(response => {
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
    await axiosN.get('/resource/getListEmployeeRole').then(response => {
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
  return async (dispatch, getState) => {
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


// ** Get all Data
export const getAllData = () => {
  return async dispatch => {
    await axios.get('/api/users/list/all-data').then(response => {
      dispatch({
        type: 'GET_ALL_DATA',
        data: response.data
      })
    })
  }
}

// ** Get data on page or row change
export const getData = params => {
  return async dispatch => {
    await axios.get('/api/users/list/data', params).then(response => {
      dispatch({
        type: 'GET_DATA',
        data: response.data.users,
        totalPages: response.data.total,
        params
      })
    })
  }
}

export const resetEmployee = () => ({
  type: 'GET_EMPLOYEE',
  selectedEmployee: null
})
