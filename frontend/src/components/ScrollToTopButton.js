import React, { useEffect, useState } from 'react';
import { FiUpload } from "react-icons/fi";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOerTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !isMobileOerTablet) { // Thay đổi giá trị này theo nhu cầu
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const handleResize = () =>{
        setIsMobileOrTablet(window.innerWidth <= 1024);   // Thay đổi kích thuớ theo nhu cầu
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    handleResize();     // Gọi hàm kiểm tra kích thước ban đầu

    return() =>{
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
    };
  },[isMobileOerTablet]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Cuộn mượt
    });
  };

  return (
    isVisible &&  !isMobileOerTablet && (
      <button 
        onClick={scrollToTop} 
        style={buttonStyle}
      >
        {/* Lên đầu trang */}
        <FiUpload />
      </button>
    )
  );
};

// Style cho nút bấm
const buttonStyle = {
    position: 'fixed',
    bottom: '170px',
    right: '20px',
    padding: '10px',
    backgroundColor: 'transparent', // Không có nền
    border: '2px solid #007bff', // Viền màu xanh
    borderRadius: '5px',
    color: '#007bff', // Màu biểu tượng
    cursor: 'pointer',
    zIndex: 1000,
    transition: 'background-color 0.3s, color 0.3s', // Hiệu ứng chuyển tiếp
  };

export default ScrollToTopButton;
