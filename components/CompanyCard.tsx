"use client";
import { clsx } from "clsx";
import {
  AtSign,
  EllipsisVertical,
  MapPin,
  Phone,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import CompanyDeleteDialog from "./DeleteCompanyDialog";
import AddCompanyDialog from "./AddCompanyDialog";
import { Switch } from "./ui/switch";
import { useMutation } from "@tanstack/react-query";
import { Companies } from "@/configs/apiRoutes";
import { toast } from "react-toastify";
import { queryClient } from "./MainLayoutGrid";
import { useTranslation } from "react-i18next";
import i18n from "@/configs/i18n";

interface ICompanyCard {
  logo?: string;
  name: string;
  isActive: number;
  phone: string;
  address: string;
  email: string;
  stripe: number;
  slug: string;
  id: number;
  data: any;
}
const CompanyCard: React.FC<ICompanyCard> = ({
  logo = "/profile_logo.svg",
  name = "No Name",
  isActive = 0,
  address = "No address",
  email = "No Email",
  phone = "No Phone",
  stripe = "0",
  slug = "",
  id,
  data,
}) => {
  const mutate = useMutation({
    mutationFn: async () => Companies.updateStatus(data.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      toast("Company Status Updated", { type: "success" });
    },
    onError: (error: any) => {
      toast("Something Went Wrong", { type: "error" });
    },
  });
  const [openDelete, setDeleteOpen] = useState(false);
  const [openEdit, setEditOpen] = useState(false);
  const { t } = useTranslation(["translation"]);
  const dummyImage =
    "https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw";
  return (
    <div className="  flex flex-1  w-auto  gap-6 p-6 m-3 flex-col shadow-md bg-white rounded-xl">
      <div className="flex justify-between border-b-[1px]">
        <div className="flex items-center  pb-5 gap-4">
          <Image
            src={logo || dummyImage}
            height={50}
            width={50}
            className="rounded-full bg-cover aspect-square"
            alt="profile logo"
          />
          <div className="flex flex-col">
            <span className="text-[#4a4a4a] font-semibold text-lg line-clamp-1">
              {name}
            </span>
            <div className="flex items-center gap-2">
              <div
                className={clsx(
                  " h-[10px] w-[10px] rounded-full",
                  isActive === 1 ? "bg-[#41F468]" : "bg-[#e40303]"
                )}
              />
              <span className="text-sm font-semibold text-[#999999]">
                {isActive === 1 ? t("Active") : t("Inactive")}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center ml-4 items-center gap-1 self-start">
          <Switch
            dir={"ltr"}
            onCheckedChange={() => mutate.mutate()}
            checked={data.is_active === 1 ? true : false}
          />
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="hover:bg-[#7655fa26] flex justify-center items-center  active:scale-[0.90]  p-1 transition-all rounded-full  ">
              <EllipsisVertical strokeWidth={1} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="active:scale-[0.95] transition-all">
                <Link href={`/companies/${slug}`}>{t("Company Events")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="active:scale-[0.95] transition-all"
                onClick={() => setDeleteOpen(true)}
              >
                <p>{t("Delete Company")}</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="active:scale-[0.95] transition-all"
                onClick={() => setEditOpen(true)}
              >
                <p>{t("Edit Company")}</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {data && (
            <>
              <AddCompanyDialog
                editOpen={openEdit}
                setEditOpen={setEditOpen}
                data={data}
                type="edit"
              />
              <CompanyDeleteDialog
                open={openDelete}
                setOpen={setDeleteOpen}
                data={id}
              />
            </>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex-1 flex items-center gap-4">
          <span className="p-2 bg-[#36ACCD] rounded-full">
            <Smartphone className="text-white" />
          </span>
          <div className="flex  self-start  flex-col gap-1 ">
            <span className="text-sm font-semibold text-[#999999]">
              {t("Phone Number")}
            </span>
            <p className="text-[#4a4a4a] font-semibold text-sm break-words break-all">
              {phone}
            </p>
          </div>
        </div>
        <div className="flex-1 self-start flex items-center gap-4">
          <span className="p-2 bg-[#C655FA] rounded-full">
            <AtSign className="text-white" />
          </span>
          <div className="flex flex-1     flex-col gap-1">
            <span className="text-sm font-semibold text-[#999999]">
              {t("Email")}
            </span>
            <p className="text-[#4a4a4a] break-words break-all font-semibold text-base  text-wrap">
              {email}
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 self-start flex items-center gap-4">
        <span className="p-2 bg-[#7655FA] rounded-full">
          <MapPin className="text-white" />
        </span>
        <div className="flex flex-col ">
          <span className="text-sm font-semibold text-[#999999]">
            {t("Address")}
          </span>
          <p className="text-[#4a4a4a] font-semibold text-base">{address}</p>
        </div>
      </div>

      <div
        className={clsx(
          " text-white font-semibold rounded-md text-center p-3 text-base",
          stripe === 1 ? "bg-[#7655fa]" : "bg-[#999999]"
        )}
      >
        {stripe === 1 ? t("Stripe is Activated") : t("Stripe is Disabled")}
      </div>
    </div>
  );
};

export default CompanyCard;
