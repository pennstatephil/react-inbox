import React from 'react'

const Message = ({id, subject, isRead, isStarred, labels, isSelected, selectToggle, starToggle}) => (
  <div class={`row message ${isRead ? 'read' : 'unread'} ${isSelected ? 'selected' : ''}`}>
  <div class="col-xs-1">
    <div class="row">
      <div class="col-xs-2">
        <input type="checkbox" checked = {isSelected} onClick = {() => selectToggle(id)}/>
      </div>
      <div class="col-xs-2" onClick = {() => starToggle(id)}>
        <i class={`star fa fa-star${!isStarred ? '-o' : ''}`}></i>
      </div>
    </div>
  </div>
  <div class="col-xs-11">
    {labels.map(it => <span class="label label-warning">{it}</span>)}
    <a href="#">
      {subject}
    </a>
  </div>
</div>
)

export default Message