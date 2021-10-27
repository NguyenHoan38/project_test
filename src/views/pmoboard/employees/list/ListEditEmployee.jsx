import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import { useSelector } from 'react-redux'
import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, CustomInput } from 'reactstrap'
import styled from 'styled-components'
import * as yup from 'yup'
import { selectThemeColors } from '@utils'

const ListEditEmployee = (props) => {
  const { open, onClose } = props
  const selectedEmployee = useSelector(state => state.employees.selectedEmployee)

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

  const { fullName, email } = selectedEmployee

  const roleOptions = [
    { value: 'spm', label: 'SPM' },
    { value: 'devops', label: 'DevOps' },
    { value: 'developer', label: 'Developer' },
    { value: 'qalead', label: 'QA Lead' },
    { value: 'tester', label: 'Tester' },
    { value: 'ba', label: 'BA' },
    { value: 'intern', label: 'Intern' }
  ]

  const locationOptions = [
    { value: 'inhouse', label: 'In House' },
    { value: 'onsite', label: 'On site' }
  ]

  const levelOptions = [
    { value: 'level1', label: 'Level 1' },
    { value: 'level2', label: 'Level 2' },
    { value: 'level3', label: 'Level 3' }
  ]

  return (
    <Modal
      scrollable
      isOpen={open && selectedEmployee}
      toggle={onClose}
    >
      <ModalHeader toggle={onClose}>
        Employee Infomation
      </ModalHeader>
      <ModalBody>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label for='firstName'>Employees</Label>
            <Input
              id='firstName'
              name='firstName'
              innerRef={register({ required: true })}
              invalid={errors.firstName && true}
              placeholder='Bruce'
            />
            {errors && errors.firstName && <FormFeedback>{errors.firstName.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='lastName'>Code</Label>
            <Input
              id='lastName'
              name='lastName'
              innerRef={register({ required: true })}
              invalid={errors.lastName && true}
              placeholder='Wayne'
            />
            {errors && errors.lastName && <FormFeedback>{errors.lastName.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='email'>Date</Label>
            <Input
              type='email'
              name='email'
              id='email'
              innerRef={register({ required: true })}
              invalid={errors.email && true}
              placeholder='bruce.wayne@email.com'
            />
            {errors && errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='password'>Email</Label>
            <Input
              type='password'
              id='password'
              name='password'
              innerRef={register({ required: true })}
              invalid={errors.password && true}
              placeholder='password'
            />
            {errors && errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='firstName'>Phone</Label>
            <Input
              id='firstName'
              name='firstName'
              innerRef={register({ required: true })}
              invalid={errors.firstName && true}
              placeholder='Bruce'
            />
            {errors && errors.firstName && <FormFeedback>{errors.firstName.message}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for='react-select'>Role</Label>
            <Controller
              isClearable
              as={Select}
              id='react-select'
              control={control}
              name='ReactSelect'
              options={roleOptions}
              className='react-select'
              classNamePrefix='select'
              theme={selectThemeColors}
            />
          </FormGroup>
          <FormGroup>
            <Label for='react-select'>Location</Label>
            <Controller
              isClearable
              as={Select}
              id='react-select'
              control={control}
              name='ReactSelect'
              options={locationOptions}
              className='react-select'
              classNamePrefix='select'
              theme={selectThemeColors}
            />
          </FormGroup>
        </FormWrapper>
        <div className="p-1 border-primary rounded">
          <SkillItemWrapper>
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
          </SkillItemWrapper>
          <SkillItemWrapper>
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
          </SkillItemWrapper>
          <SkillItemWrapper>
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
          </SkillItemWrapper>
        </div>
        <div style={{ height: 300 }} />
      </ModalBody>
      <ModalFooter>
        <Button color='primary'>
          Save
        </Button>
        <Button color='primary' outline>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

const FormWrapper = styled(Form)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  columnGap: '1rem'
})

const SkillWrapper = styled('div')({

})

const SkillItemWrapper = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'center',
  '& > * + *': {
    marginTop: '1rem'
  }
})

export default ListEditEmployee
