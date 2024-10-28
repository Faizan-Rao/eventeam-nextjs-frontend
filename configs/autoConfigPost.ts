// const data = {
//   tickets: [
//     {
//       ticket: "Men",
//     },
//   ],
//   advance_form: {
//     show_address: true,
//     cash_payment: true,
//     show_regulations: true,
//     show_stripe: true,
//   },
//   prayer_time: {
//     "0": [
//       {
//         title: "hello g",
//         time_type: "after-sunset",
//         status: true,
//        time: 30
//       },
//     ],
//   },
//   gen_info: {
//     event_desc: "<p>Hello this is Event Description&nbsp;</p>",
//   },
//   sub_events: [
//     {
//       name: "",
//       active: true,
//       date: "2024-10-15T19:00:00.000Z",
//       start_time: "04:00 AM",
//       ticket_type: [
//         {
//           name: "Men",
//           price: "12312",
//         },
//         {
//           name: "Women",
//           price: "123",
//         },
//       ],
//       address: "this is local address",
//       description: "<p>fasdfasdfas</p>",
//       max_capcity: "123",
//     },
//   ],
//   prayer: {
//     before_sunset_time: 3,
//     after_sunset_time: 3,
//     second_event_end_time: "13:06",
//     calculate_via_api: 1,
//   },
// };
import _ from "lodash";
let payload2 = {
  event_description: "<p>Hello I am the description from the admin side</p>  ",
  sub_events: [
    {
      title: "Friday",
      date: "11/03/2024 08:35",
      status: "1",
      manage_inventory: 0,
      event_capacity: null,
      address: "123 Street, City",
      description: "this is the subevent description",
      ticket_types: [
        {
          title: "Child",
          price: "10",
          description: "",
        },
        {
          title: "Adult",
          price: "20",
          description: "",
        },
      ],
    },
    {
      title: "Saturday",
      date: "11/03/2024 08:35",
      status: "1",
      manage_inventory: 0,
      event_capacity: null,
      address: null,
      description: null,
      ticket_types: [
        {
          title: "Child",
          price: "10",
          description: "",
        },
        {
          title: "Adult",
          price: "30",
          description: "",
        },
      ],
    },
  ],
  advance: {
    is_attendees_required: "1",
    is_show_address: "1",
    is_cash_allowed: "1",
    is_donation_allowed: "1",
    is_show_regulation: "1",
    renew_advance_fields: "0",
    is_show_stripe: "1",
  },
  prayer_times: {
    before_sunset_time: 30,
    after_sunset_time: 30,
    second_event_end_time: "16:24",
    calculate_via_api: 1,
  },
  activities: [
    {
      sub_event_id: "send_it_empty_in_autoconfig",
      activities: [
        {
          sub_event_id: "send_it_empty_in_autoconfig",
          activity_id: "send_it_empty_in_autoconfig",
          activity_title: "kabalat shabbat",
          activity_type: "after_sunset",
          activity_time: "18",
          activity_status: 1,
        },
        {
          sub_event_id: "send_it_empty_in_autoconfig",
          activity_id: "send_it_empty_in_autoconfig",
          activity_title: "by admin 2",
          activity_type: "before_sunset",
          activity_time: "10",
          activity_status: 0,
        },
      ],
    },
    {
      sub_event_id: "send_it_empty_in_autoconfig",
      activities: [
        {
          sub_event_id: "send_it_empty_in_autoconfig",
          activity_id: "send_it_empty_in_autoconfig",
          activity_title: "by admin 3",
          activity_type: "after_sunset",
          activity_time: "20",
          activity_status: 0,
        },
      ],
    },
  ],
};

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

export const autoConfigPostStruct = (data: any) => {
  let payload = {
    advance: {},
    activities: [
      {
        sub_event_id: "",
        activities: [],
      },
    ],
  } as any;

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
    element.date = el.date;
    element.statue = el.active ? "1" : "0";
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
  payload.advance.is_donation_allowed = "0";
  payload.advance.is_attendees_required = "1";

  //  prayer time
  payload.prayer_times = data.prayer;
  payload.prayer_times.calculate_via_api = "1";
  // activities

  return payload;
};
