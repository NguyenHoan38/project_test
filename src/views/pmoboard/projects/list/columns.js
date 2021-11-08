import ToastContent from '@components/common/ToastContent'
import moment from 'moment'
import { Edit, Trash2 } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Slide, toast } from 'react-toastify'
import { Badge, UncontrolledTooltip } from 'reactstrap'
import { projectColor } from '../constant'
import { deleteProject, getData, getProject } from '../store/action'

const statusObj = {
  1: { color: 'light-success', name: 'active' },
  2: { color: 'light-secondary', name: 'Onhold' },
  3: { color: 'light-secondary', name: 'Closed' }
}

const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
const renderProjectName = (row) => {
  return (
    <div className="d-flex">
      <Badge
        className="text-capitalize d-flex align-items-center"
        style={projectColor.find((element) => element.id === row.color)}
      >
        {row.signal}
      </Badge>
      <span className="text-capitalize pl-1">{row.name}</span>
    </div>
  )
}
const renderTechnologyStack = (row) => {
  return (
    <div>
      {row.technology.map((t, i) => {
        return (
          <span key={i} className="text-capitalize pl-1" key={i}>
            {t.name}
          </span>
        )
      })}
    </div>
  )
}
const renderDomainIndustry = (row) => {
  return (
    <div>
      {row.domain.map((m, i) => {
        return (
          <span key={i} className="text-capitalize " key={i}>
            {' '}
            {m.name}{' '}
          </span>
        )
      })}
    </div>
  )
}
const renderCollaborators = (row) => {
  return (
    <div>
      {row.collaborators.map((m, i) => {
        return (
          <span key={i} className="text-capitalize pl-1 d-block mt-1 mb-1">
            {' '}
            {m.name}{' '}
          </span>
        )
      })}
    </div>
  )
}
const renderDuration = (row) => {
  return (
    <div>
      <span className="text-capitalize pl-1">
        {moment(row.startDate).format('MM-DD-YYYY')} /
      </span>
      <span className="text-capitalize pl-1">
        {moment(row.startDate).format('MM-DD-YYYY')}
      </span>
    </div>
  )
}

export const columns = (showFormEdit, currentPage, searchObj, rowsPerPage) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const projects = useSelector((state) => state.projects)

  function showFormProject(id) {
    dispatch(getProject(id))
    showFormEdit(id)
  }
  const delteProject = (id) => {
    dispatch(deleteProject({ id })).then((res) => {
      if (res && res.data && res.data && res.data.success) {
        dispatch(getData({currentPage, searchObj, rowsPerPage}))
        toast.success(<ToastContent title={'Successful delete!'} />, {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000
        })
      }
    })
  }
  return [
    {
      name: 'Actions',
      minWidth: '100px',
      cell: (row) => (
        <div>
          <Edit
            onClick={() => showFormProject(row.id)}
            size={14}
            className="mr-50 "
            id="positionBottom"
          />
          <UncontrolledTooltip placement="bottom" target="positionBottom">
            Edit
          </UncontrolledTooltip>
          <Trash2
            onClick={() => delteProject(row.id)}
            size={14}
            className="mr-50"
            id="delete"
          />
          <UncontrolledTooltip placement="bottom" target="delete">
            delete
          </UncontrolledTooltip>
        </div>
      )
    },
    {
      name: 'Project',
      minWidth: '150px',
      sortable: true,
      cell: (row) => renderProjectName(row)
    },
    {
      name: 'Project Type',
      minWidth: '150px',
      sortable: true,
      cell: (row) => (
        <span className="text-capitalize">{row.projectType.name}</span>
      )
    },
    {
      name: 'Customer',
      minWidth: '150px',
      sortable: true,
      cell: (row) => (
        <span className="text-capitalize">{row.customer.name}</span>
      )
    },
    {
      name: 'PM/Lead',
      minWidth: '150px',
      sortable: true,
      cell: (row) => (
        <span className="text-capitalize">{row?.projectManager?.name}</span>
      )
    },
    {
      name: 'Technology stack',
      minWidth: '150px',
      sortable: true,
      cell: (row) => renderTechnologyStack(row)
    },
    {
      name: 'Domain/Industry',
      minWidth: '150px',
      sortable: true,
      cell: (row) => renderDomainIndustry(row)
    },
    {
      name: 'Mile stone',
      minWidth: '150px',
      sortable: true,
      cell: (row) => (
        <span className="text-capitalize">
          {row.mileStone.map((m, i) => {
            return (
              <span key={i} className="d-block">
                {moment(m).format('MM-DD-YYYY')}
              </span>
            )
          })}
        </span>
      )
    },
    {
      name: 'Duration',
      minWidth: '150px',
      sortable: true,
      cell: (row) => renderDuration(row)
      // <span className='text-capitalize'>{row.duration}</span>
    },
    {
      name: 'Status',
      minWidth: '138px',
      sortable: true,
      cell: (row) => {
        if (row) {
          return (
            <Badge
              className="text-capitalize"
              color={statusObj[row?.statusDetail?.id].color}
              pill
            >
              {statusObj[row?.statusDetail?.id].name}
            </Badge>
          )
        }
      }
    },
    {
      name: 'Collaborators',
      minWidth: '250px',
      sortable: true,
      cell: (row) => renderCollaborators(row)
    }
  ]
}
