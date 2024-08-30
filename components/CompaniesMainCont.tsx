import React from "react";
import CompanyCard from "./CompanyCard";
import KPICard from "./KPICard";
import { Building2 } from "lucide-react";

const data = [
  {
    logo: "/profile_logo.svg",
    name: "evenTeam",
    loggedin: false,
    phone: "+920000000",
    address: "789 Willowbrook Lane, Apt 22B, Los Angeles, CA",
    email: "company@mail.com",
    stripe: true,
  },
  {
    logo: "/profile_logo.svg",
    name: "evenTeam",
    loggedin: false,
    phone: "+920000000",
    address: "789 Willowbrook Lane, Apt 22B, Los Angeles, CA",
    email: "company@mail.com",
    stripe: true,
  },
  {
    logo: "/profile_logo.svg",
    name: "Meta",
    loggedin: true,
    phone: "+920000000",
    address: "789 Willowbrook Lane, Apt 22B, Los Angeles, CA",
    email: "company@mail.com",
    stripe: false,
  },
  {
    logo: "/profile_logo.svg",
    name: "Steam",
    loggedin: false,
    phone: "+920000000",
    address: "789 Willowbrook Lane, Apt 22B, Los Angeles, CA",
    email: "company@mail.com",
    stripe: true,
  },
];


const CompaniesMainCont = () => {
  return (
    <>
    <div className="flex gap-4">
        <KPICard title="Total Companies" value="0" currency="" icon={<Building2/>} />
        <KPICard title="Active Companies" value="0" currency="" icon={<Building2/>} />
        <KPICard title="Inactive Companies" value="0" currency="" icon={<Building2/>} />
        <KPICard title="Stripe Connected" value="0" currency="" icon={<Building2/>} />

    </div>
      <h1 className="text-[#4a4a4a] text-lg font-semibold">All Companies</h1>
      <div className="flex gap-4 flex-wrap">
        {data.map((el, key) => (
          <div key={key}>
            <CompanyCard
              name={el.name}
              phone={el.phone}
              address={el.address}
              email={el.email}
              loggedin={el.loggedin}
              stripe={el.stripe}
              logo={el.logo}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default CompaniesMainCont;
