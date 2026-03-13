import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './Components/ThemeContext'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Layout from './Components/layout'
import PortalLayout from './Components/PortalLayout'
import Profile from './Pages/Profile'
import Settings from './Pages/Settings'
import Analytics from './Pages/Dashboard/Analytics'
import Reports from './Pages/Dashboard/Reports'
import LoaderDemo from './Pages/LoaderDemo'

// Admin pages
import AdminDashboard      from './Pages/Admin/AdminDashboard'
import OrderManagement     from './Pages/Admin/OrderManagement'
import ClientManagement    from './Pages/Admin/ClientManagement'
import UserManagement      from './Pages/Admin/UserManagement'
import CommunicationTriggers from './Pages/Admin/CommunicationTriggers'
import ClientBranding      from './Pages/Admin/ClientBranding'
import InvoiceSummary      from './Pages/Admin/InvoiceSummary'

export default function App() {
  return (
    <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Portal */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard"      element={<PortalLayout role="admin" title="Dashboard">       <AdminDashboard />       </PortalLayout>} />
        <Route path="/admin/orders"         element={<PortalLayout role="admin" title="Order Management"><OrderManagement />      </PortalLayout>} />
        <Route path="/admin/clients"        element={<PortalLayout role="admin" title="Client Management"><ClientManagement />    </PortalLayout>} />
        <Route path="/admin/users"          element={<PortalLayout role="admin" title="User Management"> <UserManagement />       </PortalLayout>} />
        <Route path="/admin/communications" element={<PortalLayout role="admin" title="Email Triggers">  <CommunicationTriggers /></PortalLayout>} />
        <Route path="/admin/branding"       element={<PortalLayout role="admin" title="Branding">        <ClientBranding />       </PortalLayout>} />
        <Route path="/admin/invoices"       element={<PortalLayout role="admin" title="Invoices">        <InvoiceSummary />       </PortalLayout>} />
        
        {/* Dashboard Routes */}
        <Route path="/home" element={<Layout title="Dashboard"><Home /></Layout>} />
        <Route path="/home/analytics" element={<Layout title="Analytics"><Analytics /></Layout>} />
        <Route path="/home/reports" element={<Layout title="Reports"><Reports /></Layout>} />
        <Route path="/home/statistics" element={<Layout title="Statistics"><Analytics /></Layout>} />
        <Route path="/home/tables" element={<Layout title="Data Tables"><Reports /></Layout>} />
        
        {/* User Routes */}
        <Route path="/users" element={<Layout title="Users"><Profile /></Layout>} />
        <Route path="/users/all" element={<Layout title="All Users"><Profile /></Layout>} />
        <Route path="/users/roles" element={<Layout title="User Roles"><Settings /></Layout>} />
        
        {/* Product Routes */}
        <Route path="/products" element={<Layout title="Products"><Home /></Layout>} />
        <Route path="/products/all" element={<Layout title="All Products"><Home /></Layout>} />
        <Route path="/products/categories" element={<Layout title="Categories"><Settings /></Layout>} />
        
        {/* Profile Route */}
        <Route path="/profile" element={<Layout title="Profile"><Profile /></Layout>} />

        {/* Loader Demo */}
        <Route path="/loader-demo" element={<Layout title="Loader Demo"><LoaderDemo /></Layout>} />
        
        {/* Settings Routes */}
        <Route path="/settings" element={<Layout title="Settings"><Settings /></Layout>} />
        <Route path="/settings/notifications" element={<Layout title="Notifications"><Settings /></Layout>} />
        <Route path="/settings/security" element={<Layout title="Security"><Settings /></Layout>} />
        <Route path="/settings/appearance" element={<Layout title="Appearance"><Settings /></Layout>} />
        <Route path="/settings/language" element={<Layout title="Language"><Settings /></Layout>} />
      </Routes>
    </Router>
    </ThemeProvider>
  )
}