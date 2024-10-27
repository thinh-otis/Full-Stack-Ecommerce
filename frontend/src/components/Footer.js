import React from "react";
import { CiMail } from "react-icons/ci";
import LOGOIMAGE from '../assest/dathongbao.png'

function Footer() {
  return (
    <footer className="bg-blue-500">
      {/* <div className="container mx-auto p-4">
        <p className="text-center font-bold" title="...">Cty TNHH TM-DV <p className="-mt-6 ml-52 text-red-600"> Thịnh Otis</p></p>
        <address className="content">Số..đường . Quận . Phường .  Hồ Chí Minh city</address>
      </div> */}
        <div className="container max-w-full px-4 py-2">

              <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2">
                      <h4 className=" text-yellow-50 text-xl font-medium">CÔNG TY TNHH MTV </h4>

                      <p className=" text-yellow-50">Địa chỉ: Đường, Phường , Quận , TP.HCM</p>
                      <div className="flex flex-col sm:flex-row text-yellow-50"><p>Điện thoại: <strong className="text-red-700">0912.345.678 -&nbsp;</strong><strong className="text-red-700">0912.345.678</strong></p><p className="ml-14 flex flex-row items-center gap-1"><CiMail className="text-red-600 text-xl"/> <strong className="text-slate-700"> diachi@gmail.com</strong></p></div>
                      <p className=" text-yellow-50"><span className="text-yellow-500"> <strong> Thời gian làm việc: Từ 09h - 19h (Từ thứ 2 -&gt; thứ 7)
                      Nhận bảo hành hàng lỗi sau 12h</strong></span></p>
                      <p className="font-medium text-white">GCNDK Hộ Kinh Doanh số: 4XXXXXXXXX do UBND Quận cấp ngày XX/XX/20XX
                      MST: 031XXXXXXX do Chi Cục Thuế Quận cấp ngày XX/XX/20XX</p>
                      {/* <div className="flex items-center py-2 px-4">
                          
                      </div> */}
                  </div>
                  <div className="w-full md:w-1/2">
                      <div className="float-right p-3 pr-11 bg-white rounded-custom">
                          <a target={'_blank'} rel="noreferrer noopener" href={"http://online.gov.vn"} >
                              <img src={LOGOIMAGE} align={'right'} width={250} className="rounded-xl" alt=""/>
                          </a>
                      </div>
                  </div>
              </div>
        </div>
        
    </footer>
  );
}

export default Footer;
