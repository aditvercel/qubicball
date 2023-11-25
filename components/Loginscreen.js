import Link from "next/link";
import React from "react";

export default function Loginscreen() {
  return (
    <div className="p-5 flex gap-2">
      <div className="bg-black h-screen w-1/2 rounded-xl grid align-middle p-5 relative">
        <div className=" text-white font-medium text-3xl z-10">
          Todo From<br></br> queball
        </div>
        <div className="w-3/4 h-3/4 absolute top-0 left-0 right-0 bottom-0 m-auto z-0 items-center flex">
          <img src="https://magma.com/images/credit-art.e678fa3825f5488ee2681419f56e42d9.png" />
        </div>
      </div>
      <div className="bg-white h-screen w-1/2 grid items-center">
        <div className="grid align-middle justify-center p-10">
          <div className=" font-bold text-2xl mb-2">
            {" "}
            Productive Mind
            <div className=" text-sm">by@adityamms</div>
          </div>
          <div className=" w-200px] text-sm font-light">
            {" "}
            lorem ipsum sadasdasdadsadadasdasds dsadsadasdsads sadasdsada
            dsadasdsadasdsad
          </div>
          <Link href={"/signup"}>
            <div className=" border h-10 text-center justify-center align-middle items-center flex mt-10 bg-yellow-500 rounded-xl">
              {" "}
              <div>get started </div>
            </div>
          </Link>
          <div className="mt-2 text-end">
            already have an account ?
            <Link href={"/signin"} className=" text-red-500 ml-2">
              {" "}
              signin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
