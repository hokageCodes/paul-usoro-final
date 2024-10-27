/* eslint-disable react/prop-types */
const AdminLayout = ({ children }) => (
    <div className="admin-layout">
      <header>Admin Header</header>
      <aside>Sidebar</aside>
      <main>{children}</main>
    </div>
  );
  
  export default AdminLayout;
  