import { combineReducers } from '@reduxjs/toolkit'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import chat from '@src/views/apps/chat/store/reducer'
import todo from '@src/views/apps/todo/store/reducer'
import users from '@src/views/apps/user/store/reducer'
import email from '@src/views/apps/email/store/reducer'
import invoice from '@src/views/apps/invoice/store/reducer'
import calendar from '@src/views/apps/calendar/store/reducer'
import ecommerce from '@src/views/apps/ecommerce/store/reducer'
import dataTables from '@src/views/tables/data-tables/store/reducer'
import projects from '@src/views/pmoboard/projects/store/reducer'
import employees from '@src/slices/employees'
import resources from '@src/views/pmoboard/allocation-resource/store/reducer'
const rootReducer = combineReducers({
  auth,
  todo,
  chat,
  email,
  users,
  employees,
  navbar,
  layout,
  invoice,
  calendar,
  ecommerce,
  dataTables,
  projects,
  resources
})

export default rootReducer
