import Sidebar from '../components/Sidebar.jsx'
import Topbar from '../components/Topbar.jsx'

export default function Layout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Topbar />
        <main className="container-fluid py-3">{children}</main>
      </div>
    </div>
  )
}
