// import axios from '@src/utility/axios'
import axios from 'axios'

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

// ** Get User
export const getEmployee = id => {
  return async dispatch => {
    await axios
      .get('/api/users/user', { id })
      .then(response => {
        dispatch({
          type: 'GET_EMPLOYEE',
          selectedEmployee: response.data.user
        })
      })
      .catch(err => console.log(err))
  }
}

export const resetEmployee = () => ({
  type: 'GET_EMPLOYEE',
  selectedEmployee: null
})
