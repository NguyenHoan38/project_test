// ** React Imports
import { Link } from 'react-router-dom'
// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { getProject, deleteUser, deleteProject, getAllData } from '../store/action'
import { store } from '@store/storeConfig/store'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledTooltip, Button } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive, Edit } from 'react-feather'
import ToastContent from '@components/common/ToastContent'
import { toast, Slide } from 'react-toastify'
import { projectColor } from '../constant'
const statusObj = {
  1: { color: 'light-success', name: 'active' },
  2: { color: 'light-secondary', name: 'Onhold' },
  2: { color: 'light-secondary', name: 'Closed' }
}
// ** Function to toggle sidebar
const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
const renderProjectName = row => {
  return (
    <div className="d-flex">
      <Badge className='text-capitalize d-flex align-items-center' style={projectColor.find(element => element.id === row.color)}>
        {row.signal}
      </Badge>
      <span className='text-capitalize pl-1'>{row.name}</span>
    </div>
  )
}
const renderTechnologyStack = row => {
  return (
    <div>
      {
        row.technology.map((t, i) => {
          return (
            <span className='text-capitalize pl-1' key={i}>{t.name}</span>
          )
        })
      }

    </div>
  )
}
const renderDomainIndustry = row => {
  return (
    <div>
      {
        row.domain.map((m, i) => {
          return (
            <span className='text-capitalize ' key={i}> {m.name} </span>
          )
        })
      }

    </div>
  )
}
const renderCollaborators = row => {
  return (
    <div>
      {
        row.collaborators.map((m, i) => {
          return (
            <span className='text-capitalize pl-1' key={i}> {m.name} </span>
          )
        })
      }

    </div>
  )
}
const renderDuration = row => {
  return (
    <div>
      <span className='text-capitalize pl-1'>{moment(row.startDate).format('MM-DD-YYYY')} /</span>
      <span className='text-capitalize pl-1'>{moment(row.startDate).format('MM-DD-YYYY')}</span>
    </div>
  )
}

export const columns = (showFormEdit) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const projects = useSelector(state => state.projects)
  
  function showFormProject(id) {
    dispatch(
      getProject(id)
    )
    showFormEdit(id)
  }
  const delteProject = (id) => {
    dispatch(
      deleteProject({id})
    ).then(res => {
      if (res && res.data && res.data && res.data.success) {
          dispatch(getAllData(projects.dataProject?.id))
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
      <Edit onClick={() => showFormProject(row.id)} size={14} className='mr-50 '  id='positionBottom'/>
      <UncontrolledTooltip placement='bottom' target='positionBottom'>
       Edit
      </UncontrolledTooltip>
      <Trash2 onClick={() => delteProject(row.id)} size={14} className='mr-50' id='delete'/>
      <UncontrolledTooltip  placement='bottom' target='delete'>
       delete
      </UncontrolledTooltip>
         </div>
      },
      {
        name: 'Project',
        minWidth: '150px',
        selector: 'projectName',
        sortable: true,
        cell: row => renderProjectName(row)
      },
      {
        name: 'Project Type',
        minWidth: '150px',
        selector: 'projectType',
        sortable: true,
        cell: row => <span className='text-capitalize'>{row.projectType.name}</span>
      },
      {
        name: 'Customer',
        minWidth: '150px',
        selector: 'customer',
        sortable: true,
        cell: row => <span className='text-capitalize'>{row.customer.name}</span>
      },
      {
        name: 'PM/Lead',
        minWidth: '150px',
        selector: 'pmLead',
        sortable: true,
        cell: row => <span className='text-capitalize'>{row?.projectManager?.name}</span>
      },
      {
        name: 'Technology stack',
        minWidth: '150px',
        selector: 'technologyStack',
        sortable: true,
        cell: row => renderTechnologyStack(row)
      },
      {
        name: 'Domain/Industry',
        minWidth: '150px',
        selector: 'domainIndustry',
        sortable: true,
        cell: row => renderDomainIndustry(row)
      },
      {
        name: 'Mile stone',
        minWidth: '150px',
        selector: 'mileStone',
        sortable: true,
        cell: row => <span className='text-capitalize'>{row.mileStone}</span>
      },
      {
        name: 'Duration',
        minWidth: '150px',
        selector: 'duration',
        sortable: true,
        cell: row => renderDuration(row)
        // <span className='text-capitalize'>{row.duration}</span>
      },
      {
        name: 'Status',
        minWidth: '138px',
        selector: 'status',
        sortable: true,
        cell: row => {
          if (row) {
            return (
              <Badge className='text-capitalize' color={statusObj[row?.statusDetail?.id].color} pill>
                {statusObj[row?.statusDetail?.id].name}
              </Badge>
            )
          }
        }
      },
      {
        name: 'Collaborators',
        minWidth: '150px',
        selector: 'collaborator',
        sortable: true,
        cell: row => renderCollaborators(row)
      }

    ])
}
