import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <span className="ms-1">&copy; 2024 creativeLabs.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Made by</span>
        <b>
          Group 7 - COS40006
        </b>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
