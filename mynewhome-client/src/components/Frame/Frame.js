import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Frame.css'

class Frame extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <a className="navbar-brand--wide" href="index.html">
                            <img src="images/mynewhome-admin-logo.png" alt="MyNewHome" />
                        </a>
                        <div className="collapse navbar-collapse justify-content-end nav__collapse">
                            <ul className="nav navbar-nav">
                                <li className="active nav-item nav__li nav__li--active">
                                    <NavLink className="nav-link nav__a" to="/general">General</NavLink>
                                </li>
                                <li className="nav-item nav__li">
                                    <NavLink className="nav-link nav__a" to="/sales">Sales</NavLink>
                                </li>
                                <li className="nav-item nav__li">
                                    <NavLink className="nav-link nav__a" to="/buildings">Buildings</NavLink>
                                </li>
                            </ul>
                        </div>
                        <a className="navbar-brand--mobile" href="index.html">
                            <img src="images/mynewhome-admin-logo-mobile.png" alt="MyNewHome" />
                        </a>
                        <button className="navbar-toggler mobile-view__btn" onclick="openNav()">
                            <div className="button-bar"></div>
                            <div className="button-bar"></div>
                            <div className="button-bar"></div>
                        </button>
                        <div id="myNav" className="mobile-view--overlay">
                            <a href="javascript:void(0)" className="closebtn" onclick="closeNav()">&times;</a>
                            <a className="mobile-view__link mobile-view__link--active" href="#">General</a>
                            <a className="mobile-view__link" href="sales.html">Sales</a>
                            <a className="mobile-view__link" href="buildings.html">Buildings</a>
                        </div>
                    </div>
                </nav>

                {this.props.children}

                <div className="container-fluid">
                    <div className="row">
                        <div className="footer">
                            <p className="footer__paragraph"> MyNewHome - 2019 </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Frame;
