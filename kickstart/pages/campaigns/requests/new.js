import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Router, Link } from '../../../routes';
import Layout from "../../../components/Layout"

class RequestNew extends Component {
    state = {
        value: "",
        description: "",
        recipient: "",
        errorMessage: "",
        loadingFlag: false
    }

    static async getInitialProps(props) {
        const { address } = props.query;
        return { address };
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loadingFlag: true, errorMessage: "" });

        const campaign = Campaign(this.props.address);
        const { description, value, recipient } = this.state;

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods
                .createRequest(
                    description,
                    web3.utils.toWei(value, "ether"),
                    recipient
                ).send({ from: accounts[0] })

            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        } catch(err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loadingFlag: false });
    }

    render() {
        return(
            <Layout>
                <div style={{ paddingBottom: "5px" }}><h3>Create a Request</h3></div>
               
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input 
                            value={this.state.description}
                            onChange={event => this.setState({ description: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input 
                            value={this.state.value}
                            onChange={event => this.setState({ value: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient</label>
                        <Input 
                            value={this.state.recipient}
                            onChange={event => this.setState({ recipient: event.target.value })}
                        />
                    </Form.Field>

                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button loading={this.state.loadingFlag} primary>Create</Button>
                    <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>
                        <Button content="Back" secondary />
                    </a>
                </Link>
                </Form>
            </Layout>
        )
    }
}

export default RequestNew;