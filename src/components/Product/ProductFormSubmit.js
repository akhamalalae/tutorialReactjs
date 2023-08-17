import React from 'react';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import '../css/style.css';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import { settingsService } from '../../services/settingsService';
import DownloadIcon from '@mui/icons-material/Download';
import Fab from '@mui/material/Fab';
import dateFormat from 'dateformat';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function ProductFormSubmit(props) {
    const categories = useSelector((state) => state.categoriesProduct)

    return (
        <div>
                <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap >
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField
                            id="libelle"
                            label="Libelle"
                            name="libelle"
                            value={""+props.product.libelle !== "undefined" ? ""+props.product.libelle : ""}
                            onChange={props.onChange}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField
                            id="description"
                            label="Description"
                            name="description"
                            value={""+props.product.description !== "undefined" ? ""+props.product.description : ""}
                            onChange={props.onChange}
                            multiline
                            rows={3}
                            //maxRows={4}
                        />
                    </FormControl>
                </Stack>
                <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap >
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <TextField
                            id="price"
                            label="Price"
                            type="number"
                            name="price"
                            value={""+props.product.price !== "undefined" ? ""+props.product.price : ""}
                            onChange={props.onChange}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <FormControlLabel control={<Checkbox
                            id="status"
                            name="status"
                            onChange={props.onChange}
                            value={props.product.status}
                            checked={props.product.status === true ? true : false}
                        />} label="Status" />
                    </FormControl>
                </Stack>
                <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap >
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Categories</InputLabel>
                        <Select
                        labelId="demo-multiple-checkbox-label"
                        id="categories"
                        name="categories"
                        multiple
                        onChange={props.onChange}
                        value={! props.product.categories ? [] : props.product.categories}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                        >
                        {categories.map((categorie) => (
                            <MenuItem key={categorie.id} value={categorie.libelle}>
                            <Checkbox checked={(! props.product.categories ? [] : props.product.categories).indexOf(categorie.libelle) > -1} />
                            <ListItemText primary={categorie.libelle} />
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Stack>
                <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap >
                <FormControl fullWidth sx={{ m: 1 }}>
                    <Alert variant="light">
                        <Alert.Heading>Add Files</Alert.Heading>
                            <TextField
                                variant="outlined"
                                type="file"
                                inputProps={{
                                    multiple: true
                                }}
                                id="file"
                                name="file"
                                onChange={props.onChange}
                        />
                        <hr />
                        <ListGroup as="ol" numbered>
                            {props.productFiles.map((file) => (
                                <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                                key={file.fileName}
                                >
                                    <div className="ms-2 me-auto">
                                    <div className="fw-bold">{file.fileName.split("_")[1]}</div>
                                        {dateFormat(file.updatedAt, "yyyy:mm:dd hh:mm")}
                                    </div>
                                    <Fab color="primary" size="small" aria-label="add" href={settingsService.urlBase()+file.contentUrl} key={file.fileName} target="_blank" download>
                                        <DownloadIcon />
                                    </Fab>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Alert>
                </FormControl>
                </Stack>
                <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap >
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end" >
                        <Button variant="contained" type="submit" endIcon={<SendIcon />}>
                            {props.titleButtonForm}
                        </Button>
                        </Box>
                    </FormControl>
                </Stack>
            </div>
    );
}
