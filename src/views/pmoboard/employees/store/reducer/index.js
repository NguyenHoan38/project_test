// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {},
  selectedEmployee: null
}

const employees = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA':
      return { ...state, allData: action.data }
    case 'GET_DATA':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_EMPLOYEE':
      return { ...state, selectedEmployee: action.selectedEmployee }
    default:
      return { ...state }
  }
}
export default employees
