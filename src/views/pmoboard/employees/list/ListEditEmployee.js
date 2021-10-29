import Sidebar from '@components/sidebar'
import { yupResolver } from '@hookform/resolvers/yup'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import { selectThemeColors } from '@utils'
import { useEffect, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import { Button, CustomInput, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import styled from 'styled-components'
import * as yup from 'yup'
import classnames from 'classnames'

const SignupSchema = yup.object().shape({
  name: yup.string().required('Employee name is a required field'),
  employeeCode: yup.string().required('Employee code is a required field'),
  dob: yup.date().required('Date is a required field'),
  email: yup.string().email('Email must be a valid email').required('Email is a required field'),
  phone: yup.string().required('Phone is a required field')
})

const ListEditEmployee = (props) => {
  const { open, onClose } = props
  const selectedEmployee = useSelector(state => state.employees.selectedEmployee)
  const employeeRoles = useSelector(state => state.employees.roles)
  const [name, setName] = useState('')
  const [employeeCode, setEmployeeCode] = useState('')
  const [dob, setDob] = useState(new Date())
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [roles, setRoles] = useState([])
  const [data, setData] = useState(null)
  const [status, setStatus] = useState({})

  useEffect(() => {
    if (selectedEmployee) {
      const { dob, email, phone, name, id, roles, statusDetail } = selectedEmployee

      setDob(new Date(dob))
      setEmail(email)
      setPhone(phone)
      setName(name)
      setEmployeeCode(id)
      setRoles(roles.map(({ empRoleId, empRoleName }) => {
        return { value: empRoleId, label: empRoleName }
      }))
      setStatus({
        value: statusDetail.id,
        label: statusDetail.name || 'N/A'
      })
    } else {
      setDob(new Date())
      setEmail('')
      setPhone('')
      setName('')
      setEmployeeCode('')
      setRoles([])
      setStatus({})
    }
  }, [selectedEmployee])

  const { errors, handleSubmit, control, reset } = useForm({
    mode: 'onChange',
    resolver: yupResolver(SignupSchema)
  })

  useEffect(() => {
    reset({
      dob,
      name,
      email,
      employeeCode,
      phone,
      roles
    })
  }, [dob, name, email, employeeCode, phone, roles])

  const onSubmit = data => {
    setData(data)
  }

  const roleOptions = employeeRoles.map(({ id, name }) => ({ value: id, label: name }))

  const locationOptions = [
    { value: 1, label: 'In House' },
    { value: 2, label: 'On site' }
  ]

  const statusOptions = [
    { value: 1, label: 'Active' },
    { value: 2, label: 'Inactive' },
    { value: 3, label: 'Onboarding' },
    { value: 4, label: 'Off Board' }
  ]

  const levelOptions = [
    { value: 1, label: 'Level 1' },
    { value: 2, label: 'Level 2' },
    { value: 3, label: 'Level 3' }
  ]

  return (
    <Sidebar
      size='lg'
      open={Boolean(open && selectedEmployee)}
      title='Employee Infomation'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={onClose}
      width={50}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <FormGroup>
            <Label for='name'>Employees</Label>
            <Controller
              control={control}
              id="name"
              name="name"
              as={Input}
              className={classnames({ 'is-invalid': Boolean(errors?.name?.message) })}
            />
            {errors && errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='employeeCode'>Code</Label>
            <Controller
              control={control}
              id="employeeCode"
              name="employeeCode"
              as={Input}
            />
            {errors && errors.employeeCode && <FormFeedback>{errors.employeeCode.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='dob'>Date</Label>
            <Controller
              as={Flatpickr}
              control={control}
              id="dob"
              name='dob'
              className={'form-control'}
            />
            {errors && errors.dob && <FormFeedback>{errors.dob.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='email'>Email</Label>
            <Controller
              control={control}
              id="email"
              name="email"
              as={Input}
              className={classnames({ 'is-invalid': Boolean(errors?.email?.message) })}
            />
            {errors && errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='phone'>Phone</Label>
            <Controller
              control={control}
              id="phone"
              name="phone"
              as={Input}
            />
            {errors && errors.phone && <FormFeedback>{errors.phone.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='status'>Status</Label>
            <Controller
              isClearable
              as={Select}
              id='status'
              control={control}
              name='status'
              options={statusOptions}
              className='react-select'
              classNamePrefix='select'
              theme={selectThemeColors}
              defaultValue={status}
            />
          </FormGroup>
        </FormContainer>
        <FormContainer>
          <FormGroup>
            <Label for='roles'>Roles</Label>
            <Controller
              isClearable
              as={Select}
              control={control}
              options={roleOptions}
              className='react-select'
              classNamePrefix='select'
              theme={selectThemeColors}
              isMulti
              name='roles'
              id="roles"
              defaultValue={roles}
            />
          </FormGroup>
          <FormGroup>
            <Label for='location'>Location</Label>
            <Controller
              isClearable
              as={Select}
              id='location'
              control={control}
              name='location'
              options={locationOptions}
              className='react-select'
              classNamePrefix='select'
              theme={selectThemeColors}
              defaultValue={locationOptions[0]}
            />
          </FormGroup>
        </FormContainer>
        {/* <SkillsWrapper className="p-1 border-primary rounded">
          <SkillItem>
            <CustomInput inline type='checkbox' id='exampleCustomCheckbox' defaultChecked label=".NET" />
            <Controller
              isClearable
              as={Select}
              id='react-select'
              control={control}
              name='ReactSelect'
              options={levelOptions}
              className='react-select'
              classNamePrefix='select'
              theme={selectThemeColors}
            />
          </SkillItem>
          <SkillItem>
            <CustomInput inline type='checkbox' id='exampleCustomCheckbox' defaultChecked label="Java" />
            <Controller
              isClearable
              as={Select}
              id='react-select'
              control={control}
              name='ReactSelect'
              options={levelOptions}
              className='react-select'
              classNamePrefix='select'
              theme={selectThemeColors}
            />
          </SkillItem>
          <SkillItem>
            <CustomInput inline type='checkbox' id='exampleCustomCheckbox' defaultChecked label="Project Management" />
            <Controller
              isClearable
              as={Select}
              id='react-select'
              control={control}
              name='ReactSelect'
              options={levelOptions}
              className='react-select'
              classNamePrefix='select'
              theme={selectThemeColors}
            />
          </SkillItem>
        </SkillsWrapper> */}
        <SideBarFooter className="mt-1">
          <Button color='primary' type='submit'>
            Save
          </Button>
          <Button color='primary' outline className="ml-1" onClick={onClose}>
            Cancel
          </Button>
        </SideBarFooter>
        <Result>
          <pre>{JSON.stringify(data, null, 4)}</pre>
        </Result>
      </Form>
    </Sidebar>
  )
}

const FormContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  columnGap: '1rem'
})

const SideBarFooter = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end'
})

const SkillItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  '& > *': {
    flex: 1
  }
})

const SkillsWrapper = styled('div')({
  '& > * + *': {
    marginTop: '1rem'
  }
})

const Result = styled('div')({
  marginTop: '1rem',
  height: 300,
  '& > pre': {
    padding: '1rem'
  }
})

export default ListEditEmployee
