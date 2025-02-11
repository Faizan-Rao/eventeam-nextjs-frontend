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
  ticket_types: joi.array().items(ticket).required(),
});

const activity = joi.object({
  sub_event_id: joi.any().default(""),
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
});
export const addEventSchema = joi.object({
  title: joi.string().required().label("Event Title"),
  start_date: joi
    .date()
    .required()
    .label("Start Date")
    .custom((value, helpers) => {
      const { start_date } = helpers.state.ancestors[0];
      if (Date.now() > value) {
        return helpers.message(`"Start Date" must not be previous from today"` as any);
      }
      return value; // Valid case
    }),
  end_date: joi
    .date()
    .required()
    .label("End Date")
    .custom((value, helpers) => {
      const { start_date } = helpers.state.ancestors[0];
      if (value <= start_date) {
        return helpers.message(`"End Date" must be after start date"` as any);
      }
      return value; // Valid case
    }),
  event_description: joi.string().required().label("Event Description"),
  tickets: joi.array().items(ticketType).min(1).required(),
  sub_events: joi.array().items(subevent).required(),
  advance: joi.object({
    is_attendees_required: joi.string().required(),
    is_donation_allowed: joi.string().required(),
    is_cash_allowed: joi.string().required(),
    is_show_address: joi.string().required(),
    is_show_regulation: joi.string().required(),
    is_show_stripe: joi.string().required(),
    // renew_advance_fields: joi.string().required(),
  }),
  activities: joi.array().items(activity).min(1).required(),
});

export const autoConfigSchema = joi.object({
  title: joi.string().empty(""),
  start_date: joi.date().empty(""),
  end_date: joi.date().empty(""),
  event_description: joi.string().required().label("Event Description"),
  tickets: joi.array().items(ticketType).min(1).required(),
  sub_events: joi.array().items(subevent).required(),
  advance: joi.object({
    is_attendees_required: joi.string().required(),
    is_donation_allowed: joi.string().required(),
    is_cash_allowed: joi.string().required(),
    is_show_address: joi.string().required(),
    is_show_regulation: joi.string().required(),
    is_show_stripe: joi.string().required(),
    // renew_advance_fields: joi.string().required(),
  }),
  activities: joi.array().items(activity).min(1).required(),
});

// export const autoForm = window.location.href.includes("add-event") ? addEventSchema : autoConfigSchema

export const autoFormDefaults = {
  // title: "asasas",
  // start_date: "2025-01-07T22:22:14.000000Z",
  // end_date: "2025-01-07T22:22:14.000000Z",
  // event_description: "<p>ascsdcsacSDC</p",
  tickets: [
    {
      title: "Ticket",
      price: "10",
      description: "",
    },
    // {
    //   title: "Adult",
    //   price: "20",
    //   description: "",
    // },
  ],
  sub_events: [],
  advance: {
    is_attendees_required: "1",
    is_show_address: "1",
    is_cash_allowed: "1",
    is_donation_allowed: "1",
    is_show_regulation: "1",

    is_show_stripe: "1",
  },
  activities: [
    {
      sub_event_id: "send_it_empty_in_create_event",
      activities: [
        {
          sub_event_id: "send_it_empty_in_create_event",
          activity_id: "send_it_empty_in_create_event",
          activity_title: "activity",
          activity_type: "after_sunset",
          activity_time: "0",
          activity_status: 1,
        },
      ],
    },
  ],
};

export const Validator = (data: any, schema: any) => {
  try {
    const { value, error } = schema.validate(data, { abortEarly: false });
    console.log("autoForm validation errors", error?.details);
    const result = error?.details.map((el: any) => {
      return el.path[0];
    });

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export type autoFormType = typeof autoFormDefaults;
