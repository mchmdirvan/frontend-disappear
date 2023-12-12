import React, { useEffect, useState } from "react";
import Tabel from "../../components/table/table";
import Breadcrumbs from "@/components/breadcrumbs";
import Layout from "../../components/layout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import "../../styles/order/order.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getAllOrder } from "@/utils/api/paymentAndOrder/api";
import formatCurrency from "@/utils/formatter/currencyIdr";
import { format } from "date-fns";
import { Loading } from "@/components/loading";
import Pagination from "@/components/pagenation";
import { debounce } from "lodash";

function Order() {
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [meta, setMeta] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const delayedFetchData = debounce(fetchData, 1000);
    delayedFetchData();

    return () => delayedFetchData.cancel();
  }, [searchValue, searchParams]);

  async function fetchData() {
    let query = {};
    for (const entry of searchParams.entries()) {
      query[entry[0]] = entry[1];
    }
    try {
      setIsLoading(true);
      const result = await getAllOrder({ ...query });
      const { ...rest } = result.meta;
      setOrder(result.data);
      console.log(result.data);
      setMeta(rest);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handlePrevNextPage(page) {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }

  function handleSearchInputParams(search) {
    setSearchValue(search);
    const newSearchParams = new URLSearchParams(searchParams.toString());

    // Hapus parameter 'search' jika nilai search kosong
    if (search.trim() === "") {
      newSearchParams.delete("search");
    } else {
      newSearchParams.set("search", String(search));
    }

    setSearchParams(newSearchParams);
  }

  function handleFilterStatus(value) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("status_filter", value);
    setSearchParams(newSearchParams);
    setSelectedStatus(
      value === "Menunggu Konfirmasi"
        ? "Menunggu Konfirmasi"
        : value == "Proses"
        ? "Proses"
        : value == "Pengiriman"
        ? "Pengiriman"
        : value == "Selesai"
        ? "Selesai"
        : "Gagal"
    );
  }
  function handleFilterDate(value) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("date_filter", value);
    setSearchParams(newSearchParams);
    setSelectedDate(
      value === "Bulan Ini"
        ? "Bulan Ini"
        : value === "Minggu Ini"
        ? "Minggu Ini"
        : "Hari Ini"
    );
  }

  function handleShowAllDate() {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete("date_filter");
    setSearchParams(newSearchParams);

    setSelectedDate(null);
    fetchData();
  }

  function handleShowAllData() {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete("status_filter");
    setSearchParams(newSearchParams);

    setSelectedStatus(null);
    fetchData();
  }

  const columns = [
    { Header: "NO", accessor: "id_order" },
    {
      Header: "Pelanggan",
      accessor: "user.name",
      Cell: ({ row }) => (
        <p
          className=" cursor-pointer"
          onClick={() => navigate(`/pesanan/${row.original.id}`)}
        >
          {row.original.user.name}
        </p>
      ),
    },
    {
      Header: "Tanggal",
      accessor: "created_at",
      Cell: ({ value }) => <p>{format(new Date(value), "dd-MM-yyyy")}</p>,
    },
    {
      Header: "Total Pembayaran",
      accessor: "total_amount_paid",
      Cell: ({ row }) => (
        <p>{formatCurrency(row.original.total_amount_paid)}</p>
      ),
    },
    { Header: "STATUS", accessor: "order_status" },
  ];
  return (
    <Layout>
      <div className="">
        <Breadcrumbs pages="Pesanan" />
        <div className="flex">
          <div className="flex justify-start">
            <div className="mt-10">
              <div className="flex items-center relative w-full">
                <Input
                  type="text"
                  placeholder="Cari Pelanggan"
                  className="search-order border-primary-green"
                  onChange={(e) => handleSearchInputParams(e.target.value)}
                  value={searchValue}
                />
                <FiSearch className="search-icon absolute right-3 top-4" />
              </div>
            </div>

            <div className="ml-6 mt-10">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex justify-between items-center rounded-md bg-white py-3 px-3 border border-primary-green gap-20">
                  <p className="text-[#8C8C8C]">{selectedStatus || "Filter"}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="5"
                    viewBox="0 0 10 5"
                    fill="none"
                  >
                    <path
                      d="M5 4.5L0.669872 0.75L9.33013 0.75L5 4.5Z"
                      fill="#373737"
                    />
                  </svg>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="cursor-pointer text-black hover:bg-secondary-green hover:text-white"
                    onClick={() => handleShowAllData()}
                  >
                    Tampilkan Semua
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className=" hover:bg-secondary-green hover:text-white cursor-pointer"
                    onClick={() => handleFilterStatus("Menunggu Konfirmasi")}
                  >
                    Menunggu Konfirmasi
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className=" hover:bg-secondary-green hover:text-white cursor-pointer"
                    onClick={() => handleFilterStatus("Proses")}
                  >
                    Proses
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className=" hover:bg-secondary-green hover:text-white cursor-pointer"
                    onClick={() => handleFilterStatus("Pengiriman")}
                  >
                    Pengiriman
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className=" hover:bg-secondary-green hover:text-white cursor-pointer"
                    onClick={() => handleFilterStatus("Selesai")}
                  >
                    Selesai
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className=" hover:bg-secondary-green hover:text-white cursor-pointer"
                    onClick={() => handleFilterStatus("Gagal")}
                  >
                    Gagal
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="order-sort flex justify-end mt-10 items-center gap-3">
            <p className="text-[#8C8C8C]">Data untuk</p>
            <FaRegCalendarAlt />
            <DropdownMenu>
              <DropdownMenuTrigger className="flex justify-between items-center rounded-md bg-white py-3 gap-5">
                <p className="text-black font-semibold">{selectedDate || ""}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="5"
                  viewBox="0 0 10 5"
                  fill="none"
                >
                  <path
                    d="M5 4.5L0.669872 0.75L9.33013 0.75L5 4.5Z"
                    fill="#373737"
                  />
                </svg>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuItem
                  className="cursor-pointer text-black hover:bg-secondary-green hover:text-white"
                  onClick={() => handleShowAllDate()}
                >
                  Tampilkan Semua
                </DropdownMenuItem>
                <DropdownMenuItem
                  className=" hover:bg-secondary-green hover:text-white cursor-pointer"
                  onClick={() => handleFilterDate("Bulan Ini")}
                >
                  Bulan ini
                </DropdownMenuItem>
                <DropdownMenuItem
                  className=" hover:bg-secondary-green hover:text-white cursor-pointer"
                  onClick={() => handleFilterDate("Minggu Ini")}
                >
                  Minggu ini
                </DropdownMenuItem>
                <DropdownMenuItem
                  className=" hover:bg-secondary-green hover:text-white cursor-pointer"
                  onClick={() => handleFilterDate("Hari Ini")}
                >
                  Hari ini
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full mx-auto">
          <div className="tabel-order overflow-x-auto mt-10">
            <Tabel columns={columns} data={order} />
            <Pagination
              meta={meta}
              onClickPrevious={() => handlePrevNextPage(meta?.current_page - 1)}
              onClickNext={() => handlePrevNextPage(meta?.current_page + 1)}
              onClickPage={(page) => handlePrevNextPage(page)}
            />
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Order;
