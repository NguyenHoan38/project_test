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
      background:' Black'
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
    }
    
  ]
  export default {
    columns,
    projectColor
  }