import React from 'react';
import "./test.css";

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const Test = (props) => {
  return (
    <div>
      <Card>
        <CardImg top width="100%" src="http://localhost:5001/images/1571228202322-test9.jpg" alt="Card image cap" />
        <CardBody>
          <CardTitle>Hiadara</CardTitle>
          
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Test;
