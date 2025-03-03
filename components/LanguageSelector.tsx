"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "@/configs/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HebrewFlag from "./icons/HebrewFlag";
import EnglistFlag from "./icons/EnglistFlag";

const LanguageSelector = () => {
  const { t, i18n } = useTranslation(["translation"]);
  const [open, setOpen] = useState(false);
  const langs = [
    { code: "en", lang: "English", country: EnglistFlag() },
    { code: "he", lang: "Hebrew", country: HebrewFlag() },
  ];

  const changeLanguage = (event: React.MouseEvent, code: string) => {
    event.preventDefault();
    i18n.changeLanguage(code);
    window.location.reload()
  };

  useEffect(() => {
    document.documentElement.dir = i18n?.dir();
  }, [i18n, i18n.language]);

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className=" text-[#757575] mx-2 border-none ring-transparent rounded-full border-[2px]  p-1 text-center">
        <div className="flex gap-2 items-center justify-center aspect-square h-6 w-6 rounded-full">

        {langs.map((lng : any) => { 
          if( lng.code === i18n.language.toLowerCase())
          {
            return lng.country
          }
         
          return false
          }).filter((el)=> el !== false)}

        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t("Select Language")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {langs.map((lng, index) => (
          <DropdownMenuItem
            key={index}
            onClick={(event) => {
              changeLanguage(event, lng.code);
              setOpen(false);
            }}
            className="flex gap-6 text-left hover:bg-[#7655FA] hover:text-white"
          >
            <div className="max-h-[25px] max-w-[25px] aspect-square flex justify-center items-center object-cover overflow-hidden rounded-full ">
              {lng.country}
            </div>
            <span>{lng.lang}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
