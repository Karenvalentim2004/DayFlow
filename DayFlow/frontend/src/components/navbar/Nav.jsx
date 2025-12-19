import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Nav.css";

const body = document.querySelector("body"),
sidebar = body.querySelector(".sidebar"),
toggle = body.querySelector(".toggle"),
searchBtn = body.querySelector(".search-box"),
modeSwitch = body.querySelector(".toggle-switch"),
modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
    body.classList.toggle("close");

});



function Nav() {
    return (

        <nav className="sidebar close">
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

            <div className="menu-bar">
                <div className="menu">

                    <li className="search-box">
                        <a href="#">
                            <i className="bx bx-search icon"></i>
                            <input type="search" placeholder="Pesquisar..." />
                        </a>
                    </li>

                    <ul className="menu-links">
                        <li className="nav-link">
                            <a href="#">
                                <i className="bx bx-home-alt icon"></i>
                                <span className="text nav-text">Home</span>
                            </a>
                        </li>

                        <li className="nav-link">
                            <a href="#">
                                <i className="bx bx-calendar icon"></i>
                                <span className="text nav-text">Minhas Tarefas</span>
                            </a>
                        </li>

                        <li className="nav-link">
                            <a href="#">
                                <i className="bx bx-bar-chart-alt icon"></i>
                                <span className="text nav-text">Evolução</span>
                            </a>
                        </li>

                        <li className="nav-link">
                            <a href="#">
                                <i className="bx bx-bell icon"></i>
                                <span className="text nav-text">Notificações</span>
                            </a>
                        </li>

                        <li className="nav-link">
                            <a href="#">
                                <i className="bx bx-wallet icon"></i>
                                <span className="text nav-text">Financeiro</span>
                            </a>
                        </li>

                    </ul>
                </div>

                <div className="bottom-content">
                    <li className="">
                        <a href="#">
                            <i className="bx bx-log-out icon"></i>
                            <span className="text nav-text">Sair</span>
                        </a>
                    </li>

                </div>

            </div>
        </nav>

    );
}

export default Nav;