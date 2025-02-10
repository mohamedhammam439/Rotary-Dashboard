import { Outlet } from "react-router-dom"
import { MySideBar } from "../components/SideBar"

export const MainLayout =()=>{
    return(
        <>
            <div className="container flex flex-row">
                <div className="flex-none">
                    <MySideBar />
                </div>
                <div className="flex-1 p-4">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
