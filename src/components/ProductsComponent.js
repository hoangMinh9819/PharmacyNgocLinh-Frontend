import React, {useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import ProductService from "../services/ProductService";
import ReactPaginate from 'react-paginate';
import UnitService from "../services/UnitService";


export default function ProductsComponent() {
    const [productsList, setProductsList] = useState([]);
    const [unitList,setUnitList] = useState([])
// Update Product
    const [showUpdate, setShowUpdate] = useState(false);
    const [productUpdate, setProductUpdate] = useState([]);
// Add Product
    const [productAdd, setProductAdd] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
// Delete Product
    const [showDelete, setShowDelete] = useState(false);
    const [idDelete, setIdDelete] = useState();
// Pagination
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const [totalPages, setTotalPages] = useState(0);
// Error message
    const [errorMessage, setErrorMessage] =useState("");
// Search
    const [searchName,setSearchName] = useState("");
    // khởi taạo ban đau
    useEffect(() => {
        goToSearchName(page, size, searchName);
    }, [page, size, searchName]);

    function getAllProducts(page,size) {
        ProductService.getProductsList(page, size).then((response) => {
            setProductsList(response.data.content);
            setTotalPages(response.data.totalPages);
        })
    }

    function goToSearchName(page, size, name) {
        if (name.trim() === '') {
            getAllProducts(page,size)
        } else {
            ProductService.getProductsListByName(page,size,name).then((response) => {
                setProductsList(response.data.content);
                setTotalPages(response.data.totalPages);
            })
        }
    }

    async function goToUpdate(id) {
        await ProductService.getProductById(id).then((response) => {
            setProductUpdate(response.data);
        })
        await UnitService.getUnitsList().then((response) => {
            setUnitList(response.data);
        })
        setShowUpdate(true);
    }

    const updateProduct = () => {
        ProductService.updateProduct(productUpdate).then(() => {
            setShowUpdate(false);
            getAllProducts(page,size);
        })
    }
    async function goToAdd() {
        await UnitService.getUnitsList().then((response) => {
            setUnitList(response.data);
        })
        setShowAdd(true);
    }
    const addProduct = () => {
        ProductService.addProduct(productAdd).then(() => {
            setShowAdd(false);
            getAllProducts(page,size);
        })
    }

    function goToDelete(id) {
        setShowDelete(true)
        setIdDelete(id)
    }

    const deleteP = (id) => {
        ProductService.deleteProduct(id).then(() => {
            getAllProducts(page,size);
            setShowDelete(false)
        }).catch(err => {
            console.log(err)
        });
    }

// phân trang
    const handlePageClick = (event) => {
        setPage(event.selected);
    };
    function onSizeChange(v) {
        if(v>0){
            setSize(v);
            setErrorMessage("")
        }else{
            setErrorMessage("row per page must be greater than zero");
        }
    }
// UI
    return (<>
        <Row className={'container-fluid'}>
            <Col>
                <h1 style={{display:"inline", margin: "10px"}}>Products List</h1>
                <Button style={{marginBottom:"15px"}} onClick={() => goToAdd()}>Add</Button>
            </Col>
        </Row>
        <InputGroup className="mb-3">
            <InputGroup.Text>Search By Name</InputGroup.Text>
            <Form.Control
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Enter name"
            />
        </InputGroup>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Unit Purchase</th>
                <th>Unit Sale</th>
                <th>Packing</th>
                <th>Purchase Price</th>
                <th>Sale Price</th>
                <th>Expiry</th>
            </tr>
            </thead>
            <tbody>
            {productsList
                .map((p) => <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.unitPurchase}</td>
                    <td>{p.unitSale}</td>
                    <td>{p.packing}</td>
                    <td>{p.purchasePrice}</td>
                    <td>{p.salePrice}</td>
                    <td>{p.expiry}</td>
                    <td>
                        <Button className="me-2" variant={"danger"} onClick={() => goToDelete(p.id)}>
                            <i className="bi bi-trash"></i>
                        </Button>
                        <Button variant={"warning"}>
                            <i onClick={() => goToUpdate(p.id)} className="bi bi-pencil"></i>
                        </Button></td>
                </tr>)}
            </tbody>
        </Table>
        <form>
            <label htmlFor="html">Row per page</label>
            <input type="number" id="html" value={size} onChange={(e)=>onSizeChange(e.target.value)}/>
            <p style={{color:"red"}}>{errorMessage}</p>
        </form>
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            containerClassName={"pagination"}
            activeClassName={"active"}
        />

        {/*Modal Update*/}
        <Modal show={showUpdate}>
            <Modal.Header>
                <Modal.Title>Update Product Id: {productUpdate.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <InputGroup className="mb-3">
                        <Form.Control type="text" value={productUpdate.name} name={"name"}
                                      onChange={(e) => setProductUpdate({
                                          ...productUpdate, [e.target.name]: e.target.value
                                      })}/>

                        <InputGroup.Text>Name</InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control type="text" value={productUpdate.purchasePrice} name={"purchasePrice"}
                                      onChange={(e) => setProductUpdate({
                                          ...productUpdate, [e.target.name]: e.target.value
                                      })}/>
                        <InputGroup.Text>Purchase Price</InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control type="text" value={productUpdate.salePrice} name={"salePrice"}
                                      onChange={(e) => setProductUpdate({
                                          ...productUpdate, [e.target.name]: e.target.value
                                      })}/>
                        <InputGroup.Text>Sale Price</InputGroup.Text>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Select
                            defaultValue={productUpdate.unitPurchase}
                            onChange={(e) => setProductUpdate({
                                ...productUpdate, unitPurchase: e.target.value
                            })}
                        >
                            {unitList.map((unit) => (<option key={unit.id} value={unit.name}>{unit.name}</option>))}
                        </Form.Select>
                        <InputGroup.Text>Unit Purchase</InputGroup.Text>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Select
                            defaultValue={productUpdate.unitSale}
                            onChange={(e) => setProductUpdate({
                                ...productUpdate, unitSale: e.target.value
                            })}
                        >
                            {unitList.map((unit) => (<option key={unit.id} value={unit.name}>{unit.name}</option>))}
                        </Form.Select>
                        <InputGroup.Text>Unit Sale</InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <Form.Control type="number" value={productUpdate.packing} name={"packing"}
                                      onChange={(e) => setProductUpdate({
                                          ...productUpdate, [e.target.name]: e.target.value
                                      })}/>
                        <InputGroup.Text>Packing</InputGroup.Text>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Control type="date" value={productUpdate.expiry} name={"expiry"}
                                      onChange={(e) => setProductUpdate({
                                          ...productUpdate, [e.target.name]: e.target.value
                                      })}/>
                        <InputGroup.Text>Expiry</InputGroup.Text>
                    </InputGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => updateProduct()}
                >Update Product</Button>
                <Button onClick={() => setShowUpdate(false)}>Close</Button>
            </Modal.Footer>
        </Modal>

        {/*Modal Add*/}
        <Modal show={showAdd}>
            <Modal.Header>
                <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Enter name" name={"name"}
                                      onChange={(e) => setProductAdd({
                                          ...productAdd, [e.target.name]: e.target.value
                                      })}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Enter Purchase Price" name={"purchasePrice"}
                                      onChange={(e) => setProductAdd({
                                          ...productAdd, [e.target.name]: e.target.value
                                      })}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Enter Sale Price" name={"salePrice"}
                                      onChange={(e) => setProductAdd({
                                          ...productAdd, [e.target.name]: e.target.value
                                      })}/>
                    </Form.Group>
                    <InputGroup className="mb-3">
                        <Form.Select
                            onChange={(e) => setProductAdd({
                                ...productAdd, unitPurchase: e.target.value
                            })}
                        >
                            <option value={null}>Choose your option</option>
                            {unitList.map((unit, index) => (<option key={index} value={unit.name}>{unit.name}</option>))}
                        </Form.Select>
                        <InputGroup.Text>Unit Purchase</InputGroup.Text>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Select
                            onChange={(e) => setProductAdd({...productAdd, unitSale: e.target.value})}
                        >
                            <option value={null}>Choose your option</option>
                            {unitList.map((unit, index) => (<option key={index} value={unit.name}>{unit.name}</option>))}
                        </Form.Select>
                        <InputGroup.Text>Unit Sale</InputGroup.Text>
                    </InputGroup>
                    <Form.Group className="mb-3">
                        <Form.Control type="number" placeholder="Enter Paking" name={"packing"}
                                      onChange={(e) => setProductAdd({
                                          ...productAdd, [e.target.name]: e.target.value
                                      })}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="date" name={"expiry"}
                                      onChange={(e) => setProductAdd({
                                          ...productAdd, [e.target.name]: e.target.value
                                      })}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => addProduct()}>Add Unit</Button>
                <Button onClick={() => setShowAdd(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
        {/*Modal Delete*/}
        <Modal show={showDelete}>
            <Modal.Header>
                <Modal.Title>Delete Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Do you want delete product id {idDelete}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"danger"} onClick={() => deleteP(idDelete)}>Delete</Button>
                <Button onClick={() => setShowDelete(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>)
}