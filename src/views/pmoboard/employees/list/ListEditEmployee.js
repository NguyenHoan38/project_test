import Sidebar from '@components/sidebar'
import { yupResolver } from '@hookform/resolvers/yup'
import { selectThemeColors } from '@utils'
import { useEffect, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import { Button, CustomInput, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import styled from 'styled-components'
import * as yup from 'yup'

const ListEditEmployee = (props) => {
  const { open, onClose } = props
  const selectedEmployee = useSelector(state => state.employees.selectedEmployee)
  const employeeRoles = useSelector(state => state.employees.roles)
  const [dob, setDob] = useState(new Date())
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [roles, setRoles] = useState([])

  useEffect(() => {
    if (selectedEmployee) {
      const { dob, email, phone } = selectedEmployee
      setDob(new Date(dob))
      setEmail(email)
      setPhone(phone)

    }
  }, [selectedEmployee])

  useEffect(() => {
    setRoles(employeeRoles)
  }, [employeeRoles])

  const handleOnChangeDob = (date) => {
    setDob(date)
  }

  const SignupSchema = yup.object().shape({
    email: yup.string().email().required(),
    lastName: yup.string().min(3).required(),
    firstName: yup.string().min(3).required(),
    password: yup.string().min(6).required()
  })

  const { register, errors, handleSubmit, control } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  const onSubmit = data => {
    console.log(data)
  }

  if (!selectedEmployee) {
    return null
  }

  const { name, id: employeeCode } = selectedEmployee

  const roleOptions = roles.map(({ id, name }) => ({ value: id, label: name }))

  const locationOptions = [
    { value: 1, label: 'In House' },
    { value: 2, label: 'On site' }
  ]

  return (
    <Sidebar
      size='lg'
      open={open && selectedEmployee}
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
            <Input
              id='name'
              name='name'
              innerRef={register({ required: true })}
              invalid={errors.name && true}
              value={name}
            />
            {errors && errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='employeeCode'>Code</Label>
            <Input
              id='employeeCode'
              name='employeeCode'
              innerRef={register({ required: true })}
              invalid={errors.employeeCode && true}
              value={employeeCode}
              disabled
            />
            {errors && errors.employeeCode && <FormFeedback>{errors.employeeCode.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='dob'>Date</Label>
            <Flatpickr
              className='form-control'
              innerRef={register({ required: true })}
              value={dob}
              id='dob'
              name="dob"
              onChange={handleOnChangeDob}
            />
            {errors && errors.dob && <FormFeedback>{errors.dob.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='email'>Email</Label>
            <Input
              id='email'
              name='email'
              innerRef={register({ required: true })}
              invalid={errors.email && true}
              value={email}
            />
            {errors && errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='phone'>Phone</Label>
            <Input
              id='phone'
              name='phone'
              innerRef={register({ required: true })}
              invalid={errors.phone && true}
              value={phone}
            />
            {errors && errors.phone && <FormFeedback>{errors.phone.message}</FormFeedback>}
          </FormGroup>
        </FormContainer>
        <FormContainer>
          <FormGroup>
            <Label for='role'>Role</Label>
            <Controller
              isClearable
              as={Select}
              id='role'
              control={control}
              name='role'
              options={roleOptions}
              className='react-select'
              classNamePrefix='select'
              theme={selectThemeColors}
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
            />
          </FormGroup>
        </FormContainer>
      </Form>
      <SideBarFooter>
        <Button color='primary'>
          Save
        </Button>
        <Button color='primary' outline className="ml-1" onClick={onClose}>
          Cancel
        </Button>
      </SideBarFooter>
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

export default ListEditEmployee
