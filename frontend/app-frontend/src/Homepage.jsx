import { Link } from "react-router-dom";
import Homeicon from "./assets/icons/Homeicon";

import Profileicon from "./assets/icons/Profileicon";
import Tableicon from "./assets/icons/Tableicon";
import Dashboard from "./components/Dashborad";
export default function Homepage() {
    return (
        <>
         <div className="main-page flex p-5 min-h-full h-lvh">
            <div className="dashboard-navigation min-w-80 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden rounded-xl overflow-y-auto">
                <div className="navigation-head p-5 border">
                    <h6 className="text-white text-center">Wishlist Pro</h6>
                </div>
                <div className="navigation-list m-4">
                    <ul className="flex flex-col">
                        <li>
                            <Link to="/"  className="inline-block w-full px-4 py-2 text-left shadow-md bg-blue-500 hover:shadow-blue-500 rounded-xl overflow-hidden">
                                <button className="inline-flex w-full items-center text-white text-xl"><Homeicon /><p className="px-1">Dashboard</p></button>
                            </Link>
                        </li>
                        <li>
                         <Link to="/" className="inline-block w-full px-4 py-2 text-left shadow-md bg-transparent hover:shadow-gray-400 rounded-xl overflow-hidden">
                                <button className="inline-flex w-full items-center text-white text-xl"><Profileicon /><p className="px-1">Profile</p></button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/table" className="inline-block w-full px-4 py-2 text-left shadow-md bg-transparent hover:shadow-gray-400 rounded-xl overflow-hidden">
                                <button className="inline-flex w-full items-center text-white text-xl"><Tableicon /><p className="px-1">Table</p></button>
                            </Link>
                        </li>
                    </ul>
                    <div className="authpage">
                        <div>
                            <h6 className="text-white text-cente">AUTH PAGES</h6>
                        </div>
                        <ul className="flex flex-col">
                        <li>
                            <Link to="/signin" className="inline-block w-full px-4 py-2 text-left shadow-md bg-transparent hover:shadow-gray-400  rounded-xl overflow-hidden">
                                <button className="inline-flex w-full items-center text-white text-xl"><Homeicon /><p className="px-1">Sign In</p></button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/signup" className="inline-block w-full px-4 py-2 text-left shadow-md bg-transparent hover:shadow-gray-400  rounded-xl overflow-hidden">
                                <button className="inline-flex w-full items-center text-white text-xl"><Homeicon /><p className="px-1">Sign Up</p></button>
                            </Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
            <div className="dashboard flex-1">
                <Dashboard />
            </div>
         </div>
        </>
    )
} 