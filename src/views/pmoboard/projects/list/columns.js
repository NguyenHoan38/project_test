// ** React Imports
import { Link } from 'react-router-dom'
// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { getUser, deleteUser } from '../store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'
import { projectColor } from '../constant'
const statusObj = {
  1: {color: 'light-success', name: 'active'},
  2: {color: 'light-secondary', name: 'closed'}
}
const renderProjectName = row => {
  return (
    <div className="d-flex">
      <Badge className='text-capitalize' style={projectColor.find(element => element.id === row.color)}>
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
        row.technologyName.map((m, i) => {
          return (
            <span className='text-capitalize pl-1' key={i}>{m}</span>
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
        row.domainName.map((m, i) => {
          return (
            <span className='text-capitalize ' key={i}> {m} </span>
          )
        })
      }

    </div>
  )
}
const renderDuration = row => {
  return (
    <div>
      {/* <span className='text-capitalize pl-1'>{<Moment date={row.startDate} />}</span> */}
      <span className='text-capitalize pl-1'>{row.startDate}</span>
      <span className='text-capitalize pl-1'>{row.endDate}</span>
    </div>
  )
}

export const columns = [
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
    cell: row => <span className='text-capitalize'>{row.projectType}</span>
  },
  {
    name: 'Customer',
    minWidth: '150px',
    selector: 'customer',
    sortable: true,
    cell: row => <span className='text-capitalize'>{row.customer}</span>
  },
  {
    name: 'PM/Lead',
    minWidth: '150px',
    selector: 'pmLead',
    sortable: true,
    cell: row => <span className='text-capitalize'>{row.pmLead}</span>
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
          <Badge className='text-capitalize' color={statusObj[row.status].color} pill>
            {statusObj[row.status].name}
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
    cell: row => <span className='text-capitalize'>{row.collaborators}</span>
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
            tag={Link}
            to={`/apps/user/edit/${row.id}`}
            className='w-100'
            onClick={() => store.dispatch(getUser(row.id))}
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
]
