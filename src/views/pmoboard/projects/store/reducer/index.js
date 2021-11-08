// ** Initial State
const initialState = {
  data: [],
  total: 1,
  params: {},
  dataProject: {},
  dataCustomer: [],
  dataListProjectType: [],
  dataListEmployee: [],
  dataListProjectTechnology: [],
  dataListProjectDomain: [],
  dataResourceAllocation: {},
  dataListRoleEmployee: [],
  dataResourceAllocationByID: {}
}

const projects = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return { ...state, data: action.data }
    case 'GET_RESOURCE_ALLOCATIONBYID':
      return { ...state, dataResourceAllocationByID: action.data }

    case 'GET_LIST_ROLE_EMPLOYEE': {
      return {
        ...state,
        dataListRoleEmployee: action.data.map((res) => {
          return { ...res, value: res.id, label: res.name }
        })
      }
    }
    case 'GET_PROJECT':
      return { ...state, dataProject: action.data }
    case 'GET_RESOURCE_ALLOCATION':
      return { ...state, dataResourceAllocation: action.data }

    case 'GET_CUSTOMER':
      return {
        ...state,
        dataCustomer: action.data.map((res) => {
          return { ...res, value: res.id, label: res.name }
        })
      }
    case 'GET_LIST_PROJECT_TYPE':
      return {
        ...state,
        dataListProjectType: action.data.map((res) => {
          return { ...res, value: res.id, label: res.name }
        })
      }
    case 'GET_LIST_EMPLOYEE':
      return {
        ...state,
        dataListEmployee: action.data.map((res) => {
          return { ...res, value: res.id, label: res.name }
        })
      }
    case 'GET_LIST_PROJECT_TECHNOLOGY':
      return {
        ...state,
        dataListProjectTechnology: action.data.map((res) => {
          return { ...res, value: res.id, label: res.name }
        })
      }
    case 'GET_LIST_PROJECT_DOMAIN':
      return {
        ...state,
        dataListProjectDomain: action.data.map((res) => {
          return { ...res, value: res.id, label: res.name }
        })
      }

    case 'ADD_USER':
    //   return { ...state }
    // case 'DELETE_USER':
    //   return { ...state }
    default:
      return { ...state }
  }
}
export default projects
