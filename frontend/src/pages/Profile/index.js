import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import './styles.css';

import api from '../../services/api';

export default function Profile() {

    const _id = localStorage.getItem('_id');
    const _name = localStorage.getItem('_name');
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    useEffect(function () {
        api.get('/profile', {
            headers: {
                Authorization: _id,
            }
        }).then(function (response) {
            setIncidents(response.data);
        });
    }, [_id]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`/incidents/${id}`, {
                headers: {
                    Authorization: _id,
                }
            });
            setIncidents(incidents.filter(function (incident) { return id !== incident.id }));
        } catch (err) {
            alert("Erro ao deletar incident");
        }
    }

    function handleLogout() {
        localStorage.removeItem('_id');
        localStorage.removeItem('_name');
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt="Be The Hero" />
                <span>Bem vinda, {_name}</span>
                <Link className="button" to="/incidents/new" >
                    Cadastrar novo caso
                </Link>
                <button onClick={_ => handleLogout()} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>
                Casos cadastrados
            </h1>

            <ul>
                {incidents.map((incident) => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                        <button onClick={_ => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}