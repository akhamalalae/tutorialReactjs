import React, { useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import '../css/style.css';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import OutlinedInput from '@mui/material/OutlinedInput';

export function UpdateUserFormSubmit(props) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <h1>Update user</h1>
            <br/>
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap >
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField
                        id="firstname"
                        label="Firstname"
                        name="firstname"
                        required
                        value={''+props.user.firstname}
                        onChange={props.onChange}
                        error={!props.user.firstname}
                        helperText={!props.user.firstname ? 'Field is required ' : ""}
                    />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField
                        id="lastname"
                        label="Lastname"
                        name="lastname"
                        value={''+props.user.lastname}
                        onChange={props.onChange}
                    />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                    <InputLabel htmlFor="Password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        label="Password"
                        name="password"
                        onChange={props.onChange}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                </FormControl>
            </Stack>
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap >
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField
                        id="username"
                        label="Email"
                        name="username"
                        value={''+props.user.username}
                        onChange={props.onChange}
                    />
                </FormControl>
            </Stack>
            <Stack direction='row' spacing={2}>
                <FormControl sx={{ m: 1, width: '$0ch' }}>
                    <Button variant="contained" type="submit">Ajouter</Button>
                </FormControl>
            </Stack>
        </div>
    );
}
