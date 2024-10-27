const displayINRCurrency = (num) =>{
    const formatter = new Intl.NumberFormat('vi-VI',{
        style : "currency",
        currency : 'VND',
        minimumFractionDigits : 0   // nếu tính theo ngoại tệ thì thêm 2 số 0 phía sau
    })
    return formatter.format(num)

}

export default displayINRCurrency

