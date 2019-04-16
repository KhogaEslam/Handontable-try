import Handsontable from 'handsontable'

const defaultSize = 1000
export default (rows = defaultSize, columns = defaultSize) =>
  Handsontable.helper.createSpreadsheetData(rows, columns)

export const createHeaders = (size = defaultSize) => {
  const nestedHeaders = [
    [
      'A',
      'A',
      'A',
      { label: 'B', colspan: 8 },
      { label: 'B', colspan: 8 },
      { label: 'B', colspan: 8 },
      'C',
      'C',
      'C',
      'C'
    ],
    [
      'A',
      'A',
      'A',
      { label: 'B', colspan: 8 },
      { label: 'B', colspan: 8 },
      { label: 'B', colspan: 8 },
      'C',
      'C',
      'C',
      'C'
    ],
    [
      'A',
      'A',
      'A',
      { label: 'B', colspan: 8 },
      { label: 'B', colspan: 8 },
      { label: 'B', colspan: 8 },
      'C',
      'C',
      'C',
      'C'
    ],
    [
      'A',
      'A',
      'A',
      { label: 'B', colspan: 8 },
      { label: 'B', colspan: 8 },
      { label: 'B', colspan: 8 },
      'C',
      'C',
      'C',
      'C'
    ],
    [
      'D',
      'D',
      'D',
      { label: 'E', colspan: 4 },
      { label: 'E', colspan: 4 },
      { label: 'E', colspan: 4 },
      { label: 'F', colspan: 4 },
      'G',
      'G',
      'G'
    ],
    [
      'D',
      'D',
      'D',
      { label: 'E', colspan: 4 },
      { label: 'E', colspan: 4 },
      { label: 'E', colspan: 4 },
      { label: 'F', colspan: 4 },
      'G',
      'G',
      'G'
    ],
    [
      'D',
      'D',
      'D',
      { label: 'E', colspan: 4 },
      { label: 'E', colspan: 4 },
      { label: 'E', colspan: 4 },
      { label: 'F', colspan: 4 },
      'G',
      'G',
      'G'
    ],
    [
      'D',
      'D',
      'D',
      { label: 'E', colspan: 4 },
      { label: 'E', colspan: 4 },
      { label: 'E', colspan: 4 },
      { label: 'F', colspan: 4 },
      'G',
      'G',
      'G'
    ],
    [
      'H',
      'H',
      { label: 'I', colspan: 2 },
      { label: 'I', colspan: 2 },
      { label: 'J', colspan: 2 },
      { label: 'K', colspan: 2 },
      { label: 'L', colspan: 2 },
      { label: 'L', colspan: 2 },
      'M',
      'M'
    ],
    [
      'H',
      'H',
      { label: 'I', colspan: 2 },
      { label: 'I', colspan: 2 },
      { label: 'J', colspan: 2 },
      { label: 'K', colspan: 2 },
      { label: 'L', colspan: 2 },
      { label: 'L', colspan: 2 },
      'M',
      'M'
    ],
    []
  ]

  for (let i = 0; i < size; i++) {
    const rand1 = Math.floor(Math.random() * 10)
    const rand2 = Math.floor(Math.random() * 10)

    nestedHeaders[10].push(nestedHeaders[rand1][rand2])
  }

  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < size - 10; i++) {
      const rand1 = Math.floor(Math.random() * 10)
      const rand2 = Math.floor(Math.random() * 10)

      nestedHeaders[j].push(nestedHeaders[rand2][rand1])
    }
  }

  return nestedHeaders
}

export const createCustomRenderer = (
  customRendererFunc,
  customRenderer1,
  size = defaultSize
) => {
  const rendererFuncs = []

  rendererFuncs.push(
    {
      renderer: customRendererFunc
    },
    {
      renderer: customRendererFunc
    },
    {
      renderer: customRendererFunc
    }
  )
  for (let i = 0; i < size - 3; i++) {
    rendererFuncs.push({
      renderer: customRenderer1
    })
  }

  return rendererFuncs
}
