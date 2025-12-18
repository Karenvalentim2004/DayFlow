import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Nav.css";

function Nav() {
    return (

        <nav className="sidebar">
            <header>

                <div className="image-text">
                    <span className="image">
                        <img src="/logo.png" alt="logo" />
                    </span>

                    <div className="text header-text">
                        <span className="name">DayFlow</span>
                        <span className="profession">Organize seu dia</span>
                    </div>
                </div>

                <i className="bx bx-chevron-right toggle"></i>

            </header>
        </nav>

    );
}

export default Nav;