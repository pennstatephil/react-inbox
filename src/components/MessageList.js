import React from 'react'
import Message from './Message'

const MessageList = ({messages, selectToggle, starToggle}) => (
    messages.map(msg => <Message id = {msg.id}
        subject = {msg.subject} 
        isStarred = {msg.isStarred} 
        isRead = {msg.isRead} 
        labels={msg.labels}
        isSelected = {msg.isSelected}
        selectToggle = {selectToggle}
        starToggle = {starToggle}/>
    )
)

export default MessageList