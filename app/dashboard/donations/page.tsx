import DonationMainCont from "@/components/DonationMainCont";
import MainContentGrid from "@/components/MainContentGrid";
import PageTitleContainer from "@/components/PageTitleContainer";
import { Search } from "lucide-react";
import React from "react";

const DonationSettings = () => {
  return (
    <MainContentGrid>
      <PageTitleContainer title="Donation Settings" />
        <DonationMainCont/>
    </MainContentGrid>
  );
};

export default DonationSettings;
