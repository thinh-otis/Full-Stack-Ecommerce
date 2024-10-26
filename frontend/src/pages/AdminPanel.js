import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from '../common/role'

function AdminPanel() {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    useEffect(() =>{
        if(user?.role !== ROLE.ADMIN){
            navigate("/")
        }
    }, [user, navigate])

    if (!user || user.role !== ROLE.ADMIN) {
        return null;  // Không hiển thị giao diện nếu không phải là admin
    }
    
    return (
        <div className='min-h-[calc(100vh-120px)] md:flex hidden'>

            <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
                <div className='h-32 flex justify-center items-center flex-col'>
                    <div className="text-5xl cursor-pointer relative flex justify-center">
                        {
                            user?.profilePic ? (
                                <img src={user?.profilePic} alt={user?.name} className="w-20 h-20 rounded-full" />
                            ) : (
                                <FaRegUser />
                            )
                        }
                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                    <p className='text-sm'>{user?.role}</p>
                </div>

                {/* navigation */}
                <div>
                    <nav className='grid'>
                        <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100 hover:text-red-400 capitalize'>Người sử dụng</Link>
                        <Link to={"all-products"} className='px-2 hover:bg-slate-100 hover:text-red-400 capitalize'>Tất cả sản phẩm</Link>
                    </nav>
                </div>
            </aside>

            <main className='w-full h-full p-2'>
                <Outlet/>
            </main>
        </div>
    )
}

export default AdminPanel
