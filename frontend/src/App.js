import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import Context from './context';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails, clearUserDetails } from './store/userSlice'; // Import clearUserDetails đã tạo trong userSlice
import TrafficDataComponent from './components/TrafficDataComponent';
import ScrollToTopButton from './components/ScrollToTopButton';

function App() {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  // Hàm lấy thông tin người dùng
  const fetchUserDetails = useCallback(async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include',
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
        localStorage.setItem('userDetails', JSON.stringify(dataApi.data)); // Lưu vào localStorage
      } else {
        dispatch(clearUserDetails());
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      dispatch(clearUserDetails());
      localStorage.removeItem('userDetails');
    }
  }, [dispatch]);


  const fetchUserAddToCart = useCallback(async () => {
    if (!user) return; // Kiểm tra user trước khi gọi API
    try {
      const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
        method: SummaryApi.addToCartProductCount.method,
        credentials: 'include',
      });

      const dataApi = await dataResponse.json();
      setCartProductCount(dataApi?.data?.count);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  },[user]);

  useEffect(() => {
    const savedUserDetails = localStorage.getItem('userDetails');
    if (savedUserDetails) {
      dispatch(setUserDetails(JSON.parse(savedUserDetails))); // Khôi phục Redux từ localStorage
    } else {
      dispatch(clearUserDetails()); // Xóa Redux nếu không có dữ liệu trong localStorage
    }
  }, [dispatch]);


  useEffect(() => {
    fetchUserAddToCart();
  }, [user, fetchUserAddToCart]); // Thêm user vào dependency array



  return (
    <>
      <Context.Provider value={{
        fetchUserDetails,
        cartProductCount,
        fetchUserAddToCart,
      }}>
        <ToastContainer position='top-center' />

        <Header />
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet />
        </main>
        <TrafficDataComponent />
        <ScrollToTopButton />
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
