import { Outlet } from 'react-router'

import Sidebar from './sidebar/sidebar'

function OutletComponent() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default OutletComponent
