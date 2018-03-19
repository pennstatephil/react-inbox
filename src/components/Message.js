import React from 'react'

const Message = ({id, subject, read, starred, labels, selected, selectToggle, starToggle}) => (
  <div class={`row message ${read ? 'read' : 'unread'} ${selected ? 'selected' : ''}`}>
  <div class="col-xs-1">
    <div class="row">
      <div class="col-xs-2">
        <input type="checkbox" checked = {selected} onClick = {() => selectToggle(id)}/>
      </div>
      <div class="col-xs-2" onClick = {() => starToggle(id)}>
        <i class={`star fa fa-star${!starred ? '-o' : ''}`}></i>
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