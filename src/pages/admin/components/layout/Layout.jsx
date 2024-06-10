// components/layout/Layout.jsx
import React from 'react';
import SideBar from '../sideBar/SideBar'; // Adjust this path

function Layout({ children }) {
    return (
        <div className="layout">
            <SideBar />
            <div className="content">{children}</div>
        </div>
    );
}

export default Layout;
