// import React, { useEffect, useState } from 'react';
// import SummaryApi from '../common';

// const TrafficDataComponent = () => {
//     const [totalVisits, setTotalVisits] = useState([]);

//     const fetchTrafficData = async () => {
//         try {
//             const response = await fetch(SummaryApi.trafficData.url, {
//                 method: SummaryApi.trafficData.method,
//                 credentials: 'include',
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             });
//             const data = await response.json();
//             console.log(data); // Kiểm tra dữ liệu nhận được

//             // Tính tổng lượt truy cập
//             const total = data.reduce((sum, item) => sum + item.visits, 0);
//             setTotalVisits(total);
//         } catch (error) {
//             console.error('Error fetching traffic data:', error);
//         }
//     };
    

//     const trackTraffic = async () => {
//         try {
//             const response = await fetch(SummaryApi.trackTraffic.url, {
//                 method: SummaryApi.trackTraffic.method,
//                 credentials: 'include', 
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to track traffic');
//             }
//             console.log('Traffic recorded successfully');
//         } catch (error) {
//             console.error('Error tracking traffic:', error);
//         }
//     };

//     useEffect(() => {
//         trackTraffic(); // Ghi nhận lượt truy cập khi component được mount
//         fetchTrafficData(); // Lấy dữ liệu giao thông
//     }, []);

//     return (
//         <div translate='no' className='p-4'>
//             <h1 className='text-lg text-red-400 font-medium'>Lượt truy cập</h1>
//             {totalVisits === 0 ? (
//                 <p className='text-slate-400'>Không có dữ liệu lượt truy cập.</p>
//             ) : (
//                 <p className='text-slate-400 font-medium total-visits'>Tổng lượt truy cập: {totalVisits}</p> // Hiển thị tổng lượt truy cập
//             )}
//         </div>
//     );
// };

// export default TrafficDataComponent;



import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';

const TrafficDataComponent = () => {
    const [todayVisits, setTodayVisits] = useState(0);
    const [monthlyVisits, setMonthlyVisits] = useState(0);

    const fetchTrafficData = async () => {
        try {
            const response = await fetch(SummaryApi.trafficData.url, {
                method: SummaryApi.trafficData.method,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();

            // Lấy dữ liệu tháng hiện tại
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();

            // Lọc dữ liệu cho ngày hôm nay
            const todayData = data.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate.getDate() === currentDate.getDate() &&
                       itemDate.getMonth() === currentMonth &&
                       itemDate.getFullYear() === currentYear;
            });

            // Lọc dữ liệu cho tháng hiện tại
            const monthlyData = data.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
            });

            // Tính tổng lượt truy cập cho hôm nay
            const todayTotal = todayData.reduce((sum, item) => sum + item.visits, 0);
            setTodayVisits(todayTotal);

            // Tính tổng lượt truy cập cho tháng này
            const monthlyTotal = monthlyData.reduce((sum, item) => sum + item.visits, 0);
            setMonthlyVisits(monthlyTotal);
        } catch (error) {
            console.error('Error fetching traffic data:', error);
        }
    };

    // const trackTraffic = async () => {
    //     try {
    //         const currentDate = new Date()
    //         const currentMonth = currentDate.getMonth()
    //         const currentYear = currentDate.getFullYear()

    //         // Lấy dữ liệu traffic hiện tại từ DB
    //         const response = await fetch(SummaryApi.trackTraffic.url);
    //         const data = await response.json();
    //         const monthlyData = data.filter(item =>{
    //             const itemDate = new Date(item.date);
    //             return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
    //         });
            
    //         // Nếu tháng hiện tại khác với tháng của dữ liệu, đặt lại lượt truy cập
    //         if(monthlyData.length === 0){
    //             await Traffic.deleteMany({});   // Xoá tất cả dữ liệu nếu không có dữ liệu của tháng này
    //         }

    //         const trafficData = new Traffic({
    //             date: currentDate,
    //             visits: 1,
    //         });
    //         await trafficData.save();
    //         console.log('Traffic recorded successfully');
    //     } catch (error) {
    //         console.error('Error tracking traffic', error);
    //     }
    // };


    const trackTraffic = async () => {
        try {
            const response = await fetch(SummaryApi.trackTraffic.url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to track traffic');
            }
    
            console.log('Traffic recorded successfully');
        } catch (error) {
            console.error('Error tracking traffic:', error);
        }
    };
    



    useEffect(() => {
        trackTraffic();
        fetchTrafficData();
    }, []);

    return (
        <div translate='no' className='px-4 py-1 flex justify-around'>
            {/* <h1 className='text-slate-400 text-lg font-bold underline'>Lượt truy cập</h1> */}
            {todayVisits === 0 ? (
                <p>Không có lượt truy cập hôm nay.</p>
            ) : (
                <p className="text-red-400">Lượt truy cập hôm nay: {todayVisits}</p>
            )}
            {monthlyVisits === 0 ? (
                <p>Không có dữ liệu lượt truy cập cho tháng này.</p>
            ) : (
                <p className="text-blue-600">Tổng lượt truy cập tháng này: {monthlyVisits}</p>
            )}
        </div>
    );
};

