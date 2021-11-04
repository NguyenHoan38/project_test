import { yupResolver } from '@hookform/resolvers/yup'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import { selectThemeColors } from '@utils'
import classnames from 'classnames'
import { memo, useState } from 'react'
import Flatpickr from 'react-flatpickr'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import Select from 'react-select'
import { Button, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import styled from 'styled-components'
import * as yup from 'yup'
import Sidebar from '../ListSidebar'

import ListSkills from './ListSkills'

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

const ListAddEmployee = (props) => {
  const { open, onClose } = props
  const allRoles = useSelector((state) => state.employees.roles)
  const [skills, setSkills] = useState([])

  const handleSetSkills = (skills) => {
    setSkills(skills)
  }

  const { errors, handleSubmit, control } = useForm({
    mode: 'onChange',
    resolver: yupResolver(EmployeeSchema),
    defaultValues: {
      name: '',
      dob: new Date(),
      email: '',
      phone: '',
      statusDetail: null,
      locationDetail: null,
      roles: []
    }
  })

  const onSubmit = async (data) => {
    console.log(JSON.stringify(data, null, 2))
  }

  return (
    <Sidebar open={open} title="Add Employee" onClose={onClose}>
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
                'is-invalid': Boolean(errors.name?.message)
              })}
            />
            {errors.name?.message && (
              <FormFeedback>{errors.name.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone *</Label>
            <Controller
              control={control}
              id="phone"
              name="phone"
              as={Input}
              className={classnames({
                'is-invalid': Boolean(errors.phone?.message)
              })}
            />
            {errors.phone?.message && (
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
                'is-invalid': Boolean(errors.email?.message)
              })}
            />
            {errors.email?.message && (
              <FormFeedback>{errors.email.message}</FormFeedback>
            )}
          </FormGroup>
          <FormGroup>
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
              className={classnames({
                'is-invalid': Boolean(errors.statusDetail?.message)
              })}
              getOptionLabel={(option) => {
                return option.name
              }}
              getOptionValue={(option) => {
                return option.id
              }}
            />
            {errors.statusDetail?.message && (
              <FormFeedback>{errors.statusDetail.message}</FormFeedback>
            )}
          </FormGroup>
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
              className={classnames({
                'is-invalid': Boolean(errors.locationDetail?.message)
              })}
              getOptionLabel={(option) => {
                return option.name
              }}
              getOptionValue={(option) => {
                return option.id
              }}
            />
            {errors.locationDetail?.message && (
              <FormFeedback>{errors.locationDetail.message}</FormFeedback>
            )}
          </FormGroup>
        </FormContainer>
        <FormContainer>
          <FormGroup>
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
              className={classnames({
                'is-invalid': Boolean(errors.roles?.message)
              })}
              getOptionLabel={(option) => {
                return option.name
              }}
              getOptionValue={(option) => {
                return option.id
              }}
            />
            {errors.roles?.message && (
              <FormFeedback>{errors.roles.message}</FormFeedback>
            )}
          </FormGroup>
        </FormContainer>
        <ListSkills onSetSkills={handleSetSkills} />
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

export default memo(ListAddEmployee)
