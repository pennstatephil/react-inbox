import { combineReducers } from 'redux'
import { MESSAGES_RECEIVED, ON_SEND, TOGGLE_COMPOSE, TOGGLE_SELECTED, TOGGLE_STARRED,
    TOGGLE_SELECT_ALL_MESSAGES, TOGGLE_MARK_SELECTED_MESSAGES_READ, DELETE_SELECTED_MESSAGES,
    LABEL_SELECTED_MESSAGES, UNLABEL_SELECTED_MESSAGES
} from '../actions'

function messages(state = [], action) {
  switch (action.type) {
    case MESSAGES_RECEIVED:
      return action.messages
    
    case ON_SEND:
      return [
            ...state,
            action.newMessage
        ]

    case TOGGLE_SELECTED: {
      let index = findMessageIndexById(state, action.messageId)
      let updated = { 
          ...state[index],
          selected: !state[index].selected
      }
      return [...state.slice(0, index),
          updated,
          ...state.slice(index + 1)
      ] }

    case TOGGLE_STARRED: {
      let index = findMessageIndexById(state, action.messageId)
      let updated = { 
          ...state[index],
          starred: !state[index].starred
      }
      
      updateMessages([updated.id], "star", updated.starred)

      return [...state.slice(0, index),
          updated,
          ...state.slice(index + 1)
      ] }

    case TOGGLE_SELECT_ALL_MESSAGES:
        return state.map(item => {return {
            ...item,
            selected: action.selected
          }})

    case TOGGLE_MARK_SELECTED_MESSAGES_READ: {
      let messageIds = []
      let updated = state.map(item => { if(item.selected) {
            if(item.read !== action.read) {
              messageIds.push(item.id)
              return {
                ...item,
                read: action.read
              }
            } else { return item } 
          } else { return item }
      })

      if(messageIds.length > 0)
        updateMessages(messageIds, "read", action.read)

      return updated
    }

    case DELETE_SELECTED_MESSAGES: {
      let messageIds = state.filter(item => item.selected).map(item => item.id)
      if(messageIds.length > 0)
        updateMessages(messageIds, "delete")

      return state.filter(item => !item.selected)
    }

    case LABEL_SELECTED_MESSAGES: {
      let messageIds = []
      let updatedMessages = state.map(item => { 
        if(item.selected) {
          if(!item.labels.includes(action.label)) {
            messageIds.push(item.id)
            return {
              ...item,
              labels: [...item.labels,
                action.label
              ]
            }
          } else { return item }
        } else { return item }
      })

      if(messageIds.length > 0)
        updateMessages(messageIds, "addLabel", action.label)

      return updatedMessages
    }

    case UNLABEL_SELECTED_MESSAGES: {
      let messageIds = []
      let updatedMessages = state.map(item => { 
        if(item.selected) {
          if(item.labels.includes(action.label)) {
            messageIds.push(item.id)
            return {
              ...item,
              labels: item.labels.filter(l => l !== action.label)
            }
          } else { return item }
        } else { return item }
      })

      if(messageIds.length > 0)
        updateMessages(messageIds, "removeLabel", action.label)

      return updatedMessages
    }

    default:
      return state
  }
}

let findMessageIndexById = (messages, id) =>
      messages.indexOf(messages.find(message => message.id === id))

let updateMessages = async(messageIds, command, value) => {
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

function appState(state = {composing: false}, action) {
    switch(action.type) {
        case ON_SEND:
        return {
            ...state,
            composing:false
        }

        case TOGGLE_COMPOSE:
        return {
            ...state,
            composing: !state.composing
        }

        default:
            return state
    }
}

export default combineReducers({
    messages,
    appState
})