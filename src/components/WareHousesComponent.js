import {useParams} from "react-router-dom";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import React, {useEffect, useState} from "react";
import WareHouseService from "../services/WareHouseService";
import ReactPaginate from "react-paginate";
import UnitService from "../services/UnitService";
import Modal from "react-bootstrap/Modal";
import ProductService from "../services/ProductService";


export default function WareHousesComponent(){
    let { id } = useParams();
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const [totalPages, setTotalPages] = useState();

    const [showDelete, setShowDelete] = useState(false);
    const [warehouseDetailsId, setWarehouseDetailsId] = useState({
        wareHouseId:id,
        productId: "",
    });
// Error message
    const [errorMessage, setErrorMessage] =useState("");
    useEffect(() => {
        getAllProductsByWareHouseId(page, size,id);
    }, [page, size]);
    function getAllProductsByWareHouseId(page,size,id) {
        WareHouseService.getWareHouseById(page, size,id).then((response) => {
            setProducts(response.data.content);
            setTotalPages(response.data.totalPages);
        })
    }

    function goToDelete(pId) {
        setWarehouseDetailsId({
            ...warehouseDetailsId, productId: pId
        })
        setShowDelete(true)
    }

    const deleteWarehouseDetails = () => {
        WareHouseService.deleteWarehouseDetails(warehouseDetailsId.wareHouseId,warehouseDetailsId.productId).then(() => {
            getAllProductsByWareHouseId(page, size,id);
            setShowDelete(false)
        }).catch(err => {
            console.log(err)
        });
        getAllProductsByWareHouseId(page, size,id);
    }
    function onSizeChange(v) {
        if(v>0){
            setSize(v);
            setErrorMessage("")
        }else{
            setErrorMessage("row per page must be greater than zero");
        }
    }
    // phân trang
    const handlePageClick = (event) => {
        setPage(event.selected);
    };

    function goToUpdate() {

    }

    return(
        <>
            <Row className={'container-fluid'}>
                <Col>
                    <h1 style={{display: "inline", margin: "10px"}}>Warehouse {id}</h1>

                </Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
                {products
                    .map((p,index) =>
                        <tr key={index}>
                            <td>{p.productName}</td>
                            <td>{p.quantity}</td>
                            <td>
                                <Button className="me-2" variant={"danger"} onClick={() => goToDelete(p.productId)}>
                                    <i className="bi bi-trash"></i>
                                </Button>
                                <Button variant={"warning"}>
                                    <i onClick={() => goToUpdate()} className="bi bi-pencil"></i>
                                </Button></td>
                        </tr>)} 
                </tbody>
            </Table>
            <form>
                <label htmlFor="html">Row per page</label>
                <input type="number" id="html" value={size} onChange={(e) => onSizeChange(e.target.value)}/>
                <p style={{color: "red"}}>{errorMessage}</p>
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
            {/*Modal Delete*/}
            <Modal show={showDelete}>
                <Modal.Header>
                    <Modal.Title>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Do you really want delete this?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"danger"} onClick={() => deleteWarehouseDetails()}>Delete</Button>
                    <Button onClick={() => setShowDelete(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}