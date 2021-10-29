// ** User List Component
import ListEmployees from './ListEmployees'

// ** Styles
import '@styles/react/apps/app-users.scss'

const List = () => {
  return (
    <div className='app-user-list'>
      <ListEmployees />
    </div>
  )
}

export default List
