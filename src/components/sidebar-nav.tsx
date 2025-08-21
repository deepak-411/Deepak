
"use client";

import { useSidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarContent, SidebarHeader } from "./ui/sidebar";
import { BookOpen, Briefcase, Star, Trophy, Award, Mail, Home } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect } from "react";

const navItems = [
    { href: "#", icon: <Home />, label: "Home" },
    { href: "#education", icon: <BookOpen />, label: "Education" },
    { href: "#skills", icon: <Star />, label: "Skills" },
    { href: "#experience", icon: <Briefcase />, label: "Experience" },
    { href: "#projects", icon: <Trophy />, label: "Projects" },
    { href: "#certifications", icon: <Award />, label: "Certifications" },
    { href: "#achievements", icon: <Star />, label: "Achievements" },
    { href: "#contact", icon: <Mail />, label: "Contact" },
]

export function SidebarNav() {
    const { setOpenMobile } = useSidebar();
    const isMobile = useIsMobile();

    useEffect(() => {
        const handleHashChange = () => {
            if (isMobile) {
                setOpenMobile(false);
            }
        };

        window.addEventListener('hashchange', handleHashChange, false);
        return () => {
            window.removeEventListener('hashchange', handleHashChange, false);
        };
    }, [isMobile, setOpenMobile]);

    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("#")) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                // Update URL hash without causing a page reload
                if (history.pushState) {
                    history.pushState(null, "", href);
                } else {
                    location.hash = href;
                }
            }
             if (isMobile) {
                setOpenMobile(false);
            }
        }
    }

    return (
        <>
            <SidebarHeader>
                <h2 className="text-xl font-bold p-2 group-data-[collapsible=icon]:hidden">Navigation</h2>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {navItems.map((item) => (
                         <SidebarMenuItem key={item.label}>
                            <a href={item.href} onClick={(e) => handleNavigation(e, item.href)}>
                                <SidebarMenuButton tooltip={item.label}>
                                     {item.icon}
                                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                                </SidebarMenuButton>
                            </a>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </>
    )
}
