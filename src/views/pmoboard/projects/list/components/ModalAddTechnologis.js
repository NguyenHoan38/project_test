import React, { useState } from 'react'
import { Button, Modal, ModalHeader, FormGroup, Label, ModalBody, ModalFooter, Input } from 'reactstrap'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
const ModalExample = ({ modal, toggle }) => {
    const { register, errors, handleSubmit } = useForm()
    const handleToggleForm = () => {
        if (toggle) toggle()
    }
    const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={toggle}>&times;</button>
    const onSubmit = values => {
        const technologys = []
        technologyStack.map(res => {
            technologys.push(res.value)
        })
        if (isObjEmpty(errors)) {

        }
    }
    return (
        <div>
            <Modal isOpen={modal} toggle={handleToggleForm} external={externalCloseBtn}>
                <ModalHeader>ADD Technologies</ModalHeader>
                {/* <Form onSubmit={handleSubmit(onSubmit)}> */}
                <ModalBody>
                    <div className="col-12">
                        <FormGroup>
                            <Label for='name'>
                                Project Name <span className='text-danger'>*</span>
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
                    <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
                {/* </Form> */}
            </Modal>
        </div>
    )
}

export default ModalExample