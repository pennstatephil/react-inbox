export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'
export function fetchMessages() {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8082/api/messages`)
    const json = await response.json()
    dispatch({
      type: MESSAGES_RECEIVED,
      messages: json._embedded.messages
    })
  }
}

export const ON_SEND = 'ON_SEND'
export function onSend(message) {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:8082/api/messages`, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const responseJson = await response.json()
    dispatch({
      type: ON_SEND,
      newMessage: responseJson,
    })
  }
}

export const TOGGLE_COMPOSE = 'TOGGLE_COMPOSE'
export function toggleCompose() {
    return async (dispatch) => { dispatch({
      type: TOGGLE_COMPOSE,
    })}
}

export const TOGGLE_SELECTED = 'TOGGLE_SELECTED'
export function toggleSelected(messageId) {
    return async (dispatch) => { dispatch({
        type: TOGGLE_SELECTED,
        messageId
    })}
}

export const TOGGLE_STARRED = 'TOGGLE_STARRED'
export function toggleStarred(messageId) {
    return async (dispatch) => { dispatch({
        type: TOGGLE_STARRED,
        messageId
    })}
}

export const TOGGLE_SELECT_ALL_MESSAGES = 'TOGGLE_SELECT_ALL_MESSAGES'
export function toggleSelectAllMessages(selected) {
    return async (dispatch) => { dispatch({
        type: TOGGLE_SELECT_ALL_MESSAGES,
        selected
    })}
}

export const TOGGLE_MARK_SELECTED_MESSAGES_READ = 'TOGGLE_MARK_SELECTED_MESSAGES_READ'
export function toggleMarkSelectedMessagesRead(read) {
    return async (dispatch) => { dispatch({
        type: TOGGLE_MARK_SELECTED_MESSAGES_READ,
        read
    })}
}

export const DELETE_SELECTED_MESSAGES = 'DELETE_SELECTED_MESSAGES'
export function deleteSelectedMessages() {
    return async (dispatch) => { dispatch({
        type: DELETE_SELECTED_MESSAGES,
    })}
}

export const LABEL_SELECTED_MESSAGES = 'LABEL_SELECTED_MESSAGES'
export function labelSelectedMessages(label) {
    return async (dispatch) => { dispatch({
        type: LABEL_SELECTED_MESSAGES,
        label
    })}
}

export const UNLABEL_SELECTED_MESSAGES = 'UNLABEL_SELECTED_MESSAGES'
export function unLabelSelectedMessages(label) {
    return async (dispatch) => { dispatch({
        type: UNLABEL_SELECTED_MESSAGES,
        label
    })}
}