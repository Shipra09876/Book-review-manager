import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">{props.title}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/home" target="_self" style={linkStyle}>Home</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

const listItemStyle = {
    margin: '0 10px',
};

const linkStyle = {
    color: 'white',
    textDecoration: 'none',
};

