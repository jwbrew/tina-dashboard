import React, { PropTypes } from 'react';
import {
  ScrollView,
  View
} from 'react-native';
import Text from '../Text';
import StatPanel from '../StatPanel';

const h1 = {
  fontSize: 40,
  textAlign: 'center'
}

const section = {
  paddingTop: 30,
  paddingBottom: 30
}

const Stats = ({ month, all }) => {
  return (
    <ScrollView>
      <View style={section}>
        <Text style={h1}>This Month</Text>
        <StatPanel title='Conversations' stat={month.count} />
        <StatPanel title='Duration' stat={new Date(month.duration).toTimeString().substr(0, 8)} />
        <StatPanel title='Earned' stat={'$' + (month.price/100).toFixed(2)} />
      </View>
      <View style={section}>
        <Text style={h1}>All Time</Text>
        <StatPanel title='Conversations' stat={all.count} />
        <StatPanel title='Duration' stat={new Date(all.duration).toTimeString().substr(0, 8)} />
        <StatPanel title='Earned' stat={'$' + (all.price/100).toFixed(2)} />
      </View>
    </ScrollView>
  )
}

export default Stats;
