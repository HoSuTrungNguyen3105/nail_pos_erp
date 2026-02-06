import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarData } from "../../../components/layout/sidebarData";

const HorizontalSidebar = () => {
    const location = useLocation();
    const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);

    return (
        <div className="sidebar horizontal-sidebar">
            <div id="sidebar-menu-3" className="sidebar-menu">
                <ul className="nav">
                    <li className="nav-item">
                        <div className="sidebar-logo px-4">
                            <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
                                HIWEB POS
                            </span>
                        </div>
                    </li>
                    {SidebarData?.map((mainLabel, index) => {
                        const isChildActive = mainLabel.submenuItems?.some(item =>
                            item.link && (location.pathname === item.link || location.pathname.startsWith(item.link))
                        );

                        return (
                            <li
                                className={`nav-item ${activeSubmenu === index ? "submenu-open" : ""} ${isChildActive ? "active" : ""}`}
                                key={index}
                                onMouseEnter={() => setActiveSubmenu(index)}
                                onMouseLeave={() => setActiveSubmenu(null)}
                            >
                                <Link to={mainLabel.link || "#"} className={`nav-link ${isChildActive ? "active" : ""}`}>
                                    <div className="menu-icon flex items-center justify-center">
                                        {mainLabel.icon || <div style={{ width: 20, height: 20 }}></div>}
                                    </div>
                                    <span className="menu-title ml-2">{mainLabel?.label}</span>
                                </Link>

                                {mainLabel.submenuItems && mainLabel.submenuItems.length > 0 && (
                                    <ul className="submenu" style={{
                                        display: activeSubmenu === index ? "block" : "none",
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        backgroundColor: 'white',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                        borderRadius: '0.5rem',
                                        minWidth: '200px',
                                        zIndex: 50,
                                        padding: '0.5rem 0'
                                    }}>
                                        {mainLabel.submenuItems.map((item, i) => (
                                            <li key={i}>
                                                <Link
                                                    to={item.link || "#"}
                                                    className={`block px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${location.pathname === item.link ? "text-indigo-600 font-bold" : "text-slate-600"}`}
                                                >
                                                    {item.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
};

export default HorizontalSidebar;