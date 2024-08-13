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

const LanguageSelector = () => {
  const { t, i18n } = useTranslation(["translation"]);
  const [open, setOpen] = useState(false);
  const langs = [
    { code: "en", lang: "English" },
    { code: "he", lang: "Hebrew" },
  ];

  const changeLanguage = (event: React.MouseEvent, code: string) => {
    event.preventDefault();
    i18n.changeLanguage(code);
  };

  useEffect(() => {
    document.documentElement.dir = i18n?.dir();
    
  }, [i18n, i18n.language]);



  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className=" text-[#757575] mx-2 border-none rounded-full border-[2px]  p-1 text-center">
        {i18n.language.toUpperCase()}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t('Select Language')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {langs.map((lng, index) => (
          <DropdownMenuItem
            key={index}
            onClick={(event) => {
              changeLanguage(event, lng.code)
              setOpen(false)
            }}
            className="hover:bg-[#7655FA] hover:text-white"
          >
            {lng.lang}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
