import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { GridActionsCellItem} from '@mui/x-data-grid-pro';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import { ProductFormSubmit } from "../../components/Product/ProductFormSubmit";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { productService } from "../../services/productService";

const Product = () => {
    const products = useSelector((state) => state.product)
    const dispatch = useDispatch()
    const [product, setProduct] = useState([]);
    const [titleForm, setTitleForm] = useState("");
    const [titleButtonForm, setTitleButtonForm] = useState("");
    const [isCreateProduct, setIsCreateProduct] = useState(false);
    const [showFormProduct, setShowFormProduct] = useState(false);
    const flag = useRef(false)
    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'libelle', headerName: 'Libelle', width: 130 },
      { field: 'description', headerName: 'Description', width: 130 },
      {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        width: 160,
      },
      {
        field: 'status',
        headerName: 'Status',
        type: 'boolean',
        width: 160,
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              icon={<DeleteIcon color="error"/>}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<EditIcon color="primary"/>}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
          ];
        },
      },
    ];

    useEffect(() => {
      if(flag.current === false){
        productService.getAllProducts()
          .then(res => {
              let data = res.data["hydra:member"]
              data.forEach( obj =>
                dispatch({
                  type: "product/addProduct",
                  payload: productService.constructObject(obj)
                })
              )
          })
          .catch(error => console.log(error))
      }
      return () => flag.current = true
    }, [dispatch]);

    const onChangeFieldsForm = (e) => {
        if(e.target.name === "categories"){
          const {
            target: { value },
          } = e;
          setProduct({
            ...product,
            [e.target.name]: typeof value === 'string' ? value.split(',') : value,
          })
        }else if(e.target.name === "status"){
          setProduct({
            ...product,
            [e.target.name]: e.target.checked
          })
        }else if(e.target.name === "price"){
          setProduct({
            ...product,
            [e.target.name]: parseInt(e.target.value)
          })
        }else{
          setProduct({
            ...product,
            [e.target.name]: e.target.value
          })
        }
    }

    const handleCancelClick = (id) => () => {
      productService.deleteProduct(id)
          .then(res => {
              dispatch({
                type: "product/deleteProduct",
                payload: id
              })
          })
    };

    const handleEditClick = (id) => () => {
      if(id){
        setShowFormProduct(true);
        setTitleButtonForm("Update")
        setTitleForm("Update product")
        productService.getProduct(id)
          .then(res => {
              setProduct(productService.constructObject(res.data))
          })
          .catch(err => console.log(err))
      }
    };

    const onRowSelectionModelChange = (newRowSelectionModel) => {
        console.log(newRowSelectionModel);
    }

    const handleCreateClick = (event) => {
      setShowFormProduct(true);
      setIsCreateProduct(true)
      setTitleButtonForm("Add")
      setTitleForm("Add product")
      setProduct([])
    }

    const onSubmit = (e) => {
      e.preventDefault()

      if(isCreateProduct === true){
        productService.addProduct(product)
          .then(res => {
            setProduct(productService.constructObject(res.data))
                dispatch({
                    type: "product/addProduct",
                    payload: productService.constructObject(res.data)
                })
          })
          .catch(err => console.log(err))
      }else{
        productService.updateProduct(product.id, product)
          .then(res => {
              dispatch({
                type: "product/editeProduct",
                payload: productService.constructObject(res.data)
              })
          })
          .catch(err => console.log(err))
      }
    }

    return (
      <div style={{ height: 400, width: '100%' }}>
        <Container maxWidth={false}>
          <h1>List of products</h1>
          <DataGrid
            rows={products}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 8]}
            checkboxSelection
            onRowSelectionModelChange={(newRowSelectionModel) => {
              onRowSelectionModelChange(newRowSelectionModel)
            }}
          />
          <br/>
          <Fab size="small" color="primary" aria-label="add product" onClick={handleCreateClick}>
            <AddIcon />
          </Fab>
          {showFormProduct === true ?
            <div>
              <form onSubmit={onSubmit}>
                <ProductFormSubmit onChange={onChangeFieldsForm} titleButtonForm={titleButtonForm} titleForm={titleForm} product={product} />
              </form>
            </div>
            : ""
          }
        </Container>
      </div>
    );
};

export default Product;
