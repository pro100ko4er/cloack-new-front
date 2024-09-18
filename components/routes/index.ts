export interface NavbarSubcomponentInterface {
    title: string,
    href: string,
    description: string
}

export interface NavBarInterface {
    title: string,
    href: string,
}



export const routes: NavBarInterface[] = [
    {title: "Campaigns", href: "/client/lk-user"},
    {title: "Create campaign", href: "/client/add-campaign"},
    // {title: "Statistics", href: "/client/stats-user"},

]

export const adminRoutes: NavBarInterface[] = [
    {title: "Admin account", href: "/admin/index"},
    {title: "Create token", href: "/admin/create-token"},
    {title: "Statistics", href: "/admin/stats"},
]