export default TrafficDataComponent;







// import React, { useEffect, useState } from 'react';
// import SummaryApi from '../common';
// import Traffic from '../../../backend/models/Traffic';

// const TrafficDataComponent = () => {
//     const [todayVisits, setTodayVisits] = useState(0);
//     const [monthlyVisits, setMonthlyVisits] = useState(0);

//     const fetchTrafficData = async () => {
//         try {
//             const response = await fetch(SummaryApi.trafficData.url, {
//                 method: SummaryApi.trafficData.method,
//                 credentials: 'include',
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             });
//             const data = await response.json();

//             // Lọc dữ liệu cho ngày hôm nay
//             const todayData = data.filter(item => {
//                 const itemDate = new Date(item.date);
//                 const currentDate = new Date();
//                 return itemDate.getDate() === currentDate.getDate() &&
//                        itemDate.getMonth() === currentDate.getMonth() &&
//                        itemDate.getFullYear() === currentDate.getFullYear();
//             });

//             // Lọc dữ liệu cho tháng hiện tại
//             const monthlyData = data.filter(item => {
//                 const itemDate = new Date(item.date);
//                 const currentDate = new Date();
//                 return itemDate.getMonth() === currentDate.getMonth() && 
//                        itemDate.getFullYear() === currentDate.getFullYear();
//             });

//             // Tính tổng lượt truy cập
//             setTodayVisits(todayData.reduce((sum, item) => sum + item.visits, 0));
//             setMonthlyVisits(monthlyData.reduce((sum, item) => sum + item.visits, 0));
//         } catch (error) {
//             console.error('Error fetching traffic data:', error);
//         }
//     };

//     const trackTraffic = async () => {
//         try {
//             const currentDate = new Date();
//             const currentMonth = currentDate.getMonth();
//             const currentYear = currentDate.getFullYear();

//             // Lấy dữ liệu traffic hiện tại từ DB
//             const response = await fetch(SummaryApi.trackTraffic.url);
//             const data = await response.json();

//             // Lọc dữ liệu tháng hiện tại
//             const monthlyData = data.filter(item => {
//                 const itemDate = new Date(item.date);
//                 return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
//             });
            
//             // Nếu tháng hiện tại khác với tháng của dữ liệu, đặt lại lượt truy cập
//             if (monthlyData.length === 0) {
//                 await Traffic.deleteMany({}); // Xoá tất cả dữ liệu nếu không có dữ liệu của tháng này
//             }

//             const trafficData = new Traffic({
//                 date: currentDate,
//                 visits: 1,
//             });

//             await trafficData.save(); // Lưu dữ liệu traffic
//             console.log('Traffic recorded successfully');
//         } catch (error) {
//             console.error('Error tracking traffic:', error);
//         }
//     };

//     useEffect(() => {
//         trackTraffic();
//         fetchTrafficData();
//     }, []);

//     return (
//         <div translate='no' className='px-4 py-1 flex justify-around'>
//             {todayVisits === 0 ? (
//                 <p>Không có lượt truy cập hôm nay.</p>
//             ) : (
//                 <p className="text-red-400">Lượt truy cập hôm nay: {todayVisits}</p>
//             )}
//             {monthlyVisits === 0 ? (
//                 <p>Không có dữ liệu lượt truy cập cho tháng này.</p>
//             ) : (
//                 <p className="text-blue-600">Tổng lượt truy cập tháng này: {monthlyVisits}</p>
//             )}
//         </div>
//     );
// };

// export default TrafficDataComponent;

