import { Outlet } from '@tanstack/react-router'
import SideBar from '@/components/SideBar'
import TopHeader from '@/components/TopHeader'
import '../styles.css'

function Root() {
  return (
    <div className="w-screen h-screen overflow-x-hidden ">
      {/* Navbar/Sidebar */}
      <SideBar />
      {/* Header */}
      <TopHeader />
      {/* content */}
      {/* <ProfilePage/> */}
      {/* <Workshop/> */}
      {/* <Billboard /> */}
      <Outlet />
    </div>
  )
}

export default Root
