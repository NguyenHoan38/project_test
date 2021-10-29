import { selectThemeColors } from '@utils'
import Select from 'react-select'
import { Button, Input, Label, Row } from 'reactstrap'
import { useState } from 'react'
import { useDebounce } from 'react-use'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

// const styles = {
//   multiValue: (base, state) => {
//     return { ...base, backgroundColor: state.data.color }
//   }
// }

const ListHeader = (props) => {
  const employeeSkills = useSelector(state => state.employees.skills)
  const { onSelectSkills, skills, onSearch } = props
  const [searchTerm, setSearchTerm] = useState('')

  const handleOnSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  useDebounce(() => {
    onSearch(searchTerm)
  }, 300, [searchTerm])

  const handleOnChangeSelect = (skills) => {
    onSelectSkills(skills)
  }

  const overflowSkills = skills.length >= 3

  const skillOptions = employeeSkills.map(({ id, name }) => ({ value: id, label: name }))

  return (
    <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
      <StyledRow>
        <SearchWrapper shink={overflowSkills} className="d-flex p-0">
          <div className='d-flex align-items-center'>
            <Label className='mb-0' for='search-invoice'>
              Search:
            </Label>
            <Input
              id='search-invoice'
              className='ml-50'
              type='text'
              value={searchTerm}
              onChange={handleOnSearchChange}
              placeHolder="Name or email"
            />
          </div>
        </SearchWrapper>
        <SkillsWrapper grow={overflowSkills} className="d-flex justify-content-end p-0">
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
              options={skillOptions}
              // styles={styles}
              className='react-select ml-50 w-100'
              classNamePrefix='select'
            />
          </div>
          <Button.Ripple color='primary' className="flex-shrink-0 align-self-start">
            Fillter
          </Button.Ripple>
        </SkillsWrapper>
      </StyledRow>
    </div>
  )
}

const StyledRow = styled(Row)({
  flexWrap: 'wrap',
  '& > *': {
    flex: 1
  }
})

const SearchWrapper = styled('div')(({ shink }) => ({
  transition: 'flex-grow 0.3s',
  ...(shink && {
    flexGrow: 1,
    marginRight: '1rem'
  })
}))

const SkillsWrapper = styled('div')(({ grow }) => ({
  transition: 'flex-grow 0.3s',
  ...(grow && {
    flexGrow: 3
  })
}))

export default ListHeader