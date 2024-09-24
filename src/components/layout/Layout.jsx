import { Header } from "./Header"
import { SideBar } from "./Sidebar"

export const Layout = ({ children }) => {

    return (
        <>
            <Header />
        
            <div className="dashboard-container">
                <SideBar />
        
                <div className="dashboard-main">
                    { children }
                </div>
            </div>
        </>
    )
}
