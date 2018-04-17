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
      let updated = state.map(item => { if(item.selected) {
            if(item.read !== action.read) {
              return {
                ...item,
                read: action.read
              }
            } else { return item } 
          } else { return item }
      })

      return updated
    }

    case DELETE_SELECTED_MESSAGES: {
      return state.filter(item => !item.selected)
    }

    case LABEL_SELECTED_MESSAGES: {
      let updatedMessages = state.map(item => { 
        if(item.selected) {
          if(!item.labels.includes(action.label)) {
            return {
              ...item,
              labels: [...item.labels,
                action.label
              ]
            }
          } else { return item }
        } else { return item }
      })

      return updatedMessages
    }

    case UNLABEL_SELECTED_MESSAGES: {
      let updatedMessages = state.map(item => { 
        if(item.selected) {
          if(item.labels.includes(action.label)) {
            return {
              ...item,
              labels: item.labels.filter(l => l !== action.label)
            }
          } else { return item }
        } else { return item }
      })

      return updatedMessages
    }

    default:
      return state
  }
}

let findMessageIndexById = (messages, id) =>
      messages.indexOf(messages.find(message => message.id === id))


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