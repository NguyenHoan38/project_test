export const columns = [
    {
      name: 'Employee',
      selector: 'Title',
      sortable: true,
      filterable: true
    },
    {
      name: 'Main headcount',
      selector: 'year',
      sortable: true,
      right: true
    },
    {
        name: 'Shadow for ',
        selector: 'year',
        sortable: true,
        right: true
    },
    {
        name: 'Effort',
        selector: 'year',
        sortable: true,
        right: true
    },
    {
        name: 'Role',
        selector: 'year',
        sortable: true,
        right: true
    },
    {
        name: 'Duration',
        selector: 'year',
        sortable: true,
        right: true
    }
  ]
  
  export const  projectColor = [
    {
      id:1,
      background:' Teal'
    },
    {
      id:2,
      background:' Red'
    },
    {
      id:3,
      background:'Lime'
    },
    {
      id:4,
      background:'Blue'
    },
    {
      id:5,
      background:'Maroon'
    },
    {
      id:6,
      background:'Olive'
    },
    {
      id:7,
      background:'Purple'
    },
    {
      id:8,
      background:'Navy'
    },
    {
      id:9,
      background:'Gray'
    },
    {
      id:10,
      background:'Black'
    },
    {
      id:11,
      background:'Yellow'
    },
    {
      id:11,
      background:'Green'
    }
  ]
  export default {
    columns,
    projectColor
  }