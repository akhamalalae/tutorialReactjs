import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import '../css/style.css';

export function LoginFormSubmit(props) {
  return (
    <div>
      <div className='centre_element'>
          <h1>Login </h1>
          <br/>
          <div>
            <FormControl>
              <InputLabel htmlFor="email">Email address</InputLabel>
              <Input type="text" name="username"  value={''+props.credentials.username} onChange={props.onChange} />
            </FormControl>
          </div>
          <br/>
          <div>
            <FormControl>
              <InputLabel htmlFor="password">Mot de passes</InputLabel>
              <Input type="text" name="password" value={''+props.credentials.password} onChange={props.onChange}/>
            </FormControl>
          </div>
          <br/>
          <div>
            <FormControl>
              <Button variant="contained" type="submit">Connexion</Button>
            </FormControl>
          </div>
       </div>
    </div>
  );
}
