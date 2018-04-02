import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleSelected, toggleStarred } from '../actions'

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

const mapDispatchToProps = dispatch => bindActionCreators({
  selectToggle: toggleSelected,
  starToggle: toggleStarred
}, dispatch)

export default connect(
  null,
  mapDispatchToProps,
)(Message)