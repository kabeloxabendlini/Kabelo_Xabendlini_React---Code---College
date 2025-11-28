import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

class JumboTronComponent extends Component {
    render() {
        return (
            // Main card wrapper for spacing and light background
            <Card className="p-4 bg-light mb-4">
                
                {/* Custom jumbotron-like section */}
                <div className="p-5 mb-4 bg-light rounded-3">
                    
                    {/* Bootstrap container for proper padding and layout */}
                    <div className="container-fluid py-5">
                        
                        {/* Title section */}
                        <h1 className="display-5 fw-bold">React and Bootstrap</h1>

                        {/* Subtitle / description text */}
                        <p className="col-md-8 fs-4">
                            This is the products page from Chapter 5.
                        </p>

                        {/* Call-to-action button */}
                        <div>
                            <Button variant="primary" size="lg">
                                Learn more
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default JumboTronComponent;
