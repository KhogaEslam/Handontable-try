import React from 'react'
import { HotTable } from '@handsontable/react'
import Handsontable from 'handsontable'
import ReactDOM from 'react-dom'
// import Benchmark from 'benchmark-react'
import 'handsontable/dist/handsontable.full.css'
import data, { createHeaders, createCustomRenderer } from '../utils/data'
// import data from '../utils/data.json'
import findLocalIp from '../utils/extractIP'
import Container from './HighCharts/Container'
import otherServerIP from '../config/otherServerIP'

let sizeOfData = 1000

const histoData = [...Array(3)].map(Math.random)
const histo = <Container data={histoData} />

const containerDiv = document.createElement('div')

ReactDOM.render(histo, containerDiv)

function customRenderer1(instance, td, row, col, prop, value, cellProperties) {
  const img = document.createElement('IMG')
  // img.src = `https://via.placeholder.com/500x500.png?text=${value}`
  img.src = 'Example-Image.gif'

  Handsontable.dom.addEvent(img, 'mousedown', function(e) {
    e.preventDefault() // prevent selection quirk
  })
  Handsontable.dom.empty(td)
  td.appendChild(img)
  td.style.backgroundColor = 'yellow'
}

function customRenderer(instance, td, row, col, prop, value, cellProperties) {
  Handsontable.renderers.HtmlRenderer.apply(this, arguments)

  td.innerHTML = containerDiv.innerHTML

  return td
}

class HandsonTable extends React.Component {
  constructor(props) {
    super(props)
    this.nestedHeaders = createHeaders(sizeOfData)
    this.columns = createCustomRenderer(
      customRenderer,
      customRenderer1,
      sizeOfData
    )

    this.state = {
      hotSettings: {
        data: null,
        colHeaders: true,
        rowHeaders: true,
        width: '100%',
        height: '900',
        colWidths: '200',
        colHeight: '200',
        licenseKey: 'non-commercial-and-evaluation',
        search: true,
        nestedHeaders: this.nestedHeaders,
        columns: this.columns,
        manualColumnMove: true,
        manualRowMove: true
      }
    }

    this.searchPlugin = null
    this.hotId = 'hotId'
    this.searchId = 'searchId'
    this.hotTableComponent = React.createRef()
    this.searchComponent = React.createRef()
  }

  componentDidMount() {
    findLocalIp()
      .then(ips => ips[0], _ => null)
      .then(ip => {
        const dataFetchingIP = otherServerIP || ip || 'localhost'

        fetch(`http://${dataFetchingIP}:3030/`)
          .then(response => response.json())
          .then(response => {
            sizeOfData = 10000
            this.setState(prev => ({
              hotSettings: {
                ...prev.hotSettings,
                data: response
              }
            }))
          })
          .catch(e => {
            sizeOfData = 1000
            this.setState({
              hotSettings: {
                ...this.state.hotSettings,
                data: data(sizeOfData)
              }
            })
          })
      })
  }

  componentDidUpdate = () => {
    this.hotTableComponent.current.hotInstance.addHook(
      'beforeRowMove',
      this.beforeRowMoveCallback
    )
    this.hotTableComponent.current.hotInstance.addHook(
      'afterRowMove',
      this.afterRowMoveCallback
    )
    this.hotTableComponent.current.hotInstance.addHook(
      'beforeColumnMove',
      this.beforeColumnMoveCallback
    )
    this.hotTableComponent.current.hotInstance.addHook(
      'afterColumnMove',
      this.afterColumnMoveCallback
    )
  }

  mergeData = (selected, target, type) => {
    let numberOfColumns
    let hotSettings
    let targetAfterSelectedCheck

    if (type === 'rows') {
      const numberOfMergedRows = selected.length
      const originalData = this.state.hotSettings.data
      const deletedRows = originalData.splice(selected[0], numberOfMergedRows)

      let append = true
      targetAfterSelectedCheck = target

      if (selected[0] < target) {
        append = false
        targetAfterSelectedCheck -= numberOfMergedRows
      }

      numberOfColumns = originalData[targetAfterSelectedCheck].length

      for (let i = 0; i < numberOfColumns; i++) {
        let content = ' '

        let iterator = 0
        while (iterator < numberOfMergedRows) {
          content = `${content}${deletedRows[iterator][i]} `

          iterator += 1
        }

        originalData[targetAfterSelectedCheck][i] = append
          ? originalData[targetAfterSelectedCheck][i] + content
          : content + originalData[targetAfterSelectedCheck][i]
      }

      hotSettings = {
        ...this.state.hotSettings,
        data: originalData
      }

      this.hotTableComponent.current.hotInstance.selectRows(
        targetAfterSelectedCheck
      )
    } else if (type === 'columns') {
    }

    this.hotTableComponent.current.hotInstance.updateSettings(hotSettings)

    sizeOfData = numberOfColumns
  }

  beforeRowMoveCallback = (rows, target) => {
    console.log('beforeRowMoveCallback', { rows })
    console.log('beforeRowMoveCallback', { target })
    this.mergeData(rows, target, 'rows')
    return false
  }
  afterRowMoveCallback = (rows, target) => {
    console.log('afterRowMoveCallback', { rows })
    console.log('afterRowMoveCallback', { target })
  }

  beforeColumnMoveCallback = (rows, target) => {
    console.log('beforeColumnMoveCallback', { rows })
    console.log('beforeColumnMoveCallback', { target })
    // this.mergeData(rows, target, 'columns')
    // return false
  }
  afterColumnMoveCallback = (rows, target) => {
    console.log('afterColumnMoveCallback', { rows })
    console.log('afterColumnMoveCallback', { target })
  }

  handleChange = (setting, states) => {
    return event => {
      this.setState({
        hotSettings: {
          ...this.state.hotSettings,
          [setting]: states[event.target.checked ? 1 : 0]
        }
      })
    }
  }

  search = e => {
    this.searchPlugin =
      this.searchPlugin ||
      this.hotTableComponent.current.hotInstance.getPlugin('search')

    // const queryResult = this.searchPlugin.query(e.target.value)

    this.hotTableComponent.current.hotInstance.render()
  }

  render() {
    return (
      this.state.hotSettings.data && (
        <>
          {/* <div className="controllers">
            <label>
              <input
                id={this.searchId}
                ref={this.searchComponent}
                onChange={this.search}
                type="input"
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
                checked={this.state.hotSettings.rowHeaders}
                onChange={this.handleChange('rowHeaders', [true, false])}
                type="checkbox"
              />
              Enable row headers
            </label>
            <br />
            <label>
              <input
                checked={this.state.hotSettings.colHeaders}
                onChange={this.handleChange('colHeaders', [true, false])}
                type="checkbox"
              />
              Enable column headers
            </label>
            <br />
          </div>
      */}{' '}
          <br />
          <HotTable
            id={this.hotId}
            ref={this.hotTableComponent}
            settings={this.state.hotSettings}
          />
          <br />
        </>
      )
    )
  }
}

export default HandsonTable
