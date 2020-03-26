import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

import './styles.css';


export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const history = useHistory();
    
    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            state,
        }

        try {
            const response = await api.post('/non_profits', data);
            history.push('/');
            alert(response.data.id);
        }
        catch (err) {
            alert("Falha!");
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logo} alt='Be The Hero' />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da su ONG.</p>
                    <Link className="back-link" to="/" >
                        <FiArrowLeft size={16} color="#e02041" />
                        Ja tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input value={name} placeholder="Name" onChange={e => setName(e.target.value)} />

                    <input value={email} type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />

                    <input value={whatsapp} placeholder="WhatsApp" onChange={e => setWhatsapp(e.target.value)} />

                    <div className="input-group">
                        <input value={city} placeholder="City" onChange={e => setCity(e.target.value)} />

                        <input value={state} placeholder="State" style={{ width: 80 }} onChange={e => setState(e.target.value)} />
                    </div>
                    <button className="button">Register</button>
                </form>
            </div>
        </div>
    );
}