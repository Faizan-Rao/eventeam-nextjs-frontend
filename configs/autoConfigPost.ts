
import _ from "lodash";
import {format} from 'date-fns'


interface Activity {
  activity_id: string;
  activity_title: string;
  activity_type: string;
  activity_time: string;
  activity_status: string;
}

interface Event {
  sub_event_id: string;
  activities: Activity[];
}
interface MyObject { [key: string]: any;}
export const autoConfigPostStruct = (data: any) => {
  let payload = {
    advance: {
      is_enable_donation: "0"
    },
    activities: [
      {
        sub_event_id: "",
        activities: [],
      },
    ],
    donations: {
      is_enable_donation:0,
      other_donations: []
    }
  } as { [key: string]: any; }


  if (!data) return null;

  let prayer_time = [...Object.values(data.prayer_time)].filter((el) => {
    if (_.isArray(el)) return el;
  });

  console.log("prayer time", prayer_time);
  if (prayer_time.length > 0) {
    payload.activities = prayer_time.map((el: any) => {
      let activity = { activities: [] } as any;
      activity.sub_event_id = "";
      activity.activities = el.map((item: any) => {
        let newActivity = {} as any;
        newActivity.activity_title = item.title || "";
        newActivity.activity_type = item.time_type;
        newActivity.activity_time = item.time || item.fix_time;
        newActivity.activity_status = item.status ? "1" : "0";
        newActivity.activity_id = "";

        return newActivity;
      });

      return activity;
    });
  }
  payload.event_description = data.gen_info.event_desc;
  //   subevent
  payload.sub_events = (data.sub_events as any).map((el: any, i: number) => {
    let element = {} as any;
    element.title = el.name;
    element.date = format(el.date, "dd/MM/yyyy hh:mm");
    element.status = el.active ? 1 : 0;
    element.manage_inventory = 0;
    element.event_capacity = el.max_capcity;
    element.address = el.address;
    element.description = el.description;
    element.ticket_types = el.ticket_type.map((ele: any, index: number) => {
      let ticketType = {} as any;
      ticketType.title = ele.name;
      ticketType.price = ele.price;
      ticketType.description = "";
      return ticketType;
    });
    return element;
  });

  //    advance form
  payload.advance["is_cash_allowed"] = data.advance_form.cash_payment ? "1" : "0";
  payload.advance.is_show_address = data.advance_form.show_address ? "1" : "0";
  payload.advance.is_show_regulation = data.advance_form.show_address
    ? "1"
    : "0";
  payload.advance.is_show_stripe = data.advance_form.show_stripe ? "1" : "0";
  payload.advance.renew_advance_fields = "0";
  payload.advance.is_donation_allowed = "0";
  payload.advance.is_attendees_required = "1";

  //  prayer time
  payload.prayer_times = data.prayer;
  if(data.prayer)
    payload.prayer_times.calculate_via_api = 1;
  // activities

  return payload;
};


export const addNewEventPostStruct = (data: any) => {
  let payload = {
    advance: {
      is_enable_donation: "0"
    },
    activities: [
      {
        sub_event_id: "",
        activities: [],
      },
    ],
    donations: {
      is_enable_donation:0,
      other_donations: []
    }
  } as { [key: string]: any; }

  
  if (!data) return null;

  let prayer_time = [...Object.values(data.prayer_time)].filter((el) => {
    if (_.isArray(el)) return el;
  });

  console.log("prayer time", prayer_time);
  if (prayer_time.length > 0) {
    payload.activities = prayer_time.map((el: any) => {
      let activity = { activities: [] } as any;
      activity.sub_event_id = "";
      activity.activities = el.map((item: any) => {
        let newActivity = {} as any;
        newActivity.activity_title = item.title || "";
        newActivity.activity_type = item.time_type;
        newActivity.activity_time = item.time || item.fix_time;
        newActivity.activity_status = item.status ? "1" : "0";
        newActivity.activity_id = "";

        return newActivity;
      });

      return activity;
    });
  }
  payload.event_description = data.gen_info.event_desc;
  payload.title = data.gen_info.title;
  payload.start_date = data.gen_info.start_date;
  payload.end_date = data.gen_info.end_date;
  //   subevent
  payload.sub_events = (data.sub_events as any).map((el: any, i: number) => {
    let element = {} as any;
    element.title = el.name;
    element.date = format(el.date, "dd/MM/yyyy HH:mm");
    element.status = el.active ? 1 : 0;
    element.manage_inventory = 0;
    element.event_capacity = el.max_capcity;
    element.address = el.address;
    element.description = el.description;
    element.ticket_types = el.ticket_type.map((ele: any, index: number) => {
      let ticketType = {} as any;
      ticketType.title = ele.name;
      ticketType.price = ele.price;
      ticketType.description = "";
      return ticketType;
    });
    return element;
  });

  //    advance form
  payload.advance.is_cash_allowed = data.advance_form.cash_payment ? "1" : "0";
  payload.advance.is_show_address = data.advance_form.show_address ? "1" : "0";
  payload.advance.is_show_regulation = data.advance_form.show_address
    ? "1"
    : "0";
  payload.advance.is_show_stripe = data.advance_form.show_stripe ? "1" : "0";
  payload.advance.renew_advance_fields = "0";
  payload.advance.is_donation_allowed = data.advance_form.show_donation ? "1" : "0";
  payload.advance.is_attendees_required = "1";

  //  prayer time
  payload.prayer_times = data.prayer;
  if(data.prayer)
  {
    payload.prayer_times.calculate_via_api = 1;
  }
  // activities
  if(typeof data.advance_form.donations?.is_enable_donation !== "undefined")
  {
   payload.donations.is_enable_donation = data.advance_form.donations?.is_enable_donation ? 1 : 0
  }
  if(data.advance_form.donations?.other_donations.length > 0)
  {
    payload.donations.other_donations = data.advance_form.donations?.other_donations 
  }

  return payload;
};