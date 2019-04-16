import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: props.data }
    setInterval(
      () => this.setState({ data: [...Array(3)].map(Math.random) }),
      1500
    )
  }

  render() {
    const cb = function() {}
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          series: [{ data: this.state.data }],
          chart: { events: { load: cb } }
        }}
        constructorType={'chart'}
      />
    )
  }
}

export default Container
