/* /pages/restaurants.js */
import React, { useState } from "react";
import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { gql } from "apollo-boost";

import Cart from "../components/cart/";
import AppContext from "../context/AppContext";
import DishesList from "../components/DishesList";


import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
  InputGroup,
  Input
} from "reactstrap";


const GET_RESTAURANT_DISHES = gql`
  query($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;

console.log("disesList", GET_RESTAURANT_DISHES);
function Restaurants() {
  const [query, updateQuery] = useState("");
  const appContext = useContext(AppContext);
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: router.query.id },
  });

  if (error) return "Error Loading Dishes";
  if (loading) return <h1>Loading ...</h1>;
  if (data.restaurant) {
    const { restaurant } = data;
    return (
      <>
        <div className="search">
          <InputGroup>
            <Button addontype="append"> Search </Button>
            <Input
              onChange={(e) => updateQuery(e.target.value.toLocaleLowerCase())}
              value={query}
            />
          </InputGroup>
        </div>
        <DishesList search={query} />
      </>
    );
  }
  return <h1>Add Dishes</h1>;
}
export default Restaurants;
