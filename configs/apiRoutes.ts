import { axiosWithoutToken, axiosWithToken } from "./axios";

export const Auth = {
  login: async (data: any) => {
    const response = await axiosWithoutToken.post("/login", data);
    return response;
  },
  signup: async (data: any) => {
    const response = await axiosWithoutToken.post("/register", data);
    return response;
  },
};

export const Companies = {
  get: async () => {
    const response = await axiosWithToken.get("/users/list");
    return response;
  },
  add: async (data: any) => {
    const response = await axiosWithToken.post("/users/create", data);
    return response;
  },
  update: async (data: any, id: number | string) => {
    const response = await axiosWithToken.put(`/users/update/${id}`, data);
    return response;
  },
  delete: async (id: number | string) => {
    const response = await axiosWithToken.delete(`/users/delete/${id}`);
    return response;
  },
  updateStatus: async (id: number | string) => {
    const response = await axiosWithToken.patch(`/users/status/${id}`);
    return response;
  },
};

export const Dashboard = {
  getKPI: async () => {

    const currentDate = new Date(Date.now())
      .toISOString()
      .split("T")[0]
      .replaceAll("-", "/");

    let data = {
      kpis: [
        "total_events",
        "active_events",
        "automatic_events",
        "stripe_connected",
        "total_users",
        "total_commission",
        "cleared_cash",
        "pending_cash",
        "total_earnings",
        "total_guests",
        "total_registrations",
        "active_users",
        "inactive_users"
      ],
      daterange: `2020/01/01 - ${currentDate}`,
    };

    const response = await axiosWithToken.post("/kpis", data);
    
    return response
  },

  getDashboard: async () => {
    const response = await axiosWithToken.get("");
    
    return response
  }
};


export const Leads = {
  getLeads: async () => {

    const response = await axiosWithToken.get("/leads/list");
    
    return response
  },
}


export const Payments  = {
  get: async () => {

    const response = await axiosWithToken.get("/payments/list");
    
    return response
  },
}

export const FormFields = {
  updateFormField : async (data : any) =>{
    const response = await axiosWithToken.post("/company/settings/save", data)
    return response
  },
  updateApplication : async (data : any) =>{
    const response = await axiosWithToken.post("/company/settings/save", data)
    return response
  },
  updateGuestField: async (data : any) =>{
    const response = await axiosWithToken.post("/company/settings/save", data)
    return response
  }
}


export const Donations = {
  getList : async (data : any) =>{
    const response = await axiosWithToken.get("/donations/list")
    return response
  },
  add : async (data : any) =>{
    const response = await axiosWithToken.post("/donations/create", data)
    return response
  },
  update : async (data : any) =>{
    const response = await axiosWithToken.put(`/donations/update/${data.id}`, data)
    return response
  },
  status : async ( data : any) =>{
    const response = await axiosWithToken.patch(`/donations/is-active/${data.id}`, data.data)
    return response
  },
  delete : async (id: number) =>{
    const response = await axiosWithToken.delete(`/donations/delete/${id}`)
    return response
  },
}

export const Profile = {
  get : async () =>{
    const response = await axiosWithToken.get("/users/logged-in")
    return response
  },
  
  updateGenInfo : async (data : any) =>{
    const response = await axiosWithToken.post(`/profile-save`, data)
    return response
  },

  updateAddress : async (data : any) =>{
    const response = await axiosWithToken.put(`/donations/update/${data.id}`, data)
    return response
  },
  
}
