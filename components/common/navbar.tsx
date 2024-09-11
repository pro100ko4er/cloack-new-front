"use client"
import { NavigationMenu } from "@radix-ui/react-navigation-menu"
import { NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu"
import { NavBarInterface } from "../routes"
import { usePathname } from "next/navigation"
import {ExitIcon} from '@radix-ui/react-icons'
import {Switch} from '../ui/switch'
import useLogout from "../context/hooks/useLogout"
import { useAppDispatch, useAppSelector } from "../context/redux/hooks"
import { switchMode } from "../context/redux/reducers/themeReducer"
import { useTheme } from "next-themes"
import { useMemo } from "react"
export interface NavBarProps {
    data: NavBarInterface[],
}

export default function NavBar(props: NavBarProps) {
   const {data} = props
   const pathname = usePathname()
   const dispatch = useAppDispatch()
   const theme = useAppSelector(state => state.themeReducer)
   const {logout, isLoading, error, errors} = useLogout()
  const themeSwitcher = useTheme()
  useMemo(() => {
    themeSwitcher.setTheme(theme.mode.toLowerCase())
  }, [theme.mode])

    return (
        <NavigationMenu className="dark:bg-slate-800 dark-border-navbar bg-slate-300 pt-5 pb-5 flex row flex-wrap gap-2 align-center justify-between p-10">
            <NavigationMenuList className="gap-10">
                {data.map(elem => {
                        return (
                            <NavigationMenuItem key={elem.title}>
                            <NavigationMenuLink asChild>
                              <a
                                className={`flex select h-full w-full flex-col justify-end pb-2 ${pathname === elem.href && 'border-b border-primary'}`}
                                href={elem.href}
                              >
                                {elem.title}
                              </a>
                            </NavigationMenuLink>
                            </NavigationMenuItem>
                        )
                    })}
            </NavigationMenuList>

            <NavigationMenuList className="gap-5">

            <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                      <a
                                className={`flex select h-full w-full align-center items-center justify-center pb-2 gap-1 cursor-pointer`}
                                onClick={async () => await logout()}
                              >
                                <ExitIcon />
                                 Logout
                              </a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>


                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                      <a
                                className={`flex select h-full w-full items-center gap-2 justify-end pb-2`}
                                 
                              >
                                <Switch 
                                onClick={() => dispatch(switchMode())} 
                                className={theme.mode === 'Light' ? 'switcher-checked' : ''}
                                />
                                 {theme.mode} mode
                              </a>
                      </NavigationMenuLink>
                    </NavigationMenuItem>

            </NavigationMenuList>



        </NavigationMenu>
    )
}

