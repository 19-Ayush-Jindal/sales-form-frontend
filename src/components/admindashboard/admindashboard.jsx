import "./admindashboard.css";
function AdminDashboard({
    onClose,
    onManageProducts,
    onManageBuyers,
    onManageTrucks
}) {

    return (

        <div className="admin-overlay">

            <div className="admin-dashboard">

                <div className="admin-header">

                    <h2>
                        Admin Dashboard
                    </h2>

                    <button
                        type="button"
                        className="close-btn"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>

                <div className="admin-actions">

                    <button
                        type="button"
                        className="admin-card"
                        onClick={onManageProducts}
                    >
                        Manage Products
                    </button>

                    <button
                        type="button"
                        className="admin-card"
                        onClick={onManageBuyers}
                    >
                        Manage Buyers
                    </button>

                    <button
                        type="button"
                        className="admin-card"
                        onClick={onManageTrucks}
                    >
                        Manage Trucks
                    </button>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;