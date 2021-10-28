// ** React Imports
import { Link } from 'react-router-dom'
// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { getProject, deleteUser } from '../store/action'
import { store } from '@store/storeConfig/store'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'
import { projectColor } from '../constant'
const statusObj = {
  1: { color: 'light-success', name: 'active' },
  2: { color: 'light-secondary', name: 'closed' }
}
// ** Function to toggle sidebar
const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

export const columns = (showFormEdit) => {
   // ** Store Vars
//    const dispatch = useDispatch()
//   function showFormProject(id) {
//     dispatch(
//       getProject(id)
// //     )
//     showFormEdit(id)
//   }
  return (
    [
      {
        name: 'Employee',
        minWidth: '150px',
        selector: 'mainHeadcount',
        sortable: true,
        cell: row => <span className='text-capitalize'>{row.assign.name}</span>
      },
      {
        name: 'Main headcount',
        minWidth: '150px',
        selector: 'mainHeadcount',
        sortable: true,
        cell: row => <p className="text-center w-100 mr-5"> <Input className='ml-0' type="checkbox"    /> </p>  
      },
      {
        name: 'Shadow for ',
        minWidth: '150px',
        selector: 'shadow',
        sortable: true,
        cell: row => <span className='text-capitalize'>{row && row.shadow ? row.shadow.name : ''}</span>
      },
      {
        name: 'Effort',
        minWidth: '150px',
        selector: 'effort',
        sortable: true,
        cell: row => <span className='text-capitalize'>{row.effort}</span>
      },
      {
        name: 'Role',
        minWidth: '150px',
        selector: 'role',
        sortable: true,
        cell: row => <span className='text-capitalize'>{row.role}</span>
      },
      {
        name: 'Duration',
        minWidth: '150px',
        selector: 'mainHeadcount',
        sortable: true,
        cell: row => {
            return (
              <div>
                <span className='text-capitalize pl-1'>{moment(row.startDate).format('MM/DD/YYYY')} -</span>
                <span className='text-capitalize pl-1'>{moment(row.endDate).format('MM/DD/YYYY')}</span>
              </div>
            )
          }
      },
      {
        name: 'Actions',
        minWidth: '100px',
        cell: row => (
          <UncontrolledDropdown>
            <DropdownToggle tag='div' className='btn btn-sm'>
              <MoreVertical size={14} className='cursor-pointer' />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                tag={Link}
                to={`/apps/user/view/${row.id}`}
                className='w-100'
                onClick={() => store.dispatch(getUser(row.id))}
              >
                <FileText size={14} className='mr-50' />
                <span className='align-middle'>Details</span>
              </DropdownItem>
              <DropdownItem
                to={`/apps/user/edit/${row.id}`}
                className='w-100'
                onClick={() => showFormProject(row.id)}
              >
                <Archive size={14} className='mr-50' />
                <span className='align-middle'>Edit</span>
              </DropdownItem>
              <DropdownItem className='w-100' onClick={() => store.dispatch(deleteUser(row.id))}>
                <Trash2 size={14} className='mr-50' />
                <span className='align-middle'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        )
      }
    ])
}
