/* components/RestaurantList/index.js */
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Link from "next/link";
import { useRouter } from "next/router";
import Cart from "../cart";
import { useContext, useState } from "react";

import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
  Button
} from "reactstrap";
import AppContext from "../../context/AppContext";

const QUERY = gql`
  query ($id: ID!) {
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

console.log("Query", QUERY);

function DishesList(props) {
  const router = useRouter();
  const appContext = useContext(AppContext);
  const { loading, error, data } = useQuery(QUERY, {
    variables: { id: router.query.id },
  });
  if (error) return "Error loading dishes";
  //if restaurants are returned from the GraphQL query, run the filter query
  //and set equal to variable restaurantSearch
  if (loading) return <h1>Fetching</h1>;
  console.log("dataD", data.restaurant.dishes);
 //console.log("dataDL", data.dishes.length); 
  if (data.restaurant.dishes && data.restaurant.dishes.length) {
    //searchQuery
    const searchQuery = data.restaurant.dishes.filter((query) =>
      query.name.toLowerCase().includes(props.search)
    );
    console.log("searchQuery", searchQuery);
    if (searchQuery.length != 0) {
      console.log("test");
      return (
        <Row>
          {searchQuery.map((res) => (
            <Col xs="6" sm="4" key={res.id}>
              <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                <CardImg
                  top={true}
                  style={{ height: 250 }}
                  // error en esta ruta
                  src={`${process.env.NEXT_PUBLIC_API_URL}${res.image.url}`}
                />
                <CardBody>
                  <CardTitle>{res.name}</CardTitle>
                  <CardText>{res.description}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Button
                    outline
                    color="primary"
                    onClick={() => appContext.addItem(res)}
                  >
                    + Add To Cart
                  </Button>
                </div>
              </Card>
            </Col>
          ))}

          <style jsx global>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              a:hover {
                color: white;
              }
              .card-columns {
                column-count: 3;
              }
            `}
          </style>
          <Col xs="3" style={{ padding: 0 }}>
            <div>
              <Cart />
            </div>
          </Col>
        </Row>
      );
    } else {
      return <h1>No Dishes Found</h1>;
    }
  }
   return <h5>Add Dishes</h5>;
}
export default DishesList;
