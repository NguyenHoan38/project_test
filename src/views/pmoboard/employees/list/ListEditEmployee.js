import Avatar from '@components/avatar'
import { yupResolver } from '@hookform/resolvers/yup'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import { selectThemeColors } from '@utils'
import classnames from 'classnames'
import { memo, useEffect, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Spinner
} from 'reactstrap'
import styled from 'styled-components'
import * as yup from 'yup'
import { updateEmployee } from '../store/action'
import Sidebar from './ListSidebar'
import ListSkills from './ListSkills'

const EmployeeSchema = yup.object().shape({
  name: yup.string().required('Employee name is a required field'),
  dob: yup.date().required('Date is a required field'),
  email: yup
    .string()
    .email('Email must be a valid email')
    .required('Email is a required field'),
  phone: yup.string().required('Phone is a required field'),
  status: yup
    .object()
    .required('Status is a required field')
    .nullable()
    .default(null),
  location: yup
    .object()
    .required('Location is a required field')
    .nullable()
    .default(null),
  roles: yup
    .array()
    .min(1, 'Roles must have at least one item')
    .required('Roles is a required field')
})

const ListEditEmployee = (props) => {
  const { employeeId, onClose } = props
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const selectedEmployee = useSelector((state) => {
    if (employeeId) {
      return state.employees.byId[employeeId]
    }
    return null
  })

  const employeeRoles = useSelector((state) => state.employees.roles)

  const [name, setName] = useState('')
  const [dob, setDob] = useState(new Date())
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [roles, setRoles] = useState([])
  const [status, setStatus] = useState(null)
  const [projects, setProjects] = useState([])
  const [employeeSkills, setEmployeeSkills] = useState([])
  const [location, setLocation] = useState(null)
  const [skills, setSkills] = useState([])

  // Map unnormalized data to state
  useEffect(() => {
    if (selectedEmployee) {
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
      } = selectedEmployee

      const employeeRoles = roles.map((role) => {
        const { empRoleId, empRoleName } = role
        return { value: empRoleId, label: empRoleName }
      })

      const employeeStatus = {
        value: statusDetail.id,
        label: statusDetail.name
      }

      const employeeLocation = {
        value: locationDetail.id,
        label: locationDetail.name
      }

      setDob(new Date(dob))
      setEmail(email)
      setPhone(phone)
      setName(name)
      setRoles(employeeRoles)
      setStatus(employeeStatus)
      setProjects(projects)
      setEmployeeSkills(skills)
      setLocation(employeeLocation)
    }
  }, [selectedEmployee])

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
      status,
      location
    })
  }, [dob, name, email, phone, roles, status, location])

  const handleSetSkills = (skills) => {
    setSkills(skills)
  }

  const onSubmit = async (data) => {
    const { id } = selectedEmployee
    setLoading(true)
    await dispatch(updateEmployee({ ...data, id, skills }))
    setLoading(false)
  }

  const roleOptions = employeeRoles.map((role) => {
    const { id, name } = role
    return { value: id, label: name }
  })

  const statusOptions = [
    { value: 1, label: 'Active' },
    { value: 2, label: 'Inactive' },
    { value: 3, label: 'Onboarding' },
    { value: 4, label: 'Off Board' }
  ]

  const locationOptions = [
    { value: 1, label: 'In House' },
    { value: 2, label: 'Onsite' }
  ]

  return (
    <Sidebar
      open={Boolean(employeeId && selectedEmployee)}
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
              id="status"
              control={control}
              name="status"
              options={statusOptions}
              className="react-select"
              classNamePrefix="select"
              theme={selectThemeColors}
              defaultValue={status}
              className={classnames({
                'is-invalid': Boolean(errors?.status?.message)
              })}
            />
            {errors?.status?.message && (
              <FormFeedback>{errors.status.message}</FormFeedback>
            )}
          </StatusFormGroup>
          <FormGroup>
            <Label for="location">Location *</Label>
            <Controller
              isClearable
              as={Select}
              id="location"
              name="location"
              control={control}
              options={locationOptions}
              className="react-select"
              classNamePrefix="select"
              theme={selectThemeColors}
              defaultValue={location}
              className={classnames({
                'is-invalid': Boolean(errors?.location?.message)
              })}
            />
            {errors?.location?.message && (
              <FormFeedback>{errors.location.message}</FormFeedback>
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
              options={roleOptions}
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
            />
            {errors?.roles?.message && (
              <FormFeedback>{errors.roles.message}</FormFeedback>
            )}
          </RoleFormGroup>
        </FormContainer>
        <ListSkills skills={employeeSkills} onSetSkills={handleSetSkills} />
        <FormGroup>
          <Label for="projects">Projects</Label>
          <ProjectWrapper>
            <ProjectContainer>
              {projects.map(({ projectId, projectName }) => (
                <div className="d-flex align-items-center" key={projectId}>
                  <Avatar
                    color="light-primary"
                    content="N/A"
                    className="rounded"
                  />
                  <span className="font-weight-bold ml-1">{projectName}</span>
                </div>
              ))}
            </ProjectContainer>
          </ProjectWrapper>
        </FormGroup>
        <SideBarFooter className="mt-2">
          <Button
            color="primary"
            type="submit"
            disabled={Object.keys(errors).length > 0}
          >
            {loading ? (
              <>
                <Spinner color="white" size="sm" />
                <span className="ml-50">Save</span>
              </>
            ) : (
              'Save'
            )}
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
  marginLeft: '0.5rem',
  marginTop: '0.5rem'
})

const ProjectContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  '& > * + *': {
    marginTop: '0.75rem'
  }
})

/**
 <div className="d-flex align-items-center ml-auto">
  <Avatar color="light-primary" content="N/A" />
  <span className="ml-1">{name}</span>
</div>
*/

export default memo(ListEditEmployee)
