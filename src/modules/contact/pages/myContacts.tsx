import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getContacts } from '../../../redux/actions/contact/contactActions';

type Props = {
    contacts: any,
    getContacts: () => void
}

export class MyContacts extends Component<Props> {
    componentDidMount() {
        this.props.getContacts()
    }

    render() {
        return (
            <div>
                <h1>My Contacts</h1>
                <pre>{JSON.stringify(this.props.contacts, null, 2)}</pre>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    contacts: state.contact.contacts
})

const mapDispatchToProps = dispatch => ({
    getContacts: () => dispatch(getContacts())
});

export default connect(mapStateToProps, mapDispatchToProps)(MyContacts);
