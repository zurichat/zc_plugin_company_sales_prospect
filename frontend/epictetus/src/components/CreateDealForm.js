import React, { Component } from 'react'

class CreateDealForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            company: '',
            amount: '',
            dealStage: '',

        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    namehandler = (Event) => {
        this.setstate({
            name: Event.target.value
        })
    }
    companyhandler = (Event) => {
        this.setstate({
            company: Event.target.value
        })
    }
    amounthandler = (Event) => {
        this.setstate({
            amount: Event.target.value
        })
    }
    dealhandler = (Event) => {
        this.setstate({
            deal: Event.target.value
        })
    }

    handleSubmit = (Event) => {
        alert('Created Successfully')
        console.log(this.state);
        this.setState({
            name: '',
            company: '',
            amount: '',
            dealStage: '',
        })
        Event.preventDefault()
    }


    render() {
        return ( <
            div >

            <
            form onSubmit = { this.handleSubmit } >
            <
            h2 > Create a Prospect < /h2> <
            p > Provide information about your prospects < /p>  <
            label > Name < /label> <input type='text'value={this.state.name} onChange={this.namehandler} / > < br / >
            <
            label > Company < /label> <input type='text'value={this.state.company} onChange={this.companyhandler} / > < br / >
            <
            label > Amount < /label> <input type='text'value={this.state.amount} onChange={this.amounthandler} / > < br / >
            <
            label > Deal Stage < /label> <select onChange={this.dealhandler} defaultValue='Select a stage'> <
            option defaultValue > Select a stage < /option> <
            option value = 'prospect' > Prospect < /option> <
            option value = 'proposal' > Proposal < /option> <
            option value = 'negotiation' > Negotiation < /option> <
            option value = 'closed' > Closed < /option>  </select > < br / >
            <
            input type = 'submit'
            value = 'Create' / > < /
            form > < /
            div >
        )
    }
}

export default CreateDealForm;