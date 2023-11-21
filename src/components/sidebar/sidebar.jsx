import React from "react";

import { BiEdit } from "react-icons/bi";
import {
  LuCircleDollarSign,
  LuLayoutGrid,
  LuList,
  LuNewspaper,
  LuPalmtree,
} from "react-icons/lu";
import {
  IoCashOutline,
  IoChevronDown,
  IoExitOutline,
  IoImageOutline,
  IoPeopleOutline,
} from "react-icons/io5";

import SidebarList from "./sidebarList";
import Dropdown from "../dropdown";

export default function SideBar(props) {
  const { isSidebarOpen } = props;

  return (
    <>
      <div className=" flex">
        <div
          className={` ${
            isSidebarOpen ? "w-72" : "w-0"
          } duration-300 h-full bg-white shadow-md`}
        >
          <div className=" flex items-center p-5 w-20  gap-5">
            <img
              src="/logoDisappear.png"
              alt="logo"
              className={`rounded origin-left duration-300 ${
                !isSidebarOpen && "scale-0"
              }`}
            />
            <h1
              className={` text-black origin-left duration-300 font-semibold text-xl ${
                !isSidebarOpen && " scale-0"
              }`}
            >
              DISAPPEAR
            </h1>
          </div>
          <hr
            className={`border-primary-green mx-5 border mb-1 origin-left duration-300 ${
              !isSidebarOpen && "scale-0"
            }`}
          />

          <div
            className={`pt-9 duration-300 origin-left ${
              !isSidebarOpen && " scale-0"
            } flex flex-col justify-between flex-grow h-screen`}
          >
            <div>
              <SidebarList
                to="/dashboard"
                label="Dasbor"
                icon={<LuLayoutGrid />}
                isSidebarOpen={isSidebarOpen}
              />
              <SidebarList
                label="Carousel"
                icon={<IoImageOutline />}
                isSidebarOpen={isSidebarOpen}
              />
              <SidebarList
                to="/category"
                label="Kategori"
                icon={<LuList />}
                isSidebarOpen={isSidebarOpen}
              />
              <SidebarList
                to="/produk"
                label="Produk"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10.6249 9.37527V13.7503C10.6249 13.916 10.559 14.075 10.4418 14.1922C10.3246 14.3094 10.1656 14.3753 9.99989 14.3753C9.83413 14.3753 9.67516 14.3094 9.55795 14.1922C9.44074 14.075 9.37489 13.916 9.37489 13.7503V9.37527C9.37489 9.20951 9.44074 9.05054 9.55795 8.93333C9.67516 8.81612 9.83413 8.75027 9.99989 8.75027C10.1656 8.75027 10.3246 8.81612 10.4418 8.93333C10.559 9.05054 10.6249 9.20951 10.6249 9.37527ZM18.739 7.66512L17.6561 15.7909C17.616 16.0912 17.4681 16.3667 17.2401 16.5662C17.012 16.7656 16.7193 16.8755 16.4163 16.8753H3.58348C3.2805 16.8755 2.98776 16.7656 2.7597 16.5662C2.53164 16.3667 2.38378 16.0912 2.34364 15.7909L1.26004 7.6659C1.23643 7.48926 1.25086 7.30961 1.30237 7.139C1.35388 6.96839 1.44127 6.81077 1.55869 6.6767C1.67611 6.54264 1.82083 6.43523 1.98316 6.36168C2.14549 6.28814 2.32167 6.25015 2.49989 6.25027H5.3413L9.53114 1.46355C9.58979 1.39705 9.66192 1.34379 9.74274 1.3073C9.82356 1.27082 9.91122 1.25195 9.99989 1.25195C10.0886 1.25195 10.1762 1.27082 10.257 1.3073C10.3379 1.34379 10.41 1.39705 10.4686 1.46355L14.6585 6.25027H17.4999C17.6779 6.25039 17.8538 6.28852 18.0159 6.36212C18.178 6.43571 18.3225 6.54308 18.4397 6.67703C18.5569 6.81098 18.6442 6.96843 18.6957 7.13883C18.7472 7.30923 18.7616 7.48866 18.7382 7.66512H18.739ZM7.00223 6.25027H12.9975L9.99989 2.82449L7.00223 6.25027ZM17.4999 7.50027H2.49989L3.58348 15.6253H16.4163L17.4999 7.50027ZM13.503 9.31277L13.0655 13.6878C13.0569 13.7697 13.0645 13.8525 13.088 13.9314C13.1114 14.0104 13.1503 14.0839 13.2023 14.1478C13.2542 14.2117 13.3183 14.2647 13.3909 14.3037C13.4634 14.3428 13.5429 14.3671 13.6249 14.3753C13.646 14.3764 13.6671 14.3764 13.6882 14.3753C13.843 14.3751 13.9922 14.3174 14.1069 14.2135C14.2217 14.1096 14.2938 13.9668 14.3093 13.8128L14.7468 9.43777C14.7633 9.27284 14.7137 9.10808 14.6088 8.97974C14.5039 8.85139 14.3523 8.76997 14.1874 8.7534C14.0225 8.73682 13.8577 8.78644 13.7294 8.89135C13.601 8.99625 13.5196 9.14784 13.503 9.31277ZM6.49676 9.31277C6.48019 9.14784 6.39877 8.99625 6.27043 8.89135C6.14208 8.78644 5.97732 8.73682 5.81239 8.7534C5.64746 8.76997 5.49587 8.85139 5.39096 8.97974C5.28606 9.10808 5.23644 9.27284 5.25301 9.43777L5.69051 13.8128C5.70606 13.9675 5.77871 14.1108 5.89428 14.2148C6.00985 14.3189 6.16003 14.3761 6.31551 14.3753C6.33659 14.3764 6.35772 14.3764 6.3788 14.3753C6.46046 14.3671 6.53971 14.3429 6.61202 14.304C6.68433 14.2652 6.74828 14.2125 6.80022 14.1489C6.85217 14.0854 6.89108 14.0122 6.91475 13.9336C6.93842 13.855 6.94638 13.7726 6.93817 13.6909L6.49676 9.31277Z"
                      fill="black"
                      className="hover:text-white"
                    />
                  </svg>
                }
                isSidebarOpen={isSidebarOpen}
              />
              <SidebarList
                to="/pelanggan"
                label="Pelanggan"
                icon={<IoPeopleOutline />}
                isSidebarOpen={isSidebarOpen}
              />
              <SidebarList
                label="Pesanan"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M6.875 7.5C6.875 7.33424 6.94085 7.17527 7.05806 7.05806C7.17527 6.94085 7.33424 6.875 7.5 6.875H12.5C12.6658 6.875 12.8247 6.94085 12.9419 7.05806C13.0592 7.17527 13.125 7.33424 13.125 7.5C13.125 7.66576 13.0592 7.82473 12.9419 7.94194C12.8247 8.05915 12.6658 8.125 12.5 8.125H7.5C7.33424 8.125 7.17527 8.05915 7.05806 7.94194C6.94085 7.82473 6.875 7.66576 6.875 7.5ZM7.5 10.625H12.5C12.6658 10.625 12.8247 10.5592 12.9419 10.4419C13.0592 10.3247 13.125 10.1658 13.125 10C13.125 9.83424 13.0592 9.67527 12.9419 9.55806C12.8247 9.44085 12.6658 9.375 12.5 9.375H7.5C7.33424 9.375 7.17527 9.44085 7.05806 9.55806C6.94085 9.67527 6.875 9.83424 6.875 10C6.875 10.1658 6.94085 10.3247 7.05806 10.4419C7.17527 10.5592 7.33424 10.625 7.5 10.625ZM10 11.875H7.5C7.33424 11.875 7.17527 11.9408 7.05806 12.0581C6.94085 12.1753 6.875 12.3342 6.875 12.5C6.875 12.6658 6.94085 12.8247 7.05806 12.9419C7.17527 13.0592 7.33424 13.125 7.5 13.125H10C10.1658 13.125 10.3247 13.0592 10.4419 12.9419C10.5592 12.8247 10.625 12.6658 10.625 12.5C10.625 12.3342 10.5592 12.1753 10.4419 12.0581C10.3247 11.9408 10.1658 11.875 10 11.875ZM17.5 3.75V12.2414C17.5005 12.4056 17.4684 12.5683 17.4055 12.72C17.3426 12.8717 17.2502 13.0093 17.1336 13.125L13.125 17.1336C13.0093 17.2502 12.8717 17.3426 12.72 17.4055C12.5683 17.4684 12.4056 17.5005 12.2414 17.5H3.75C3.41848 17.5 3.10054 17.3683 2.86612 17.1339C2.6317 16.8995 2.5 16.5815 2.5 16.25V3.75C2.5 3.41848 2.6317 3.10054 2.86612 2.86612C3.10054 2.6317 3.41848 2.5 3.75 2.5H16.25C16.5815 2.5 16.8995 2.6317 17.1339 2.86612C17.3683 3.10054 17.5 3.41848 17.5 3.75ZM3.75 16.25H11.875V12.5C11.875 12.3342 11.9408 12.1753 12.0581 12.0581C12.1753 11.9408 12.3342 11.875 12.5 11.875H16.25V3.75H3.75V16.25ZM13.125 13.125V15.3672L15.3664 13.125H13.125Z"
                      fill="black"
                    />
                  </svg>
                }
                isSidebarOpen={isSidebarOpen}
              />
              <SidebarList
                label="Pembayaran"
                icon={<LuCircleDollarSign />}
                isSidebarOpen={isSidebarOpen}
              />
              <SidebarList
                label="Ulasan"
                icon={<BiEdit />}
                isSidebarOpen={isSidebarOpen}
              />
              <Dropdown
                label="Tantangan"
                icon={<LuPalmtree />}
                iconDrop={<IoChevronDown />}
                isSidebarOpen={isSidebarOpen}
                sidebarItems={[
                  { to: "/tantangan", label: "Tantangan" },
                  { to: "/peserta-tantangan", label: "Peserta Tantangan" },
                ]}
              />
              <SidebarList
                to="/kupon"
                label="Kupon"
                icon={<IoCashOutline />}
                isSidebarOpen={isSidebarOpen}
              />
              <SidebarList
                to="/artikel"
                label="Artikel"
                icon={<LuNewspaper />}
                isSidebarOpen={isSidebarOpen}
              />
            </div>
            <div className=" mb-5">
              <SidebarList
                label="Keluar"
                icon={<IoExitOutline />}
                isSidebarOpen={isSidebarOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
