// Initial State
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

// Employees reducer
const employees = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EMPLOYEE_DETAILS': {
      const { byId, allIds, total, skills, roles } = action.payload
      return { ...state, byId, allIds, total, skills, roles }
    }
    case 'GET_FILTERED_EMPLOYEES': {
      const { data, total } = action
      return { ...state, data, total }
    }
    case 'SET_EMPLOYEE_DETAILS': {
      const { id } = action.payload
      const employee = state.byId[id]
      const byId = {
        ...state.byId,
        [id]: { ...employee, ...action.payload }
      }
      return { ...state, byId }
    }
    case 'PENDING': {
      return { ...state, pending: action.payload }
    }
    default:
      return { ...state }
  }
}

export default employees
