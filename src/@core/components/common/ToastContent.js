import {  Fragment } from 'react'
import PropTypes from 'prop-types'

function ToastContent(props) {
    return (
        <div>
            <Fragment>
                <div className='toastify-header'>
                    <div className='title-wrapper'>
                        {/* <Avatar size='sm' color='success' icon={<Coffee size={12} />} /> */}
                        <h6 className='toast-title font-weight-bold'>{props.title}</h6>
                    </div>
                </div>
                {/* <div className='toastify-body'>
                    <span>You have successfully logged in as an {role} user to Vuexy. Now you can start to explore. Enjoy!</span>
                </div> */}
            </Fragment>
        </div>
    )
}

export default ToastContent