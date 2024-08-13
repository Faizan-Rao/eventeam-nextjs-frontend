

import SquaresFour from '@/components/icons/SquaresFour'
import Buildings from '@/components/icons/Buildings'
import CalendarBlank from '@/components/icons/CalendarBlank'
import CurrencyCircleDollar from '@/components/icons/CurrencyCircleDollar'
import Slider from '@/components/icons/Slider'
import Crown from '@/components/icons/Crown'



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
        path:"/dashboard/events",
        icon: CalendarBlank(),
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


