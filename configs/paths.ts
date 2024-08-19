



import {Blocks , Building2, Calendar, CircleDollarSign, Crown, SlidersVertical} from 'lucide-react'

export const paths =  [
    {
        name: "Dashboard",
        path:"/dashboard",
        icon: Blocks
    },
    {
        name:"Companies",
        path:"/dashboard/companies",
        icon: Building2
    },
    {
        name:"Events",
        icon: Calendar,
        children: [
            {
                name:"My Events",
                path:"/dashboard/my-events",
                icon: Calendar,
            },
            {
                name:"Add Event",
                path:"/dashboard/add-event",
                icon: Calendar,
            }
        ],
    },
    {
        name:"Payment Details",
        path:"/dashboard/payments",
        icon: CircleDollarSign
    },
    {
        name: "General Settings",
        path:"/dashboard/settings",
        icon: SlidersVertical,
        children: [
            {
                name:"Add Event",
                path:"/dashboard/events/add-event",
                icon: Blocks,
            },
            {
                name:"Add Event",
                path:"/dashboard/events/add-event",
                icon: Blocks,
            }
        ],
    },
    {
        name:"Leads",
        path:"/dashboard/leads",
        icon: Crown
    },
]


