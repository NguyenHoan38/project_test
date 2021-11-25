import Avatar from '@components/avatar'
import { yupResolver } from '@hookform/resolvers/yup'
import { editEmployee, getEmployeeDetails } from '@src/slices/employees/thunk'
import axios from '@src/utility/axios'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import { selectThemeColors } from '@utils'
import classnames from 'classnames'
import { memo, useEffect, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import styled from 'styled-components'
import * as yup from 'yup'
import Sidebar from '../ListSidebar'
import ListSkills from './ListEditEmployeeSkills'

const EmployeeSchema = yup.object().shape({
  name: yup.string().required('Employee name is a required field'),
  dob: yup.date().required('Date is a required field'),
  email: yup
    .string()
    .email('Email must be a valid email')
    .required('Email is a required field'),
  phone: yup.string().required('Phone is a required field'),
  statusDetail: yup
    .object()
    .required('Status is a required field')
    .nullable()
    .default(null),
  locationDetail: yup
    .object()
    .required('Location is a required field')
    .nullable()
    .default(null),
  roles: yup
    .array()
    .min(1, 'Roles must have at least one item')
    .required('Roles is a required field')
})

const statusOptions = [
  { id: 1, name: 'Active' },
  { id: 2, name: 'Inactive' },
  { id: 3, name: 'Onboarding' },
  { id: 4, name: 'Off Board' }
]

const locationOptions = [
  { id: 1, name: 'In house' },
  { id: 2, name: 'Onsite' }
]

const ListEditEmployee = (props) => {
  const { employeeId, onClose } = props
  const dispatch = useDispatch()

  const employee = useSelector((state) => {
    if (employeeId) {
      return state.employees.byId[employeeId]
    }
    return null
  })

  const allRoles = useSelector((state) => state.employees.roles)

  const [name, setName] = useState('')
  const [dob, setDob] = useState(new Date())
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [roles, setRoles] = useState([])
  const [statusDetail, setStatusDetail] = useState(null)
  const [projects, setProjects] = useState([])
  const [projectDetails, setProjectDetails] = useState({})
  const [employeeSkills, setEmployeeSkills] = useState([])
  const [locationDetail, setLocationDetail] = useState(null)
  const [skills, setSkills] = useState([])

  useEffect(() => {
    if (employee) {
      const {
        dob,
        email,
        phone,
        name,
        roles,
        statusDetail,
        projects,
        skills,
        locationDetail
      } = employee

      setDob(new Date(dob))
      setEmail(email)
      setPhone(phone)
      setName(name)
      setRoles(roles)
      setStatusDetail(statusDetail)
      setProjects(projects)
      setEmployeeSkills(skills)
      setLocationDetail(locationDetail)
    }
  }, [employee])

  useEffect(() => {
    if (employee) {
      const { projects } = employee
      Promise.all(
        projects.map((project) => {
          const { projectId } = project
          return axios.get(`/resource/getProjectInfo/${projectId}`)
        })
      ).then((response) => {
        const projectDetails = {}
        response.forEach(({ data }) => {
          const { id } = data
          projectDetails[id] = data
        })
        setProjectDetails(projectDetails)
      })
    }
  }, [employee])

  const { errors, handleSubmit, control, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(EmployeeSchema)
  })

  // Update inital input value
  useEffect(() => {
    reset({
      dob,
      name,
      email,
      phone,
      roles,
      statusDetail,
      locationDetail
    })
  }, [dob, name, email, phone, roles, statusDetail, locationDetail])

  const handleSetSkills = (skills) => {
    setSkills(skills)
  }

  const onSubmit = async (data) => {
    try {
      const { id } = employee
      const dobFormatted = dob.toISOString()
      await dispatch(editEmployee({ ...data, id, dob: dobFormatted, skills }))
      onClose()
      await dispatch(getEmployeeDetails(null))
    } catch (error) {
      console.log(error)
    }
  }
  {
    console.log(statusDetail)
  }
  return (
    <Sidebar
      open={Boolean(employeeId && employee)}
      title="Employee Infomation"
      onClose={onClose}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <FormGroup>
            <Label for="name">Employees *</Label>
            <Controller
              control={control}
              id="name"
              name="name"
              as={Input}
              className={classnames({
                'is-invalid': Boolean(errors?.name?.message)
              })}
            />
            {errors?.name?.message && (
              <FormFeedback>{errors.name.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone *</Label>
            <Controller
              control={control}
              id="phone"
              name="phone"
              type="number"
              as={Input}
              className={classnames({
                'is-invalid': Boolean(errors?.phone?.message)
              })}
            />
            {errors?.phone?.message && (
              <FormFeedback>{errors.phone.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="dob">Date *</Label>
            <Controller
              as={Flatpickr}
              control={control}
              id="dob"
              name="dob"
              className={'form-control'}
            />
            {errors && errors.dob && (
              <FormFeedback>{errors.dob.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="email">Email *</Label>
            <Controller
              control={control}
              id="email"
              name="email"
              as={Input}
              className={classnames({
                'is-invalid': Boolean(errors?.email?.message)
              })}
            />
            {errors?.email?.message && (
              <FormFeedback>{errors.email.message}</FormFeedback>
            )}
          </FormGroup>
          <StatusFormGroup>
            <Label for="status">Status *</Label>
            <Controller
              isClearable
              as={Select}
              id="statusDetail"
              control={control}
              name="statusDetail"
              options={statusOptions}
              className="react-select"
              classNamePrefix="select"
              theme={selectThemeColors}
              defaultValue={statusDetail}
              className={classnames({
                'is-invalid': Boolean(errors?.statusDetail?.message)
              })}
              getOptionLabel={(option) => {
                console.log(option)
                return option.name
              }}
              getOptionValue={(option) => {
                return option.id
              }}
            />
            {errors?.statusDetail?.message && (
              <FormFeedback>{errors.statusDetail.message}</FormFeedback>
            )}
          </StatusFormGroup>
          <FormGroup>
            <Label for="location">Location *</Label>
            <Controller
              isClearable
              as={Select}
              id="locationDetail"
              name="locationDetail"
              control={control}
              options={locationOptions}
              className="react-select"
              classNamePrefix="select"
              theme={selectThemeColors}
              defaultValue={locationDetail}
              className={classnames({
                'is-invalid': Boolean(errors?.locationDetail?.message)
              })}
              getOptionLabel={(option) => {
                return option.name
              }}
              getOptionValue={(option) => {
                return option.id
              }}
            />
            {errors?.locationDetail?.message && (
              <FormFeedback>{errors.locationDetail.message}</FormFeedback>
            )}
          </FormGroup>
        </FormContainer>
        <FormContainer>
          <RoleFormGroup>
            <Label for="roles">Roles *</Label>
            <Controller
              isClearable
              as={Select}
              control={control}
              options={allRoles}
              className="react-select"
              classNamePrefix="select"
              theme={selectThemeColors}
              isMulti
              name="roles"
              id="roles"
              defaultValue={roles}
              className={classnames({
                'is-invalid': Boolean(errors?.roles?.message)
              })}
              getOptionLabel={(option) => {
                return option.name
              }}
              getOptionValue={(option) => {
                return option.id
              }}
            />
            {errors?.roles?.message && (
              <FormFeedback>{errors.roles.message}</FormFeedback>
            )}
          </RoleFormGroup>
        </FormContainer>
        <ListSkills skills={employeeSkills} onSetSkills={handleSetSkills} />
        {projects.length > 0 ? (
          <FormGroup>
            <Label for="projects">Projects</Label>
            <ProjectWrapper>
              <ProjectContainer>
                {projects.map(({ projectId, projectName }) => {
                  if (projectId in projectDetails) {
                    const projectManager =
                      projectDetails[projectId].projectManager.name
                    return (
                      <div
                        className="d-flex align-items-center"
                        key={projectId}
                      >
                        <Avatar
                          color="light-primary"
                          content="N/A"
                          className="rounded"
                        />
                        <span className="font-weight-bold ml-1">
                          {projectName}
                        </span>
                        <div className="d-flex align-items-center ml-auto">
                          <Avatar color="light-primary" content="N/A" />
                          <span className="ml-1">{projectManager}</span>
                        </div>
                      </div>
                    )
                  } else {
                    return null
                  }
                })}
              </ProjectContainer>
            </ProjectWrapper>
          </FormGroup>
        ) : null}
        <SideBarFooter className="mt-2">
          <Button color="primary" type="submit">
            Save
          </Button>
          <Button color="primary" outline className="ml-50" onClick={onClose}>
            Cancel
          </Button>
        </SideBarFooter>
      </Form>
    </Sidebar>
  )
}

const FormContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  columnGap: '1rem',
  '@media (max-width: 576px)': {
    gridTemplateColumns: '1fr'
  }
})

const StatusFormGroup = styled(FormGroup)({
  position: 'relative',
  zIndex: 4
})

const RoleFormGroup = styled(FormGroup)({
  position: 'relative',
  zIndex: 3
})

const SideBarFooter = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end'
})

const ProjectWrapper = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr',
  marginTop: '0.5rem'
})

const ProjectContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  '& > * + *': {
    marginTop: '0.75rem'
  }
})

export default memo(ListEditEmployee)
