import React from 'react';
import './App.css';
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'

class App extends React.Component {
  constructor(props){
    super(props)

    const messages = [
      {'id': 1, 'subject': 'Test msg 1', 'isSelected': true, 'isRead': true, 'isStarred': false, 'labels':[]},
      {'id': 2, 'subject': 'Test msg 2', 'isSelected': true, 'isRead': false, 'isStarred': true, 'labels':[]},
      {'id': 3, 'subject': 'Test msg 3', 'isSelected': false, 'isRead': true, 'isStarred': true, 'labels':[]}
    ]

    this.state = {messages: messages}
  }

  render() {
    const labelValues = ["dev", "personal", "gSchool"]
    return (
      <div className="App">
        <Toolbar unreadCount = {this.calculateUnreadCount()} labelValues = {labelValues} 
        anySelected = {this.getAnySelected()} allSelected = {this.getAllSelected()}
        toggleSelectAllMessages = {this.toggleSelectAllMessages}
        toggleMarkSelectedMessagesRead = {this.toggleMarkSelectedMessagesRead}
        deleteSelectedMessages = {this.deleteSelectedMessages}
        labelSelectedMessages = {this.labelSelectedMessages}
        unLabelSelectedMessages = {this.unLabelSelectedMessages}/>
        <MessageList messages = {this.state.messages} selectToggle = {this.toggleSelectMessage}
        starToggle = {this.toggleStarMessage}/>
      </div>
    );
  }

  calculateUnreadCount() {
    var count = 0;
    for(let i=0; i<this.state.messages.length; i++)
      if (!this.state.messages[i].isRead)
        count++;
    return count;
  }

  getAnySelected() {
    return this.state.messages.filter(msg => msg.isSelected).length > 0
  }

  getAllSelected() {
    return this.state.messages.filter(msg => !msg.isSelected).length === 0
  }
    
  toggleSelectMessage = (messageId) => {
      let index = this.findMessageIndexById(messageId)
      let updated = { 
          ...this.state.messages[index],
          isSelected: !this.state.messages[index].isSelected
      }
      this.setState((prevState) =>({
          messages: [...prevState.messages.slice(0, index),
          updated,
          ...prevState.messages.slice(index + 1)]
      }))
  }

  toggleStarMessage = (messageId) => {
      let index = this.findMessageIndexById(messageId)
      let updated = { 
          ...this.state.messages[index],
          isStarred: !this.state.messages[index].isStarred
      }
      this.setState((prevState) =>({
          messages: [...prevState.messages.slice(0, index),
          updated,
          ...prevState.messages.slice(index + 1)]
      }))
  }

  toggleSelectAllMessages = (selected) => {
      this.setState((prevState) =>({
          messages: prevState.messages.map(item => {return {
            ...item,
            isSelected: selected
          }})
      }))
  }

  toggleMarkSelectedMessagesRead = (read)  => {
      this.setState((prevState) =>({
          messages: prevState.messages.map(item => { if(item.isSelected) {
            return item.isRead === read ? 
            item : {
            ...item,
            isRead: read
          }} else 
            return item
      })}))
  }

  deleteSelectedMessages = (messageId) => {
      this.setState((prevState) =>({
          messages: prevState.messages.filter(item => !item.isSelected)
      }))
  }

  labelSelectedMessages = (label) => {
      this.setState((prevState) =>({
          messages: prevState.messages.map(item => { if(item.isSelected) {
            return item.labels.includes(label) ? 
            item : {
            ...item,
            labels: [...item.labels,
              label
            ]
          }} else 
            return item
      })}))
  }

  unLabelSelectedMessages = (label) => {
      this.setState((prevState) =>({
          messages: prevState.messages.map(item => { if(item.isSelected) {
            return !item.labels.includes(label) ? 
            item : {
            ...item,
            labels: item.labels.filter(l => l !== label)
          }} else 
            return item
      })}))
  }

  findMessageIndexById = (id) =>
      this.state.messages.indexOf(this.state.messages.find(message => message.id === id))

}

export default App;
