import React, { useState } from 'react'
import { Button, Modal, ModalHeader, FormGroup, Label, ModalBody, ModalFooter } from 'reactstrap'
const ModalExample = ({ modal, toggle }) => {

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
            {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
            {/* <Modal isOpen={modal} toggle={handleToggleForm} >
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal> */}

            <Modal isOpen={modal} toggle={handleToggleForm} external={externalCloseBtn}>
                <ModalHeader>ADD Technologies</ModalHeader>
                <Form onSubmit={handleSubmit(onSubmit)}>
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
                </Form>
            </Modal>
        </div>
    )
}

export default ModalExample