import { Router, useRouter } from "next/router";
import { Container, Row, Col, Button } from "reactstrap";
import { googleauthfunction } from "../lib/auth";

function GoogleLoginAuth() {
  const router = useRouter();
  let aux = router.asPath;
  if (aux !== "/googleauth") {
    let access_token = aux.split("/googleauth?id_token=");
    console.log("ACCESS_TOKEN", access_token);
    console.log("Acces_token1", access_token[1]);
    googleauthfunction(access_token[1]);
  }
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div>After clicking go back to Homepage.</div>
            <Button
              color="primary"
              onClick={(e) => {
                window.location.assign("http://localhost:1337/connect/google");
                e.preventDefault();
              }}
            >
              Google Login Strapi
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default GoogleLoginAuth;
