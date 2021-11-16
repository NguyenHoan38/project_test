import { yupResolver } from '@hookform/resolvers/yup'
import '@styles/base/pages/page-auth.scss'
import classNames from 'classnames'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardTitle, CustomInput, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import * as yup from 'yup'

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be a valid email')
    .required('Email is a required field'),
  password: yup.string().max(255).required('Password is a required field')
})

const LoginV1 = () => {
  const { errors, handleSubmit, control } = useForm({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data) => {
    console.log(data)
  }

  return (
    <div className='auth-wrapper auth-v1 px-2'>
      <div className='auth-inner py-2'>
        <Card className='mb-0'>
          <CardBody>
            <CardTitle tag='h4' className='mb-1 text-center'>
              PMO
            </CardTitle>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Controller
                  control={control}
                  id="email"
                  name="email"
                  as={Input}
                  className={classNames({
                    'is-invalid': Boolean(errors.email?.message)
                  })}
                  autoFocus
                />
                {errors.email?.message && (
                  <FormFeedback>{errors.email.message}</FormFeedback>
                )}
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='/pages/forgot-password-v1'>
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <Controller
                  control={control}
                  id="password"
                  name="password"
                  type="password"
                  as={Input}
                  className={classNames({
                    'is-invalid': Boolean(errors.password?.message)
                  })}
                />
                {errors.password?.message && (
                  <FormFeedback>{errors.password.message}</FormFeedback>
                )}
              </FormGroup>
              <FormGroup>
                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Remember Me' />
              </FormGroup>
              <Button.Ripple color='primary' block type="submit">
                Sign in
              </Button.Ripple>
            </Form>
            <p className='text-center mt-2'>
              <span className='mr-25'>New on our platform?</span>
              <Link to='/pages/register-v1'>
                <span>Create an account</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default LoginV1
