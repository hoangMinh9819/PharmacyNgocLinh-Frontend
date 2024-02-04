import UnitsService from '../services/UnitService';
import React, {useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import {Button} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
export default function UnitsComponent(){
    const [unitsList, setUnitsList] = useState([]);
    const [unit, setUnit] = useState({
        id: '',
        name: ''
    });
    const [unitAdd, setUnitAdd] = useState([]);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [idDelete,setIdDelete]=useState()

    useEffect(() => {
        getAllUnits();
    },[]);
     function getAllUnits()  {
         UnitsService.getUnitsList().then((response) => {
             const data = response.data;
             setUnitsList(data);
             console.log(JSON.stringify(data));
         })
    }


    function goToUpdate(id) {
         setShowUpdate(true);
         UnitsService.getUnitById(id).then((response)=>{
             setUnit(response.data)
         })

        // navigate(`/update/${id}`)
    }
    const updateUnit =  () => {
        UnitsService.updateUnit(unit).then(()=>{
            setShowUpdate(false);
            getAllUnits();
        })
    }
    const addUnit =  () => {
        UnitsService.addUnit(unitAdd).then(()=>{
            setShowAdd(false);
            getAllUnits();
        })
    }

    function gotoDelete(id) {
        setShowDelete(true)
        setIdDelete(id)
    }
    const deleteU = (id) => {
        UnitsService.deleteUnit(id).then(() => {
            getAllUnits();
            setShowDelete(false)
        }).catch(err=>{
            console.log(err)
        });
    }

    return (
        <>
            <h1>Units List</h1>
            <Table striped bordered hover >
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {
                    unitsList.map((u) =>
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>
                                <Button className="me-2" variant={"danger"} onClick={() => gotoDelete(u.id)}><i className="bi bi-trash"></i></Button>
                                <Button variant={"warning"}>
                                <i onClick={()=>goToUpdate(u.id)} className="bi bi-pencil"></i>
                            </Button></td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
            <Button onClick={()=>setShowAdd(true)}>Add</Button>

            <Modal show={showUpdate}>
                <Modal.Header>
                    <Modal.Title>Update Unit</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Table striped bordered hover >
                        <tbody>
                        <tr>
                            <td>Id:</td>
                            <td>{unit.id}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Name:</td>
                            <td>
                                <input type={"text"} value={unit.name}
                                       onChange={(e)=>setUnit({...unit,name:e.target.value})}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        onClick={()=>updateUnit()}
                    >Update Unit</Button>
                    <Button onClick={() => setShowUpdate(false)}>Close</Button>
                </Modal.Footer>
            </Modal>



            <Modal show={showAdd}>
                <Modal.Header>
                    <Modal.Title>Add Unit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text"
                           placeholder="Enter unit name"
                           onChange={(e)=>setUnitAdd({name:e.target.value})}
                />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>addUnit()}>Add Unit</Button>
                    <Button onClick={() => setShowAdd(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showDelete}>
                <Modal.Header>
                    <Modal.Title>Delete Unit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Do you want delete unit id {idDelete}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"danger"} onClick={()=>deleteU(idDelete)}>Delete</Button>
                    <Button onClick={() => setShowDelete(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>)
}