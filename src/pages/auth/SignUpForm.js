import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/SignInUpForm.module.css";
import appStyles from "../../App.module.css";
import market from '../../assets/marketplace.jpg'

import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
const {username, password1, password2}= signUpData;

const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (errors) {
      setErrors(errors.response?.data);
    }
  };

  

  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>

    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Please insert your username" name="username" value={username} onChange={handleChange} />
      </Form.Group>
      {errors.username?.map((message, idx) => (<Alert variant="warning" key={idx}> {message} </Alert>))}

      <Form.Group controlId="password1">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password1" value={password1} onChange={handleChange}/>
      </Form.Group>
      {errors.password1?.map((message, idx) => (<Alert variant="warning" key={idx}> {message} </Alert>))}

        <Form.Group controlId="password2">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder=" Confirm your Password" name='password2' value={password2} onChange={handleChange}/>
        </Form.Group>
      
        {errors.password1?.map((message, idx) => (<Alert variant="warning" key={idx}> {message} </Alert>))}

      <Button className={`${btnStyles.Blue} ${btnStyles.Wide} ${btnStyles.Bright}`} variant="primary" type="submit" >
        Let's Market together !
      </Button>

      {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}

    </Form>

        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={
            market
          }
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;