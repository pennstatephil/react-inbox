import React from 'react';
import { connect } from 'react-redux'

import './App.css';
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import ComposeForm from './components/ComposeForm'

const labelValues = ["dev", "personal", "gSchool"]

const App = ({ messages, composing }) => (
      <div className="App">
        <Toolbar messages = {messages}
        labelValues = {labelValues} 
        />
        {composing ? <ComposeForm /> : ""}
        <MessageList messages = {messages} />
      </div>
  )

const mapStateToProps = state => ({
  messages: state.messages,
  composing: state.appState.composing
})

const mapDispatchToProps = () => ({})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
