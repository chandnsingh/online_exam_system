import Sidebar from "./Dashboard_file/sidebar";
import MainProfile from "./Dashboard_file/main_profile";

function Dashboard() {
    return <div className="flex overflow-hidden">
        <Sidebar />
        <MainProfile />
     </div>
}

export default Dashboard