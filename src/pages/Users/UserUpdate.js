import React, { useEffect, useRef, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService } from "../../services/userService";
import { UpdateUserFormSubmit } from '../../components/Users/UpdateUserFormSubmit';
import Container from '@mui/material/Container';

const UserUpdate = () => {
    const [user, setUser] = useState([])
    const flag = useRef(false)
    let navigate = useNavigate()

    // Récupération ID utilisateur
    const { id } = useParams()

    // Gestion de la modification des champs du formulaire
    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    // Soumission du formulaire
    const onSubmit = (e) => {
        e.preventDefault()

        userService.updateUser(id, user)
            .then(res => {
                navigate("/users", {replace: true})
            })
            .catch(err => console.log(err))
    }

    // Récupération de l'utilisateur à l'affichage
    useEffect(() => {
        if (flag.current === false) {
            userService.getUser(id)
                .then(res => {
                    let newUser = {
                        username: res.data.email,
                        lastname: res.data.lastname,
                        firstname: res.data.firstname,
                    }
                    setUser(newUser)
                })
                .catch(err => console.log(err))
        }

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container maxWidth={false}>
            <form onSubmit={onSubmit}>
                <UpdateUserFormSubmit onChange={onChange} user={user}/>
            </form>
        </Container>
   );
};

export default UserUpdate;