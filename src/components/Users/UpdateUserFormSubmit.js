import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import '../css/style.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export function UpdateUserFormSubmit(props) {
  return (
    <div>
        <div className='centre_element'>
            <h1>Modifier un utilisateur</h1>
            <br/>
            <Box sx={{ flexGrow: 1 }}>
                 <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Item>
                            <FormControl>
                                <InputLabel htmlFor="firstname">Nom</InputLabel>
                                <Input type="text" name="firstname" value={''+props.user.firstname} onChange={props.onChange} />
                            </FormControl>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <FormControl>
                                <InputLabel htmlFor="lastname">Prénom</InputLabel>
                                <Input type="text" name="lastname" value={''+props.user.lastname} onChange={props.onChange}/>
                            </FormControl>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <FormControl>
                                <InputLabel htmlFor="username">Email address</InputLabel>
                                <Input type="text" name="username" value={''+props.user.username} onChange={props.onChange} />
                            </FormControl>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>
                            <FormControl>
                                <InputLabel htmlFor="password">Mot de passes</InputLabel>
                                <Input type="text" name="password" onChange={props.onChange}/>
                            </FormControl>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl>
                            <Button variant="contained" type="submit">Ajouter</Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </div>
    </div>
  );
}
