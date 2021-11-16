import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Input,
  Label,
  FormGroup,
  Row,
  Col
} from 'reactstrap'
import { useDebounce } from 'react-use'

function SearchField({onSearch}) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchNameChange = (e) => {
    setSearchTerm(e.target.value)
  }

  useDebounce(
    () => {
      onSearch(searchTerm)
    },
    300,
    [searchTerm]
  )
  return (
    <FormGroup>
      <Label for="name">Employee name:</Label>
      <Input
        id="name"
        value={searchTerm}
        onChange={handleSearchNameChange}
        placeholder="Ex: Bruce Wayne"
      />
    </FormGroup>
  )
}

export default SearchField
