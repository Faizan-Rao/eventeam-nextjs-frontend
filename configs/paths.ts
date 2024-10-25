



import {Blocks , Building2, Calendar, CircleDollarSign, Crown, SlidersVertical, Workflow} from 'lucide-react'

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
        path:"/dashboard/payment-details",
        icon: CircleDollarSign
    },
    {
        name: "General Settings",
        path:"/dashboard/settings",
        icon: SlidersVertical,
        children: [
            {
                name:"Automatic Forms",
                path:"/dashboard/automatic",
                icon: Workflow,
            },
            {
                name:"Auto Config",
                path:"/dashboard/auto-config",
                icon: Workflow,
            },
            {
                name:"Form Field",
                path:"/dashboard/form-field",
                icon: Workflow,
            },
            {
                name:"Donations",
                path:"/dashboard/donations",
                icon: Workflow,
            },
            {
                name:"Payment Methods",
                path:"/dashboard/payment-method",
                icon: Workflow,
            }
        ],
    },
    {
        name:"Leads",
        path:"/dashboard/leads",
        icon: Crown
    },
]


