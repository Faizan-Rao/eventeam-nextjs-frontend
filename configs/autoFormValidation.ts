
import joi from "joi";

const ticket = joi.object({
  title: joi.string().required(),
  price: joi.number().min(0).required(),
  description: joi.string().empty(""),
});

export const subevent = joi.object({
  title: joi.string().required(),
  date: joi.string().required(),
  status: joi.string().required(),
  manage_inventory: joi.number().min(0).default(0).empty(0),
  event_capacity: joi.number().min(0).empty(null),
  address: joi.string().empty(""),
  description: joi.string().empty(""),
  ticket_types: joi.array().items(ticket).min(1).required(),
});

const activity = joi.object({
  sub_event_id: joi.string().default(""),
  activities: joi
    .array()
    .items(
      joi.object({
        sub_event_id: joi.string().empty(""),
        activity_title: joi.string().empty(""),
        activity_type: joi.string().required(),
        activity_time: joi.any().required(),
        activity_status: joi.number().required(),
      })
    )
    .min(1)
    .required(),
});

const ticketType = joi.object({
    title: joi.string().required().default("").label("Ticket Name"),
})

export const autoForm = joi.object({
  title: joi.string().empty(""),
  start_date: joi.date().empty(""),
  end_date: joi.date().empty(""),
  event_description: joi.string().required().label("Event Description"),
  tickets: joi.array().items(ticketType).min(1).required(),
  sub_events: joi.array().items(subevent).min(1).required(),
  advance: joi.object({
    is_attendees_required: joi.string().required(),
    is_donation_allowed: joi.string().required(),
    is_cash_allowed: joi.string().required(),
    is_show_address: joi.string().required(),
    is_show_regulation: joi.string().required(),
    is_show_stripe: joi.string().required(),
    renew_advance_fields: joi.string().required(),
  }),
  activities: joi.array().items(activity).min(1).required(),
});



export const autoFormDefaults ={
    "title": "asasas",
    "start_date": "2024-08-07T22:22:14.000000Z",
    "end_date": "2024-08-07T22:22:14.000000Z",
    "event_description": "<p>ascsdcsacSDC</p",
    "tickets": [
          {
            "title": "Child",
            "price": "10",
            "description": ""
          },
          {
            "title": "Adult",
            "price": "20",
            "description": ""
          }
        ],
    "sub_events": [
      {
        "title": "Friday",
        "date": "11/03/2024 08:35",
        "status": "1",
        "manage_inventory": 0,
        "event_capacity": null,
        "address": "123 Street, City",
        "description": "this is the subevent description",
        "ticket_types": [
            {
                "title": "Child",
                "price": "10",
                "description": ""
              },
              {
                "title": "Child",
                "price": "10",
                "description": ""
              },
        ]
      },
      {
        "title": "Saturday",
        "date": "11/03/2024 08:35",
        "status": "1",
        "manage_inventory": 0,
        "event_capacity": null,
        "address": "",
        "description": "",
        "ticket_types": [
          {
            "title": "Child",
            "price": "10",
            "description": ""
          },
          {
            "title": "Adult",
            "price": "30",
            "description": ""
          }
        ]
      }
    ],
    "advance":{
      "is_attendees_required": "1",
      "is_show_address": "1",
      "is_cash_allowed": "1",
      "is_donation_allowed": "1",
      "is_show_regulation": "1",
      "renew_advance_fields": "0",
      "is_show_stripe": "1"
    },
    "activities": [
      {
        "sub_event_id": "send_it_empty_in_create_event",
        "activities": [
          {
            "sub_event_id": "send_it_empty_in_create_event",
            "activity_id": "send_it_empty_in_create_event",
            "activity_title": "kabalat shabbat",
            "activity_type": "after_sunset",
            "activity_time": "18",
            "activity_status": 1
          },
          {
            "sub_event_id": "send_it_empty_in_create_event",
            "activity_id": "send_it_empty_in_create_event",
            "activity_title": "by admin 2",
            "activity_type": "before_sunset",
            "activity_time": "10",
            "activity_status": 0
          }
        ]
      },
      {
        "sub_event_id": "send_it_empty_in_create_event",
        "activities": [
          {
            "sub_event_id": "send_it_empty_in_create_event",
            "activity_id": "send_it_empty_in_create_event",
            "activity_title": "by admin 3",
            "activity_type": "after_sunset",
            "activity_time": "20",
            "activity_status": 0
          }
        ]
      }
    ]
  }

export const Validator = (data: any, schema: any) =>{
    try
    {
        const {value, error} = schema.validate(data, {abortEarly:false})
        console.log("autoForm validation errors",error?.details)
        const result = error?.details.map((el:any)=>{
            return el.path[0]
        })

        return result
    }
    catch(error)
    {
        if(error instanceof Error)
        {
            console.log(error.message)
        }
    }
}

export type autoFormType = typeof autoFormDefaults

