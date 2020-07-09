import React, {Component} from 'react';
import {Button} from "react-bootstrap";

class CatalogItem extends Component {
    render() {
        const item = this.props;
        return (
            <div className="col-xl-3 col-lg-4 CatalogItem">
                <div className="card">
                    <div className="card-header">
                        "{item.name}"
                    </div>
                    <div className="card-body">
                        <h5><span>{item.price}$</span> for 150g</h5>
                        <ul>
                            <li> {item.type}</li>
                            <li> {item.material}</li>
                            <li> Count: <b>{item.count}</b></li>
                        </ul>
                        <Button variant={'success'} onClick={this.props.addItem}><i className="fas fa-plus"/></Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CatalogItem;