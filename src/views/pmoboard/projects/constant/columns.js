// ** React Imports
import { Link } from 'react-router-dom'
// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { getResourceAllocation, deleteUser, deleteResourceAllocation } from '../store/action'
import { store } from '@store/storeConfig/store'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, UncontrolledTooltip } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive, Edit } from 'react-feather'
import ToastContent from '@components/common/ToastContent'
import { toast, Slide } from 'react-toastify'
import { projectColor } from '../constant'
const statusObj = {
  1: { color: 'light-success', name: 'active' },
  2: { color: 'light-secondary', name: 'closed' }
}
// ** Function to toggle sidebar
const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

export const columns = (showFormEdit) => {
   // ** Store Vars
   const projects = useSelector(state => state.projects)
   const dispatch = useDispatch()
  function showFormProject(id) {
    dispatch(
      getResourceAllocation(id)
    )
    showFormEdit(id)
  }
  const deleteResource = (id) => {
    dispatch(
      deleteResourceAllocation({id})
    ).then(res => {
      if (res && res.data && res.data && res.data.success) {
          dispatch(getResourceAllocation(projects.dataProject?.id))
          toast.success(
              <ToastContent title={'Successful delete!'} />,
              { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
      }
  })
  }
  return (
    [
      {
        name: 'Actions',
        minWidth: '100px',
        cell: row => <div>     
        <Edit size={14}  onClick={() => showFormProject(row.id)} className='mr-50 '   id='positionBottom'/>
        <UncontrolledTooltip placement='bottom' target='positionBottom'>
         Edit
        </UncontrolledTooltip>
        <Trash2 size={14} onClick={() => deleteResource(row.id) } className='mr-50' id='delete'/>
        <UncontrolledTooltip placement='bottom' target='delete'>
         delete
        </UncontrolledTooltip>
           </div>
      },
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
        cell: row => <p className="text-center w-100 mr-5"> <Input className='ml-0' type="checkbox"   checked={row.mainHeadcount === 1} /> </p>  
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
        cell: row => <span className='text-capitalize'>{row.roleDetail.name}</span>
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
      }

    ])
}
