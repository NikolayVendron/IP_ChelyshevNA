import React, {Component} from 'react';
import {Table} from "react-bootstrap";

class ModeratorPanel extends Component {
    render() {
        return (
            <div className={'ModeratorPanel'}>
                <div className="ModeratorPanel__header">
                    <p>Moderator panel</p>
                </div>
                <div className="ModeratorPanel__content">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Bushido</td>
                            <td>25</td>
                            <td>27 June, 2020</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default ModeratorPanel;