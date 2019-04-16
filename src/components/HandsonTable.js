import React from 'react'
import { HotTable } from '@handsontable/react'
// import Handsontable from 'handsontable'
// import Benchmark from 'benchmark-react'
import 'handsontable/dist/handsontable.full.css'
import data from '../utils/data'
// import data from '../utils/data.json'

class HandsonTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      settings: {
        data: null,
        colHeaders: false,
        rowHeaders: false,
        width: '100%',
        height: '500',
        colWidths: '100',
        colHeight: '23',
        licenseKey: 'non-commercial-and-evaluation',
        search: false
      }
    }

    this.hotTableComponent = React.createRef()
    this.searchComponent = React.createRef()
  }

  componentDidMount() {
    fetch('http://172.16.17.172:3030/')
      .then(response => response.json())
      .then(response => {
        this.setState(prev => ({
          settings: {
            ...prev.settings,
            data: response
          }
        }))
      })
      .catch(e => {
        this.setState({
          settings: {
            ...this.state.settings,
            data: data
          }
        })
      })

    // this.hotTableComponent.hotInstance.addEvent(
    //   this.searchComponent,
    //   'keyup',
    //   function(event) {
    //     var search = this.hotTableComponent.getPlugin('search')
    //     var queryResult = search.query(this.value)

    //     console.log(queryResult)
    //     this.hotTableComponent.render()
    //   }
    // )
  }

  handleChange = (setting, states) => {
    return event => {
      this.setState({
        settings: {
          ...this.state.settings,
          [setting]: states[event.target.checked ? 1 : 0]
        }
      })
    }
  }

  // search = e => {
  //   console.log(e.target.value)
  // }

  render() {
    console.log({ logger: this.state })
    return (
      this.state.settings.data && (
        <>
          <div className="controllers">
            <label>
              <input
                ref={this.searchComponent}
                onChange={this.handleChange('search', [false, true])}
                type="checkbox"
              />
              Search
            </label>
            <br />
            <label>
              <input
                onChange={this.handleChange('fixedRowsTop', [0, 2])}
                type="checkbox"
              />
              Add fixed rows
            </label>
            <br />
            <label>
              <input
                onChange={this.handleChange('fixedColumnsLeft', [0, 2])}
                type="checkbox"
              />
              Add fixed columns
            </label>
            <br />
            <label>
              <input
                onChange={this.handleChange('rowHeaders', [false, true])}
                type="checkbox"
              />
              Enable row headers
            </label>
            <br />
            <label>
              <input
                onChange={this.handleChange('colHeaders', [false, true])}
                type="checkbox"
              />
              Enable column headers
            </label>
            <br />
          </div>
          <br />
          <HotTable settings={this.state.settings} />
          <br />
        </>
      )
    )
  }
}

export default HandsonTable
