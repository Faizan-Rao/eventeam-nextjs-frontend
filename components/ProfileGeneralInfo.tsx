'use client'
import { PencilLine } from "lucide-react";
import Link from "next/link";
import React from "react";

const ProfileGeneralInfo = () => {
  return (
    <div className="flex-1 flex flex-col gap-4 p-10 rounded-md bg-white ">
      <div className="flex justify-between items-center">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">
          General Information
        </h1>
        <Link
          href={"/dashboard/setting"}
          className="p-2 hover:bg-[#7655fa42] transition-all rounded-full"
        >
          <PencilLine size={20} color="#7655fa" />
        </Link>
      </div>

      <div className="flex flex-col gap-4 border-b-[1px] pb-4">
        <div className="flex flex-col">
          <span className="text-[#999999] text-sm font-semibold">
            Company Name
          </span>
          <span className="text-[#4a4a4a] text-base font-semibold">
            Company Name
          </span>
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="flex-1 flex flex-col">
            <span className="text-[#999999] text-sm font-semibold">Email</span>
            <span className="text-[#4a4a4a] text-base font-semibold">
              Company@gmail.com
            </span>
          </div>
          <div className="flex-1 flex flex-col">
            <span className="text-[#999999] text-sm font-semibold">Phone</span>
            <span className="text-[#4a4a4a] text-base font-semibold">
              +9100000000000
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 my-4">
        <div className="flex-1 flex flex-col">
          <span className="text-[#4a4a4a] text-lg font-semibold">About</span>
          <p className="text-[#999999] text-sm font-semibold text-justify">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex cum,
            aliquid omnis neque veritatis suscipit expedita ut molestiae esse
            modi consequatur nam soluta, hic impedit maxime aperiam, est totam
            beatae adipisci. Aliquam autem quisquam eaque, obcaecati vitae
            consequatur ipsa aspernatur cum neque quas? Odio omnis illo dolorum
            provident sit iste officiis tenetur, repellat maiores minima commodi
            voluptate dolores libero, voluptas consequuntur sunt alias!
            Voluptatibus, obcaecati! <br /> <br />
            Nihil id cumque ipsum ipsam sint doloribus amet error. Ipsam dicta
            est quia ipsa quisquam eos totam architecto voluptatum quam at sint
            consequatur maiores officiis voluptates culpa, aliquam perferendis.
            Quasi, ex ea cupiditate officiis ipsa ab maiores. Omnis eum culpa
            eveniet corrupti dignissimos minus et tempore, explicabo voluptatum
            sequi doloremque iste, consequatur minima sit autem quae
            consequuntur laboriosam! Ipsa ad sint porro, illum voluptatum odio
            necessitatibus rerum doloremque laudantium impedit maxime esse
            voluptas eveniet. Commodi et assumenda quia libero? Alias recusandae
            porro odio deserunt ipsum aliquam eum veniam iusto tenetur delectus
            asperiores, eligendi quibusdam animi exercitationem minus dolorum
            magni cum illum sit quia! Illo repellendus corporis ab aliquam iure
            sequi omnis quo odit, dolorem vero consectetur nam quae obcaecati
            incidunt dolorum alias harum consequuntur laborum debitis nihil
            totam eius. Reiciendis temporibus quasi similique debitis delectus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileGeneralInfo;
