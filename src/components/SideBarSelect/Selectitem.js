import React, { useState } from 'react';

//bootstrap
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//component
import SearchBar from '../SearchBar';
import ListComponent from '../ListComponent'


//인테리어 tab - 가구 선택 카테고리
function Selectitem() {
    return(
        <Container className="List">
            <Row style={{margin: "0px -5px -20px -5px"}}>
                <SearchBar/>
            </Row>
            {/*Basic style*/}
            <Row>
                <Col style={{marginLeft: "5px", marginBottom: "50px"}}>
                    <ListComponent/>
                </Col>
               
            </Row>
        </Container>
    );
}

export default Selectitem;