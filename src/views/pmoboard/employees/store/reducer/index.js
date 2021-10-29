// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {},
  skills: [],
  roles: [],
  pending: false,
  selectedEmployee: null
}

const employees = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_EMPLOYEES': {
      const { allData, total } = action
      return { ...state, allData, total }
    }
    case 'GET_FILTERED_EMPLOYEES': {
      const { data, total } = action
      return { ...state, data, total }
    }
    case 'GET_EMPLOYEE_SKILLS': {
      const { skills } = action
      return { ...state, skills }
    }
    case 'GET_EMPLOYEE_ROLES': {
      const { roles } = action
      return { ...state, roles }
    }
    case 'PENDING': {
      return { ...state, pending: action.payload }
    }
    case 'GET_EMPLOYEE':
      return { ...state, selectedEmployee: action.selectedEmployee }
    default:
      return { ...state }
  }
}
export default employees
