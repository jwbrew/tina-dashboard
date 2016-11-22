import { connect } from 'react-redux'
import Component from './component'
import { getConversationsList } from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  var all = getConversationsList(state)
  var month = all.filter((e) => e.created_at > (new Date() - (30*24*60*60*1000)))

  return {
    month: {
      count: all.length,
      duration: all.filter((e) => e.started_at && e.ended_at).reduce((a, b) => a + b.ended_at - b.started_at, 0),
      price: all.filter((e) => e.price).reduce((a, b) => a + b.price, 0)
    },
    all: {
      count: month.length,
      duration: month.filter((e) => e.started_at && e.ended_at).reduce((a, b) => a + b.ended_at - b.started_at, 0),
      price: month.filter((e) => e.price).reduce((a, b) => a + b.price, 0)
    }
  }
}

export default connect(mapStateToProps, {})(Component)
