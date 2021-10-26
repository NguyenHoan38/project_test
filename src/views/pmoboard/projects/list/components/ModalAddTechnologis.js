import React, { useState } from 'react'
import { Button, Modal, ModalHeader, FormGroup, Label, ModalBody, ModalFooter, Input, Form } from 'reactstrap'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import {useDispatch} from 'react-redux'
import { addProjectTechnology, addProjectDomain } from './../../store/action'
import { isObjEmpty } from '@utils'
const ModalExample = ({ modal, toggle, titleForm }) => {
    const dispatch = useDispatch()
    const { register, errors, handleSubmit } = useForm()
    const handleToggleForm = () => {
        if (toggle) toggle()
    }
    const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>
    const onSubmit = values => {
        if (isObjEmpty(errors)) {
            if (titleForm === 'Industry') {
                dispatch(
                    addProjectDomain({
                        name: values['name']
                    })
                )

            } else {
                dispatch(
                    addProjectTechnology({
                        name: values['name']
                    })
                )
            }

        }
    }
    return (
        <div>
            <Modal isOpen={modal} toggle={handleToggleForm} external={externalCloseBtn}>
                <ModalHeader>ADD {titleForm}</ModalHeader>
                <Form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                    <div className="col-12">
                        <FormGroup>
                            <Label for='name'>
                            {titleForm} Name <span className='text-danger'>*</span>
                            </Label>
                            <Input
                                name='name'
                                id='name'
                                innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors['name'] })}
                            />
                        </FormGroup>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type='submit' color="primary" onClick={toggle}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}

export default ModalExample