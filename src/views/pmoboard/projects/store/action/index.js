import axios from 'axios'
import { DOMAIN } from './../../../../../constant'

export const setDataResourceAllocation = () => {
  return async (dispatch) => {
    dispatch({
      type: 'GET_RESOURCE_ALLOCATION',
      data: {}
    })
  }
}
export const setDataProject = () => {
  return async (dispatch) => {
    dispatch({
      type: 'GET_PROJECT',
      data: {}
    })
  }
}

export const getData = (projectDto) => {
  return async (dispatch) => {
    await axios
      .post(`${DOMAIN}/resource/getAllProjectInfo`, projectDto)
      .then((response) => {
        const data = response?.data?.data ? response.data.data : null
        dispatch({
          type: 'GET_DATA',
          data
        })
      })
      .catch((err) => console.log(err))
  }
}
export const getListProjectTechnology = () => {
  return async (dispatch) => {
    await axios
      .get(`${DOMAIN}/resource/getListProjectTechnology`)
      .then((response) => {
        dispatch({
          type: 'GET_LIST_PROJECT_TECHNOLOGY',
          data:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.length > 0
              ? response.data.data
              : []
        })
      })
      .catch((err) => console.log(err))
  }
}
export const getListProjectDomain = () => {
  return async (dispatch) => {
    await axios
      .get(`${DOMAIN}/resource/getListProjectDomain`)
      .then((response) => {
        dispatch({
          type: 'GET_LIST_PROJECT_DOMAIN',
          data:
            response &&
            response.data &&
            response.data.data &&
            response.data.data.length > 0
              ? response.data.data
              : []
        })
      })
      .catch((err) => console.log(err))
  }
}

// ** Get User
export const getProject = (id) => {
  return async (dispatch) => {
    await axios
      .get(`${DOMAIN}/resource/getProjectInfo/${id}`)
      .then((response) => {
        dispatch({
          type: 'GET_PROJECT',
          data: response.data.data
        })
      })
      .catch((err) => console.log(err))
  }
}
export const getResourceAllocation = (id) => {
  return async (dispatch) => {
    await axios
      .get(`${DOMAIN}/resource/getResourceAllocation/${id}`)
      .then((response) => {
        dispatch({
          type: 'GET_RESOURCE_ALLOCATION',
          data: response.data.data
        })
      })
      .catch((err) => console.log(err))
  }
}
export const getResourceAllocationById = (id) => {
  return async (dispatch) => {
    await axios
      .get(`${DOMAIN}/resource/getResourceAllocationById?id=${id}`)
      .then((response) => {
        dispatch({
          type: 'GET_RESOURCE_ALLOCATIONBYID',
          data: response.data.data
        })
      })
      .catch((err) => console.log(err))
  }
}

// get Project Type
export const getListProjectType = () => {
  return async (dispatch) => {
    await axios
      .get(`${DOMAIN}/resource/getListProjectType`)
      .then((response) => {
        dispatch({
          type: 'GET_LIST_PROJECT_TYPE',
          data: response.data.data
        })
      })
      .catch((err) => console.log(err))
  }
}
export const getListEmployee = () => {
  return async (dispatch) => {
    await axios
      .post(`${DOMAIN}/resource/getListEmployee`, null)
      .then((response) => {
        dispatch({
          type: 'GET_LIST_EMPLOYEE',
          data: response.data.data
        })
      })
      .catch((err) => console.log(err))
  }
}

//get Customer
export const getCustomer = () => {
  return async (dispatch) => {
    await axios
      .get(`${DOMAIN}/resource/getListCustomer`)
      .then((response) => {
        dispatch({
          type: 'GET_CUSTOMER',
          data: response.data.data
        })
      })
      .catch((err) => console.log(err))
  }
}

//add Customer
export const addCustomer = (customer) => {
  return async (dispatch) => {
    const res = await axios.post(
      `${DOMAIN}/resource/addCustomer`,
      customer
    )
    return res
  }
}


export const getListEmployeeRole = () => {
  return async (dispatch) => {
    await axios
      .get(`${DOMAIN}/resource/getListEmployeeRole`)
      .then((response) => {
        dispatch({
          type: 'GET_LIST_ROLE_EMPLOYEE',
          data: response.data.data
        })
      })
      .catch((err) => console.log(err))
  }
}

// ** Add new project
export const addProject = (project) => {
  return async (dispatch) => {
    const res = await axios.post(`${DOMAIN}/resource/addProject`, project)
    return res
  }
}

export const editResourceAllocation = (project) => {
  return async (dispatch) => {
    const res = await axios.post(
      `${DOMAIN}/resource/editResourceAllocation`,
      project
    )
    return res
  }
}

export const updateProject = (project) => {
  return async (dispatch) => {
    const res = await axios.post(`${DOMAIN}/resource/editProject`, project)
    return res
  }
}

export const addProjectTechnology = (project) => {
  return async (dispatch) => {
    const res = await axios.post(
      `${DOMAIN}/resource/addProjectTechnology`,
      project
    )
    return res
  }
}

export const addResourceAllocation = (params) => {
  return async (dispatch) => {
    const res = await axios.post(
      `${DOMAIN}/resource/addResourceAllocation`,
      params
    )
    return res
  }
}
export const deleteResourceAllocation = (params) => {
  return async (dispatch) => {
    const res = await axios.post(
      `${DOMAIN}/resource/deleteResourceAllocation`,
      params
    )
    return res
  }
}
export const deleteProject = (params) => {
  return async (dispatch) => {
    const res = await axios.post(`${DOMAIN}/resource/deleteProject`, params)
    return res
  }
}

export const addProjectDomain = (project) => {
  return async (dispatch) => {
    const res = await axios.post(`${DOMAIN}/resource/addProjectDomain`, project)
    return res
  }
}

// ** Delete user
export const deleteUser = (id) => {
  return (dispatch, getState) => {
    axios
      .delete('/apps/users/delete', { id })
      .then((response) => {
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
