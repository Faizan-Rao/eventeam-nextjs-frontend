

import SquaresFour from '@/components/icons/SquaresFour'
import Buildings from '@/components/icons/Buildings'
import CalendarBlank from '@/components/icons/CalendarBlank'
import CurrencyCircleDollar from '@/components/icons/CurrencyCircleDollar'
import Slider from '@/components/icons/Slider'
import Crown from '@/components/icons/Crown'
import Calendar from '@/components/icons/Calendar'



export const paths =  [
    {
        name: "Dashboard",
        path:"/dashboard",
        icon: SquaresFour()
    },
    {
        name:"Companies",
        path:"/dashboard/companies",
        icon: Buildings()
    },
    {
        name:"Events",
        icon: CalendarBlank(),
        children: [
            {
                name:"My Events",
                path:"/dashboard/my-events",
                icon: CalendarBlank(),
            },
            {
                name:"Add Event",
                path:"/dashboard/add-event",
                icon: CalendarBlank(),
            }
        ],
    },
    {
        name:"Payment Details",
        path:"/dashboard/payments",
        icon: CurrencyCircleDollar()
    },
    {
        name: "General Settings",
        path:"/dashboard/settings",
        icon: Slider(),
        children: [
            {
                name:"Add Event",
                path:"/dashboard/events/add-event",
                icon: SquaresFour(),
            },
            {
                name:"Add Event",
                path:"/dashboard/events/add-event",
                icon: SquaresFour(),
            }
        ],
    },
    {
        name:"Leads",
        path:"/dashboard/leads",
        icon: Crown()
    },
]


