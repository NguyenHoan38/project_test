import { X } from 'react-feather';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const Sidebar = (props) => {
  const { open, toggleSidebar, title, children } = props;

  return (
    <Modal
      isOpen={open}
      toggle={toggleSidebar}
      contentClassName="pt-0"
      modalClassName="modal-slide-in"
      className="sidebar-lg"
      style={{ width: '40%' }} // Tạm thời
    >
      <ModalHeader
        className="mb-1"
        toggle={toggleSidebar}
        close={
          <X className="cursor-pointer" size={15} onClick={toggleSidebar} />
        }
        tag="div"
      >
        <h5 className="modal-title">
          <span className="align-middle">{title}</span>
        </h5>
      </ModalHeader>
      <ModalBody className="flex-grow-1">{children}</ModalBody>
    </Modal>
  );
};

export default Sidebar;
