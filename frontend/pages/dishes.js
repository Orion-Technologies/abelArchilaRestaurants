/* /pages/dishes.js */
import React, { useState } from "react";
import { Button, Col, Input, InputGroup, Row } from "reactstrap";
import DishesList from "../components/DishesList";

function HomeDishes() {
  const [query, updateQuery] = useState("");
  return (
    <div className="container-fluid">
      <Row>
        <Col>
          <div className="search">
            <InputGroup>
              {/* <Input addonType="append"> Search </Input> */}
              <Button addontype="append"> Search </Button>
              <Input
                onChange={(e) =>
                  updateQuery(e.target.value.toLocaleLowerCase())
                }
                value={query}
              />
            </InputGroup>
          </div>
          <DishesList search={query} />
        </Col>
      </Row>
      <style jsx>
        {`
          .search {
            margin: 20px;
            width: 500px;
          }
        `}
      </style>
    </div>
  );
}
export default HomeDishes;
