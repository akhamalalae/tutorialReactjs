import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountService } from "../../services/accountService";
import { LoginFormSubmit } from '../../components/Users/LoginFormSubmit';

const Login = () => {
    let navigate = useNavigate()

    // Attention ici mise en place de valeur par défaut pour travailler.
    // NE JAMAIS FAIRE CELA
    const [credentials, setCredentials] = useState({
        username: 'admin@gmail.com',
        password: 'admin'
    })

    // Gestion de la modification des champs du formulaire
    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    // Soumission du formulaire
    const onSubmit = (e) => {
        e.preventDefault()
        accountService.login(credentials)
            .then(res => {
                // Sauvegarde du token et envoi vers home page
                accountService.saveToken(res.data.token)
                navigate('/', {replace: true})
            })
            .catch(error => console.log(error))
    }

    return (
        <form onSubmit={onSubmit} >
            <LoginFormSubmit credentials={credentials} onChange={onChange}/>
        </form>
    );
};

export default Login;