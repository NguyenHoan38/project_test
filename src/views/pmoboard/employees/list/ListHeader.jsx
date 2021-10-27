import { selectThemeColors } from '@utils'
import Select from 'react-select'
import { Button, Col, Input, Label, Row } from 'reactstrap'

const colorOptions = [
  { value: 'react', label: 'React', color: '#00B8D9', isFixed: true },
  { value: 'angular', label: 'Angular', color: '#0052CC', isFixed: true },
  { value: 'net', label: '.NET', color: '#5243AA', isFixed: false },
  { value: 'java', label: 'Java', color: '#FF5630', isFixed: false },
  { value: 'node', label: 'Node.js', color: '#FF8B00', isFixed: false }
]

const styles = {
  multiValue: (base, state) => {
    return { ...base, backgroundColor: state.data.color }
  }
}

const ListHeader = (props) => {
  const { toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm, onSelectSkill, skills } = props

  const handleOnChangeSelect = (skill) => {
    onSelectSkill(skill)
  }

  return (
    <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
      <Row>
        <Col md='6' sm='12' className="d-flex p-0">
          <div className='d-flex align-items-center'>
            <Label className='mb-0' for='search-invoice'>
              Search:
            </Label>
            <Input
              id='search-invoice'
              className='ml-50'
              type='text'
              value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
            />
          </div>
        </Col>
        <Col md='6' sm='12' className="d-flex justify-content-end p-0">
          <div className='d-flex align-items-center mr-1 flex-grow-1'>
            <Label className='mb-0' for='select-skills'>Skills:</Label>
            <Select
              theme={selectThemeColors}
              // defaultValue={[colorOptions[2], colorOptions[3]]}
              onChange={handleOnChangeSelect}
              value={skills}
              isMulti
              name='colors'
              id="select-skills"
              options={colorOptions}
              styles={styles}
              className='react-select ml-50 w-100'
              classNamePrefix='select'
            />
          </div>
          <Button.Ripple color='primary'>
            Fillter
          </Button.Ripple>
        </Col>
      </Row>
    </div>
  )
}

export default ListHeader