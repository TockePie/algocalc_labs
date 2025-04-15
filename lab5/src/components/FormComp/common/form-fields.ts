const aData = [
  [8.7, -3.1, 1.8, 2.2],
  [2.1, 6.7, -2.2, 0],
  [3.2, -1.8, -9.5, -1.9],
  [1.2, 2.8, -1.4, -9.9]
]

const bData = [-9.7, 13.1, 6.9, 25.1]

const aFormFields = aData.flatMap((row, rowIndex) =>
  row.map((value, colIndex) => ({
    name: `a${rowIndex + 1}${colIndex + 1}`,
    defaultValue: value
  }))
)

const bFormFields = bData.map((value, index) => ({
  name: `b${index + 1}`,
  defaultValue: value
}))

export { aFormFields, bFormFields, aData, bData }
