import React, { Component } from 'react'
import { connect } from 'react-redux'

type Props = {
}

type State = {
}

export class App extends Component<Props, State> {
    render() {
        return (
            <div>
                Test!
            </div>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
