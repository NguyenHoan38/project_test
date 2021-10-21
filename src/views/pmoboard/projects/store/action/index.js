import axios from 'axios'

// ** Get all Data
// export const getAllData = () => {
//   return async dispatch => {
//     await axios.get('/api/users/list/all-data').then(response => {
//       dispatch({
//         type: 'GET_ALL_DATA',
//         data: response.data
//       })
//     })
//   }
// }
const dataTest = [
  {
    projectName: "Kern",
    projectType: "T&M",
    projectColor: 1,
    projectSignal: "KA",
    customer: "Kern AG",
    pmLead: "Nguyen Hoang Tung",
    technologyStack: "Azure, Devops",
    domainIndustry: "Devops, IT-services",
    mileStone: "25/12/2021",
    duration: "12/08/2021 - 25/12/2021",
    status: 1,
    collaborators: 8
  },
  {
    projectName: "Kern",
    projectType: "T&M",
    projectColor: 2,
    projectSignal: "KA",
    customer: "Kern AG",
    pmLead: "Nguyen Hoang Tung",
    technologyStack: "Azure, Devops",
    domainIndustry: "Devops, IT-services",
    mileStone: "25/12/2021",
    duration: "12/08/2021 - 25/12/2021",
    status: 2,
    collaborators: 8
  },
  {
    projectName: "Kern",
    projectType: "T&M",
    projectColor: 1,
    projectSignal: "KA",
    customer: "Kern AG",
    pmLead: "Nguyen Hoang Tung",
    technologyStack: "Azure, Devops",
    domainIndustry: "Devops, IT-services",
    mileStone: "25/12/2021",
    duration: "12/08/2021 - 25/12/2021",
    status: 1,
    collaborators: 8
  }
]

export const getAllData = () => {
  return async dispatch => {
    await axios
      .get('http://[::1]/api/resource/getAllProjectInfo')
      .then(response => {
        console.log('response.data response.data', response.data.data) 
        dispatch({
          type: 'GET_ALL_DATA',
          data: response.data.data
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
    // await axios.get('/api/users/list/data', params).then(response => {
    //   dispatch({
    //     type: 'GET_DATA',
    //     data: response.data.users,
    //     totalPages: response.data.total,
    //     params
    //   })
    // })
  }
}

// ** Get User
export const getUser = id => {
  return async dispatch => {
    await axios
      .get('/api/users/user', { id })
      .then(response => {
        dispatch({
          type: 'GET_USER',
          selectedUser: response.data.user
        })
      })
      .catch(err => console.log(err))
  }
}

// ** Add new user
// export const addUser = user => {
//   return (dispatch, getState) => {
//     axios
//       .post('/apps/users/add-user', user)
//       .then(response => {
//         dispatch({
//           type: 'ADD_USER',
//           user
//         })
//       })
//       .then(() => {
//         dispatch(getData(getState().users.params))
//         dispatch(getAllData())
//       })
//       .catch(err => console.log(err))
//   }
// }

// ** Add new project
export const addProject = project => {
  console.log('222222222222222222222', project)
  return async dispatch => {
    await axios
      .get('/api/users/user', { id })
      .then(response => {
        dispatch({
          type: 'GET_USER',
          selectedUser: response.data.user
        })
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
