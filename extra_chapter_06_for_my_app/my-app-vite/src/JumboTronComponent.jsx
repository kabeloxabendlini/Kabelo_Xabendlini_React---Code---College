import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

class JumboTronComponent extends Component {
    render() {
        return (
            <Card className="p-4 bg-light mb-4">
                <div className="p-5 mb-4 bg-light rounded-3">
                    <div className="container-fluid py-5">
                        <h1 className="display-5 fw-bold">React and Bootstrap</h1>
                        <p className="col-md-8 fs-4">This is the products page from Chapter 5.</p>
                        <div>
                        <Button variant="primary" size="lg">Learn more</Button>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default JumboTronComponent;

