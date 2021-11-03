import { XSquare } from 'react-feather'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import styled from 'styled-components'

const Sidebar = (props) => {
  const { open, onClose, title, children } = props

  const CloseIcon = (
    <XSquare className="cursor-pointer" size={20} onClick={onClose} />
  )

  return (
    <StyledModal isOpen={open} toggle={onClose} className="modal-medium">
      <ModalHeader
        className="mb-1"
        toggle={onClose}
        tag="div"
        close={CloseIcon}
      >
        <h5 className="modal-title">{title}</h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">{children}</ModalBody>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)({
  '&.modal-medium': {
    '@media (min-width: 992px)': {
      maxWidth: 620
    }
  }
})

export default Sidebar
