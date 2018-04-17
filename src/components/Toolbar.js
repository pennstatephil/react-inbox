import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleCompose, toggleSelectAllMessages, toggleMarkSelectedMessagesRead,
  deleteSelectedMessages, labelSelectedMessages, unLabelSelectedMessages } from '../actions'

const Toolbar = ({messages, labelValues, toggleSelectAllMessages, toggleMarkSelectedMessagesRead, deleteSelectedMessages, labelSelectedMessages, unLabelSelectedMessages, toggleCompose}) => (
<div class="row toolbar">
  <div class="col-md-12">
    <p class="pull-right">
      <span class="badge badge">{calculateUnreadCount(messages)}</span>
      {`unread message${calculateUnreadCount(messages) !== 1 ? "s" : ""}`}
    </p>

    <a class="btn btn-danger" onClick = {() => toggleCompose()}>
      <i class="fa fa-plus"></i>
    </a>

    <button class="btn btn-default" onClick = {() => toggleSelectAllMessages(getAllSelected(messages) ? false : true)}>
      <i class={`fa ${getAllSelected(messages) ? "fa-check-square-o" : getAnySelected(messages) ? "fa-minus-square-o" : "fa-square-o"}`}></i>
    </button>

    <button class="btn btn-default" disabled = {!getAnySelected(messages)} onClick = {() => toggleMarkSelectedMessagesRead(true)}>
      Mark As Read
    </button>

    <button class="btn btn-default" disabled = {!getAnySelected(messages)} onClick = {() => toggleMarkSelectedMessagesRead(false)}>
      Mark As Unread
    </button>

    <select class="form-control label-select" disabled = {!getAnySelected(messages)} onChange = {(e) => labelSelectedMessages(e.target.value)}>
      <option value = ''>Apply label</option>
      {labelValues.map(it => <option value={`${it}`}>{it}</option>)}
      </select>

    <select class="form-control label-select" disabled = {!getAnySelected(messages)}  onChange = {(e) => unLabelSelectedMessages(e.target.value)}>
      <option value = ''>Remove label</option>
      {labelValues.map(it => <option value={`${it}`}>{it}</option>)}
    </select>

    <button class="btn btn-default" disabled = {!getAnySelected(messages)} onClick = {() => deleteSelectedMessages()}>
      <i class="fa fa-trash-o"></i>
    </button>
  </div>
</div>
)

const mapStateToProps = state => ({
  messages: state.messages
})

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleCompose,
  toggleSelectAllMessages,
  toggleMarkSelectedMessagesRead,
  deleteSelectedMessages,
  labelSelectedMessages,
  unLabelSelectedMessages
}, dispatch)

function calculateUnreadCount(messages) {
  var count = 0;
  for(let i=0; i<messages.length; i++)
    if (!messages[i].read)
      count++;
  return count;
}

function getAnySelected(messages) {
  return messages.filter(msg => msg.selected).length > 0
}

function getAllSelected(messages) {
  return messages.filter(msg => !msg.selected).length === 0
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);