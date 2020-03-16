import React, { FunctionComponent, PropsWithChildren } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import './navbar.css';

type Tab = {
    displayName: string;
    path: string;
};

type NavbarProps = {
    activeTab?: number;
    tabs?: Tab[];
};

const Navbar: FunctionComponent = ({
    activeTab = 0,
    tabs = [
        {
            displayName: 'Launches',
            path: '/launches',
        },
    ],
    children,
}: PropsWithChildren<NavbarProps>) => (
    <BrowserRouter>
        <nav className="nav-menu">
            <ul className="nav-list">
                {tabs.map((tab: Tab, i) => (
                    <li className={activeTab === i ? 'active-tab' : ''} key={i}>
                        <Link to={tab.path}>{tab.displayName}</Link>
                    </li>
                ))}
            </ul>
        </nav>
        <>{children}</>
    </BrowserRouter>
);

export default Navbar;
