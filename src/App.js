import React from 'react';
import './App.css';
import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'
import ComposeForm from './components/ComposeForm'

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {messages: []}
  }

  async componentDidMount() {
        const msgResp = await fetch(`/api/messages`)
        const msgJson = await msgResp.json()

        this.setState({messages: msgJson._embedded.messages, composing: false})
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
        unLabelSelectedMessages = {this.unLabelSelectedMessages}
        showHideComposeForm = {this.showHideComposeForm}/>
        {this.state.composing ? <ComposeForm onSend = {this.onSend} /> : ""}
        <MessageList messages = {this.state.messages} selectToggle = {this.toggleSelectMessage}
        starToggle = {this.toggleStarMessage}/>
      </div>
    );
  }

  calculateUnreadCount() {
    var count = 0;
    for(let i=0; i<this.state.messages.length; i++)
      if (!this.state.messages[i].read)
        count++;
    return count;
  }

  getAnySelected() {
    return this.state.messages.filter(msg => msg.selected).length > 0
  }

  getAllSelected() {
    return this.state.messages.filter(msg => !msg.selected).length === 0
  }

  showHideComposeForm = () => {
    this.setState((prevState) => ({
      composing: !prevState.composing
    }))
  }

  onSend = async(message) => {
    const response = await fetch(`/api/messages/`, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    const responseJson = await response.json()

    this.setState((prevState) => ({
      messages: [
        ...prevState.messages,
        responseJson
      ],
      composing: false
    }))
  }
    
  toggleSelectMessage = (messageId) => {
      let index = this.findMessageIndexById(messageId)
      let updated = { 
          ...this.state.messages[index],
          selected: !this.state.messages[index].selected
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
          starred: !this.state.messages[index].starred
      }
      this.setState((prevState) =>({
          messages: [...prevState.messages.slice(0, index),
          updated,
          ...prevState.messages.slice(index + 1)]
      }))

      this.updateMessages([updated.id], "star", updated.starred)
  }

  toggleSelectAllMessages = (selected) => {
      this.setState((prevState) =>({
          messages: prevState.messages.map(item => {return {
            ...item,
            selected: selected
          }})
      }))
  }

  toggleMarkSelectedMessagesRead = (read)  => {
      let messageIds = []
      let updatedMessages = this.state.messages.map(item => { if(item.selected) {
            if(item.read !== read) {
              messageIds.push(item.id)
              return {
                ...item,
                read: read
              }
            } else { return item } 
          } else { return item }
      })
      this.setState((prevState) =>({
        messages: updatedMessages
      }))

      if(messageIds.length > 0)
        this.updateMessages(messageIds, "read", read)
  }

  deleteSelectedMessages = (messageId) => {
      let messageIds = this.state.messages.filter(item => item.selected).map(item => item.id)
      this.setState((prevState) =>({
          messages: prevState.messages.filter(item => !item.selected)
      }))

      if(messageIds.length > 0)
        this.updateMessages(messageIds, "delete")
  }

  labelSelectedMessages = (label) => {
      let messageIds = []
      let updatedMessages = this.state.messages.map(item => { 
        if(item.selected) {
          if(!item.labels.includes(label)) {
            messageIds.push(item.id)
            return {
              ...item,
              labels: [...item.labels,
                label
              ]
            }
          } else { return item }
        } else { return item }
      })
      this.setState((prevState) =>({ messages: updatedMessages }))

      if(messageIds.length > 0)
        this.updateMessages(messageIds, "addLabel", label)
  }

  unLabelSelectedMessages = (label) => {

    let messageIds = []
      let updatedMessages = this.state.messages.map(item => { 
        if(item.selected) {
          if(item.labels.includes(label)) {
            messageIds.push(item.id)
            return {
              ...item,
              labels: item.labels.filter(l => l !== label)
            }
          } else { return item }
        } else { return item }
      })

      this.setState((prevState) =>({ messages: updatedMessages }))

      if(messageIds.length > 0)
        this.updateMessages(messageIds, "removeLabel", label)
  }

  findMessageIndexById = (id) =>
      this.state.messages.indexOf(this.state.messages.find(message => message.id === id))

  updateMessages = async(messageIds, command, value) => {
      let reqBody = { 
        messageIds: messageIds, 
        command: command
      }

      if(command === 'star') {
        reqBody = {
          ...reqBody,
          star: value
        }
      } else if (command === 'read') {
        reqBody = {
          ...reqBody,
          read: value
        }
      } else if (command.includes('Label')) {
        reqBody = {
          ...reqBody,
          label: value
        }
      }

      const response = await fetch(`/api/messages/`, {
        method: 'PATCH',
        body: JSON.stringify(reqBody),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
  }

}

export default App;
