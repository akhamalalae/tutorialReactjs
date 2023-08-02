import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import '../css/style.css';

export function AddUserFormSubmit(props) {
  return (
    <div>
      <div className='centre_element'>
                <h1>Ajouter un utilisateur</h1>
                <br/>
                <div>
                    <FormControl>
                        <InputLabel htmlFor="firstname">Nom</InputLabel>
                        <Input type="text" name="firstname" onChange={props.onChange} />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="lastname">Prénom</InputLabel>
                        <Input type="text" name="lastname" onChange={props.onChange}/>
                    </FormControl>
                </div>
                <br/>
                <div>
                    <FormControl>
                        <InputLabel htmlFor="username">Email address</InputLabel>
                        <Input type="text" name="username" onChange={props.onChange} />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="password">Mot de passes</InputLabel>
                        <Input type="text" name="password" onChange={props.onChange}/>
                    </FormControl>
                </div>
                <br/>
                <div>
                    <FormControl>
                        <Button variant="contained" type="submit">Ajouter</Button>
                    </FormControl>
                </div>
            </div>
    </div>
  );
}
