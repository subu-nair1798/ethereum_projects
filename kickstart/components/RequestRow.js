import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import { Router } from "../routes"; 

class RequestRow extends Component {
    state = {
        loadingFlag1: false,
        loadingFlag2: false,
    }
    onApprove = async () => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();

        this.setState({ loadingFlag1: true });

        try{
            await campaign.methods.approveRequest(this.props.id).send({
                from: accounts[0]
            })
        } catch(err) {
            this.setState({ loadingFlag1: false});
        }
    
        this.setState({ loadingFlag1: false});
        Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    }
    
    onFinalize = async () => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();

        this.setState({ loadingFlag2: true });

        try {
            await campaign.methods.finalizeRequest(this.props.id).send({
                from: accounts[0]
            })
        } catch(err) {
            this.setState({ loadingFlag2: false});
        }

        this.setState({ loadingFlag2: false});
        Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
    }

    render() {
        const { Row, Cell } = Table;
        const { id, request, approversCount } = this.props;
        const readyToFinalize = request.approvalCount > (approversCount / 2);

        return(
            <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>                
                <Cell>{request.recipient}</Cell>                
                <Cell>{request.approvalCount}/{approversCount}</Cell>
                <Cell>
                    {request.complete ? null : (
                        <Button basic color="green" onClick={this.onApprove} loading={this.state.loadingFlag1}>Approve</Button>
                    )}
                </Cell>                
                <Cell>
                    {request.complete ? null : (
                        <Button basic color="red" onClick={this.onFinalize} loading={this.state.loadingFlag2}>Finalize</Button>
                    )}
                </Cell>                
            </Row>
        )
    }
}

export default RequestRow;