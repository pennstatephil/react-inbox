import React from 'react'

const Toolbar = ({unreadCount, labelValues, anySelected, allSelected, toggleSelectAllMessages, toggleMarkSelectedMessagesRead, deleteSelectedMessages, labelSelectedMessages, unLabelSelectedMessages, showHideComposeForm}) => (
<div class="row toolbar">
  <div class="col-md-12">
    <p class="pull-right">
      <span class="badge badge">{unreadCount}</span>
      {`unread message${unreadCount !== 1 ? "s" : ""}`}
    </p>

    <a class="btn btn-danger" onClick = {() => showHideComposeForm()}>
      <i class="fa fa-plus"></i>
    </a>

    <button class="btn btn-default" onClick = {() => toggleSelectAllMessages(allSelected ? false : true)}>
      <i class={`fa ${allSelected ? "fa-check-square-o" : anySelected ? "fa-minus-square-o" : "fa-square-o"}`}></i>
    </button>

    <button class="btn btn-default" disabled = {!anySelected} onClick = {() => toggleMarkSelectedMessagesRead(true)}>
      Mark As Read
    </button>

    <button class="btn btn-default" disabled = {!anySelected} onClick = {() => toggleMarkSelectedMessagesRead(false)}>
      Mark As Unread
    </button>

    <select class="form-control label-select" disabled = {!anySelected} onChange = {(e) => labelSelectedMessages(e.target.value)}>
      <option value = ''>Apply label</option>
      {labelValues.map(it => <option value={`${it}`}>{it}</option>)}
      </select>

    <select class="form-control label-select" disabled = {!anySelected}  onChange = {(e) => unLabelSelectedMessages(e.target.value)}>
      <option value = ''>Remove label</option>
      {labelValues.map(it => <option value={`${it}`}>{it}</option>)}
    </select>

    <button class="btn btn-default" disabled = {!anySelected} onClick = {() => deleteSelectedMessages()}>
      <i class="fa fa-trash-o"></i>
    </button>
  </div>
</div>
)

export default Toolbar