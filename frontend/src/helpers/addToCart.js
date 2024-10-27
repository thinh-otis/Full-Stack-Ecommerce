import SummaryApi from "../common"
import {toast} from "react-toastify"

const addToCart = async(e, id, user)=>{
    e?.stopPropagation()
    e?.preventDefault()

     // Kiểm tra xem người dùng đã đăng nhập chưa
     if (!user) {
        toast.error("Bạn cần đăng nhập để thêm vào giỏ hàng");
        return;
    }
    try {
    const response = await fetch(SummaryApi.addToCartProduct.url,{
        method : SummaryApi.addToCartProduct.method,
        credentials : 'include',
        headers :{
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            productId : id
        })
    })
    const responseData = await response.json()

    if(responseData.success){
        toast.success(responseData.message)
    }else {
        toast.error(responseData.message);
    }
} catch (error) {
    toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    console.error("Add to cart error:", error);
}
}

export default addToCart