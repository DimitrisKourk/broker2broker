import React from 'react'
import { Link, useMatch, useResolvedPath } from "react-router"
import './NavBarLandingPage.css'
import { useAuth } from '../AuthContext/AuthContext'
import ProfileIconComponent from '../ProfileIconComponent/ProfileIconComponent';


function NavBarLandingPage() {
        const auth=useAuth();
        return (
            <>
            <nav className="landing-page-nav">
                <Link to="/" className="site-title">PropertiesB2B</Link>
                <ul>
                    <CustomLink to="/">Main</CustomLink>
                    <CustomLink to="/pricing">Pricing</CustomLink>
                    <CustomLink to="/about">About</CustomLink>
                    {auth.isAuthenticated==='false'? <CustomLink to="/auth">Login/register</CustomLink>: <ProfileIconComponent/>}

                </ul>
            </nav>
            </>
        )
    }

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

export default NavBarLandingPage
