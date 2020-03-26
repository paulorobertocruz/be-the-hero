import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import heroes from '../../assets/heroes.png';
import './styles.css';

import api from '../../services/api';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogon(e) {
        e.preventDefault();
        try {
            const response = await api.post('/sessions', { id });
            localStorage.setItem('_id', id);
            localStorage.setItem('_name', response.data.name);
            history.push('/profile');
        } catch (err) {
            alert(err);
        }
    }
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="Be The Hero" />
                <h1>Faça seu logon</h1>
                <form onSubmit={handleLogon}>
                    <input value={id} onChange={e => setId(e.target.value)} placeholder="Seu ID" />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register" >
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroes} alt="Heroes" />
        </div>
    );
}