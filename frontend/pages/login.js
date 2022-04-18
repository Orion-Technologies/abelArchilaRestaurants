/* /pages/login.js */

import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { useRouter } from "next/router";
import Router from "next/router";


import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { login, login2 } from "../lib/auth";
import { withAuthSync } from "../lib/auth";
import AppContext from "../context/AppContext";
import Cookie from "js-cookie";

function Login(props) {
  const [data, updateData] = useState({ identifier: "", password: "" });
  // const [authUser, setAuthUser] = useState({ Component: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const appContext = useContext(AppContext);
  var tokenMagico = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2U1MDA4NzRjN2EyMDQwYjdkMDMzYiIsImlhdCI6MTY0ODc4MTE3MiwiZXhwIjoxNjUxMzczMTcyfQ.iFBEgvRqCv9Qhol0CsMGe9Eyo8CiI5SpDWRDPH-QtTI';
  // const {isAuthenticated } = appContext;

  useEffect(() => {
    if (appContext.isAuthenticated) {
      router.push("/"); // redirect if you're already logged in
    }
  }, []);

  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 7, offset: 3 }}>
          <div className="paper">
            <div className="header">
              
            </div>
            <section className="wrapper">
              {Object.entries(error).length !== 0 &&
                error.constructor === Object &&
                error.message.map((error) => {
                  return (
                    <div
                      key={error.messages[0].id}
                      style={{ marginBottom: 10 }}
                    >
                      <small style={{ color: "red" }}>
                        {error.messages[0].message}
                      </small>
                    </div>
                  );
                })}
              <Form>
                <fieldset disabled={loading}>
                  <FormGroup>
                    <Label>Email:</Label>
                    <Input
                      onChange={(event) => onChange(event)}
                      name="identifier"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password:</Label>
                    <Input
                      onChange={(event) => onChange(event)}
                      type="password"
                      name="password"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <span>
                      <a href="">
                        <small>Forgot Password?</small>
                      </a>
                    </span>
                    <Button
                      style={{ float: "right", width: 120 }}
                      color="primary"
                      onClick={() => {
                        setLoading(true);
                        login(data.identifier, data.password)
                          .then((res) => {
                            setLoading(false);

                            // set authed User in global context to update header/app state
                            appContext.setUser(res.data.user);
                            console.log("res.data.user", res.data.user);
                          })
                          .catch((error) => {
                            setError(error.response.data);
                            setLoading(false);
                          });
                      }}
                    >
                      {loading ? "Loading... " : "Submit"}
                    </Button>
                  </FormGroup>

                  <FormGroup>
                    <Button
                      style={{
                        float: "right",
                        width: 120,
                      }}
                      color="primary"
                      onClick={(e) => {

                        setLoading(true);
                        Router.push("/googleauth");


                        // console.log("e", e);
                        // var firebaseConfig = {
                        //   apiKey: "AIzaSyAuoAYiP3jqpTbq6IIxJ6xULiiHlJO5qXg",
                        //   authDomain: "login-a7caa.firebaseapp.com",
                        //   databaseURL:
                        //     "https://login-a7caa-default-rtdb.firebaseio.com/",
                        //   projectId: "login-a7caa",
                        //   storageBucket: "login-a7caa.appspot.com",
                        //   messagingSenderId: "79123120402",
                        //   appId: "1:79123120402:web:9d8607669e22576ca733cb",
                        // };
                        // // Initialize Firebase
                        // firebase.initializeApp(firebaseConfig);
                        // var provider = new firebase.auth.GoogleAuthProvider();
                        // provider.addScope("profile");
                        // provider.addScope("email");
                        // firebase
                        //   .auth()
                        //   .signInWithPopup(provider)
                        //   .then((result) => {
                        //     const myUser = {
                        //       email: result.user.email,
                        //       username: result.user.displayName,
                        //     };

                        //     appContext.setUser(myUser);
                        //     console.log(result.user);
                        //     console.log(
                        //       "Access Token Firebase",
                        //       result.user.accessToken
                        //     );

                            //  router.push("/");
                        //     console.log(result.user.displayName);
                        //   })
                        //   .catch(console.log);
                      }}
                    >
                      Google Auth
                    </Button>
                  </FormGroup>
                </fieldset>
              </Form>
            </section>
          </div>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            border-radius: 6px;
            margin-top: 90px;
          }
          .notification {
            color: #ab003c;
          }
          .header {
            width: 100%;
            height: 120px;
            background-color: #2196f3;
            margin-bottom: 30px;
            border-radius-top: 6px;
          }
          .wrapper {
            padding: 10px 30px 20px 30px !important;
          }
          a {
            color: blue !important;
          }
          img {
            margin: 15px 30px 10px 50px;
          }
        `}
      </style>
    </Container>
  );
}

export default Login;
