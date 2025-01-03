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
  update: async ( id: number | string, data: any) => {
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

  getCompaniesEvents: async (id: number | string) => {
    const response = await axiosWithToken.get(`/show/events/${id}`);
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
        "total_companies",
        "total_commission",
        "cleared_cash",
        "pending_cash",
        "total_earnings",
        "total_guests",
        "total_registrations",
        "active_companies",
        "inactive_companies"
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
  updateStatus: async (id: number | string) => {

    const response = await axiosWithToken.get(`/payments/is-clear/${id}`);
    
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

  searchCity : async (data : any) =>{
    const response = await axiosWithToken.post(`/search-cities`, data)
    return response
  },

  saveCity : async (data : any) =>{
    const response = await axiosWithToken.post(`/company/settings/save`, data)
    return response
  },
  
}


export const AutoFormAPI = {
  get : async () =>{
    const response = await axiosWithToken.get("/events/automatic-forms")
    return response
  },
  save : async (data : any, id:number) =>{
    const response = await axiosWithToken.put(`/admin-automatic-form/update/${id}`, data)
    return response
  },
  createAutoConfig : async (data : any) =>{
    const response = await axiosWithToken.post(`/company/settings/automatic-configurations`, data)
    return response
  },
}

export const Events = {
  get : async () =>{
    const response = await axiosWithToken.get("/events/list")
    return response
  },
  getOne : async (data : any) =>{
    const response = await axiosWithToken.get(`/events/detail/${data}`)
    return response
  },
  delete : async (data: any) =>{
    const response = await axiosWithToken.delete(`/events/delete/${data}`)
    return response
  },
  save : async (data : any) =>{
    const response = await axiosWithToken.patch(`/events/status/${data.id}`, data)
    return response
  },
  createEvent : async (data : any) =>{
    const response = await axiosWithToken.post(`/events/create`, data)
    return response
  },
}


export const EmailTempApi = {
  get : async () =>{
    const response = await axiosWithToken.get("/email-templates")
    return response
  },
  updateStatus : async (data : any) =>{
    const response = await axiosWithToken.patch(`/email-templates/is-active/${data.id}`, data)
    return response
  },
  save : async (data : any) =>{
    const response = await axiosWithToken.put(`/email-templates/update/${data.id}`, data)
    return response
  },
}

export const StripeAPI = {
  requestOnBoard : async () =>{
    const data = {
      "return_url" : process.env.NEXT_PUBLIC_STRIPE_CALLBACK_URL,
      "refresh_url" : process.env.NEXT_PUBLIC_STRIPE_REFRESH_URL
  }
  console.log(data)
    const response = await axiosWithToken.post(`/stripe/request-onboarding-url`, data)
    // console.log(response);

    return response
  },
  completeOnBoarding : async () =>{
    const response = await axiosWithToken.get(`/stripe/complete-onboarding`)
    return response
  },
  getStatus : async () =>{
    const response = await axiosWithToken.get(`/stripe/get-status`)
    return response
  },
}


export const EventReg = {
  singleEvent : async ( company:string, id:string )=>{
    const response = await axiosWithToken.get(`/show/events/${company}/event/${id}/book-spot`)
    return response
  },
  eventRegistration : async (company:string, id:string , data:any)=>{
    console.log("hamlo g", company, id, data)
    const response = await axiosWithToken.post(`/show/events/${company}/event/${id}/book-spot`, data)
    return response
  }
}
