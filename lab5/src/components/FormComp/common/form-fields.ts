export const A_DATA = [
  [8.7, -3.1, 1.8, 2.2],
  [2.1, 6.7, -2.2, 0],
  [3.2, -1.8, -9.5, -1.9],
  [1.2, 2.8, -1.4, -9.9]
]

export const B_DATA = [-9.7, 13.1, 6.9, 25.1]

export const aFormFields = A_DATA.flatMap((row, rowIndex) =>
  row.map((value, colIndex) => ({
    name: `a${rowIndex + 1}${colIndex + 1}`,
    defaultValue: value
  }))
)

export const bFormFields = B_DATA.map((value, index) => ({
  name: `b${index + 1}`,
  defaultValue: value
}))
