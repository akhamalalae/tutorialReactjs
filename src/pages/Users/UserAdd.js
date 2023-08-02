import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from "../../services/userService";
import { AddUserFormSubmit } from '../../components/Users/AddUserFormSubmit';

const UserAdd = () => {
    const [user, setUser] = useState([])
    let navigate = useNavigate()

    // Gestion de la modification des champs du formulaire
    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        console.log(user);
    }

    // Gestion de la soumission du formulaire
    const onSubmit = (e) => {
        e.preventDefault()

        userService.addUser(user)
            .then(res => navigate('/users', {replace: true}))
            .catch(err => console.log(err))
    }

    return (
        <form onSubmit={onSubmit}>
            <AddUserFormSubmit onChange={onChange}/>
        </form>
    );
};

export default UserAdd;