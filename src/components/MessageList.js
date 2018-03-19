import React from 'react'
import Message from './Message'

const MessageList = ({messages, selectToggle, starToggle}) => (
    messages.map(msg => <Message id = {msg.id}
        subject = {msg.subject}
        starred = {msg.starred}
        read = {msg.read}
        labels={msg.labels}
        selected = {msg.selected}
        selectToggle = {selectToggle}
        starToggle = {starToggle}/>
    )
)

export default MessageList