import { Link } from "react-router"
import './AdminDashboard.css'
function AdminDashboard() {
    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="admin-dashboard-links">
                <Link to="/admin/registration-requests">Registration Requests</Link>
            </div>
        </div>
    )
}
export default AdminDashboard
