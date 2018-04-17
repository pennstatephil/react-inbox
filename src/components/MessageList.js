import React from 'react'
import Message from './Message'
import { connect } from 'react-redux'

const MessageList = ({messages}) => (
    messages.map(msg => <Message id = {msg.id}
        subject = {msg.subject}
        starred = {msg.starred}
        read = {msg.read}
        labels={msg.labels}
        selected = {msg.selected}/>
    )
)

const mapStateToProps = state => ({
  messages: state.messages
})

export default connect(mapStateToProps, null)(MessageList)