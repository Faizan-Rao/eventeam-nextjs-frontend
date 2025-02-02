



import {Blocks , Building2, Calendar, AlbumIcon ,CircleDollarSign, Crown, SlidersVertical, Workflow} from 'lucide-react'

export const paths =  [
    {
        name: "Dashboard",
        path:"/dashboard",
        icon: Blocks,
        role: ["admin", "company"]
    },
    {
        name:"Companies",
        path:"/dashboard/companies",
        icon: Building2,
        role: ["admin"]
    },
    {
        name:"Events",
        icon: Calendar,
        role: ["company", "admin"],
        children: [
            {
                name:"My Events",
                path:"/dashboard/my-events",
                icon: Calendar,
                role: [ "company"]
            },
            {
                name:"Add Event",
                path:"/dashboard/add-event",
                icon: Calendar,
                role: [ "company"]
            },
            {
                name:"Automatic Forms",
                path:"/dashboard/automatic",
                icon: Workflow,
                role: ["admin", "company"]
            },
        ],
    },
    {
        name:"Payment Details",
        path:"/dashboard/payment-details",
        icon: CircleDollarSign,
        role: ["admin", "company"]
    },
    {
        name: "General Settings",
        path:"/dashboard/settings",
        icon: SlidersVertical,
        role: ["admin", "company"],
        children: [
          
            {
                name:"Auto Config",
                path:"/dashboard/auto-config",
                icon: Workflow,
                role: ["admin", "company"]
            },
            {
                name:"Form Field",
                path:"/dashboard/form-field",
                icon: Workflow,
                role: ["admin", "company"]
            },
            {
                name:"Donations",
                path:"/dashboard/donations",
                icon: Workflow,
                role: ["admin", "company"]
            },
            {
                name:"Payment Methods",
                path:"/dashboard/payment-method",
                icon: Workflow,
                role: ["company"]
            }
        ],
    },
    {
        name:"Leads",
        path:"/dashboard/leads",
        icon: Crown,
        role: ["admin"]
    },
    {
        name:"Email Templates",
        path:"/dashboard/email-template",
        icon: AlbumIcon,
        role: ["admin", "company"]
    },
]


