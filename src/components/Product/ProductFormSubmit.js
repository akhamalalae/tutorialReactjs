import React from 'react';
import { useEffect, useRef } from "react";
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
import { categoriesProductService } from '../../services/categoriesProductService';
import { useSelector, useDispatch } from 'react-redux'

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
    const flag = useRef(false)
    const categories = useSelector((state) => state.categoriesProduct)
    const dispatch = useDispatch()

    useEffect(() => {
        if(flag.current === false){
          categoriesProductService.getAllCategories()
          .then(res => {
              let data = res.data["hydra:member"]
              data.forEach( obj =>
                dispatch({
                  type: "categoriesProduct/addCategoriesProduct",
                  payload: categoriesProductService.constructObject(obj)
                })
              )
          })
          .catch(error => console.log(error))
        }

        return () => flag.current = true
    }, [dispatch, categories]);

  return (
      <div>
            <h1>{props.titleForm}</h1>
            <br/>
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
                <FormControl sx={{ m: 1, width: 300 }}>
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
                        <MenuItem key={categorie.id} value={categorie.url}>
                        <Checkbox checked={(! props.product.categories ? [] : props.product.categories).indexOf(categorie.url) > -1} />
                        <ListItemText primary={categorie.libelle} />
                        </MenuItem>
                    ))}
                    </Select>
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
