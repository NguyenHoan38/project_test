import axios from 'axios'
import {DOMAIN} from './../../../../../constant'
export const getAllData = () => {
  return async dispatch => {
    await axios
      .get(`${DOMAIN}/resource/getAllProjectInfo`)
      .then(response => {
        dispatch({
          type: 'GET_ALL_DATA',
          data: response && response.data && response.data.data && response.data.data.length > 0 ? response.data.data : []
        })
      })
      .catch(err => console.log(err))
  }
}
export const getListProjectTechnology = () => {
  return async dispatch => {
    await axios
      .get(`${DOMAIN}/resource/getListProjectTechnology`)
      .then(response => {
        dispatch({
          type: 'GET_LIST_PROJECT_TECHNOLOGY',
          data: response && response.data && response.data.data && response.data.data.length > 0 ? response.data.data : []
        })
      })
      .catch(err => console.log(err))
  }
}
export const getListProjectDomain = () => {
  return async dispatch => {
    await axios
      .get(`${DOMAIN}/resource/getListProjectDomain`)
      .then(response => {
        dispatch({
          type: 'GET_LIST_PROJECT_DOMAIN',
          data: response && response.data && response.data.data && response.data.data.length > 0 ? response.data.data : []
        })
      })
      .catch(err => console.log(err))
  }
}
// ** Get data on page or row change
export const getData = params => {
  console.log(params)
  let i = 0
  i++
  console.log(i)
  return async dispatch => {
    dispatch({
      type: 'GET_DATA',
      data: dataTest,
      totalPages: 1,
      params
    })
  }
}

// ** Get User
export const getProject = id => {
  return async dispatch => {
    await axios
      .get(`${DOMAIN}/resource/getProjectInfo/${id}`)
      .then(response => {
        dispatch({
          type: 'GET_PROJECT',
          data: response.data.data
        })
      })
      .catch(err => console.log(err))
  }
}
// get Project Type
export const getListProjectType = () => {
  return async dispatch => {
    await axios
      .get(`${DOMAIN}/resource/getListProjectType`)
      .then(response => {
        dispatch({
          type: 'GET_LIST_PROJECT_TYPE',
          data: response.data.data
        })
      })
      .catch(err => console.log(err))
  }
}
export const getListEmployee = () => {
  return async dispatch => {
    await axios
      .get(`${DOMAIN}/resource/getListEmployee`)
      .then(response => {
        dispatch({
          type: 'GET_LIST_EMPLOYEE',
          data: response.data.data
        })
      })
      .catch(err => console.log(err))
  }
}

//get Customer
export const getCustomer = () => {
  return async dispatch => {
    await axios
      .get(`${DOMAIN}/resource/getListCustomer`)
      .then(response => {
        dispatch({
          type: 'GET_CUSTOMER',
          data: response.data.data
        })
      })
      .catch(err => console.log(err))
  }
}

// ** Add new project
export const addProject = project => {
  return async dispatch => {
    const res = await axios
      .post(`${DOMAIN}/resource/addProject`, project)
      return res
  }
}
export const addProjectTechnology = project => {
  return async dispatch => {
    await axios
      .post(`${DOMAIN}/resource/addProjectTechnology`, project)
      .then(response => {
        // dispatch({
        //   type: 'GET_USER',
        //   selectedUser: response.data.user
        // })
      })
      .catch(err => console.log(err))
  }
}

export const addResourceAllocation = params => {
  console.log('param pram', params)
  return async dispatch => {
    await axios
      .post(`${DOMAIN}/resource/addResourceAllocation`, params)
      .then(response => {
        // dispatch({
        //   type: 'GET_USER',
        //   selectedUser: response.data.user
        // })
      })
      .catch(err => console.log(err))
  }
}
export const addProjectDomain = project => {
  return async dispatch => {
  return  await axios
      .post(`${DOMAIN}/resource/addProjectDomain`, project)
      .then(response => {
        // dispatch({
        //   type: 'GET_USER',
        //   selectedUser: response.data.user
        // })
        return response
      })
      .catch(err => console.log(err))
  }
}

// ** Delete user
export const deleteUser = id => {
  return (dispatch, getState) => {
    axios
      .delete('/apps/users/delete', { id })
      .then(response => {
        dispatch({
          type: 'DELETE_USER'
        })
      })
      .then(() => {
        dispatch(getData(getState().users.params))
        dispatch(getAllData())
      })
  }
}
