import React, { useState, useEffect } from "react";
import Layout from "@/components/layout";
import Button from "@/components/button";
import { Link } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Tabel from "@/components/table/table";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { IoEye } from "react-icons/io5";
import { BiEdit, BiTrash } from "react-icons/bi";
import Breadcrumbs from "@/components/breadcrumbs";
import Delete from "@/components/delete/delete";
import Pagination from "@/components/pagenation";
import { useSearchParams } from "react-router-dom";
import { Loading } from "@/components/loading";
import { getVoucher } from "@/utils/api/voucher/api";
import { format } from "date-fns";

function VoucherApp() {
  const [vouchers, setVouchers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [meta, setMeta] = useState();

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  async function fetchData() {
    let query = {};
    for (const entry of searchParams.entries()) {
      query[entry[0]] = entry[1];
    }
    try {
      setIsLoading(true);
      const result = await getVoucher({ ...query });
      const { ...rest } = result.meta;
      setVouchers(result.data);
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

  const handleDeleteClick = () => {
    Delete({
      title: "Yakin mau hapus data?",
      text: "Data yang sudah dihapus tidak dapat dipulihkan, lho. Coba dipikirkan dulu, yuk!",
    });
  };

  const columns = [
    { Header: "NO", accessor: "id" },
    { Header: "NAMA KUPON", accessor: "name" },
    { Header: "KODE", accessor: "code" },
    { Header: "KATEGORI", accessor: "category" },
    { Header: "DISKON", accessor: "discount" },
    {
      Header: "TANGGAL MULAI",
      accessor: "start_date",
      Cell: ({ value }) => <p>{format(new Date(value), "dd-MM-yyyy")}</p>,
    },
    {
      Header: "TANGGAL BERAKHIR",
      accessor: "end-date",
      Cell: ({ value }) => <p>{format(new Date(value), "dd-MM-yyyy")}</p>,
    },
    {
      Header: "STATUS",
      accessor: "status",
      Cell: ({ row }) => (
        <div>
          {row.original.status}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="three-dots">
                <PiDotsThreeVerticalBold />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <Link to="">
                <DropdownMenuItem className=" hover:bg-secondary-green hover:text-white cursor-pointer gap-2 items-center">
                  <IoEye />
                  <p>Lihat Deskripsi</p>
                </DropdownMenuItem>
              </Link>
              <Link to="/kupon/edit-kupon">
                <DropdownMenuItem className=" hover:bg-secondary-green hover:text-white cursor-pointer gap-2 items-center">
                  <BiEdit />
                  <p>Edit Kupon</p>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={handleDeleteClick} className=" hover:bg-secondary-green hover:text-white cursor-pointer gap-2 items-center">
                <BiTrash />
                <p>Hapus Kupon</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <Breadcrumbs pages="Kupon" />

      <div className=" my-5 py-5 px-11 rounded-md shadow-lg border-2">
        <div className="flex justify-between items-center pb-5">
          <Link to="/kupon/buat-kupon">
            <Button
              label="Tambahkan Kupon"
              icon={<IoAddOutline />}
              className="bg-primary-green text-white py-3 px-5 rounded-lg font-medium text-sm mr-3"
            />
          </Link>

          <DropdownMenu>
              <DropdownMenuTrigger
                className="flex justify-between items-center rounded-md bg-white py-3 px-3 border border-primary-green gap-10"
                id="filterVoucher"
              >
                <p className=" text-primary-green">Filter</p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="5"
                  viewBox="0 0 10 5"
                  fill="none"
                >
                  <path
                    d="M5 4L0.669872 0.25L9.33013 0.25L5 4Z"
                    fill="#257157"
                  />
                </svg>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
              <DropdownMenuItem className="hover:bg-secondary-green hover:text-white cursor-pointer gap-3 items-center text-black">Bronze</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-secondary-green hover:text-white cursor-pointer gap-3 items-center text-black">Silver</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-secondary-green hover:text-white cursor-pointer gap-3 items-center text-black">Gold</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-secondary-green hover:text-white cursor-pointer gap-3 items-center text-black">Semua Pelanggan</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-secondary-green hover:text-white cursor-pointer gap-3 items-center text-black">Kadaluwarsa</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-secondary-green hover:text-white cursor-pointer gap-3 items-center text-black">Belum Kadaluwarsa</DropdownMenuItem>
            </DropdownMenuContent>
          

              
            </DropdownMenu>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <Tabel columns={columns} data={vouchers} />
            <Pagination
              meta={meta}
              onClickPrevious={() => handlePrevNextPage(meta?.current_page - 1)}
              onClickNext={() => handlePrevNextPage(meta?.current_page + 1)}
              onClickPage={(page) => handlePrevNextPage(page)}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default VoucherApp;
