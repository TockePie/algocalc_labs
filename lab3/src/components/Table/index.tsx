import { useChartContext } from '@/common/context/ChartContext'

export default function Table() {
  const { chartData } = useChartContext()

  if (!chartData) return null

  return (
    <div className="mt-8 overflow-x-auto px-5">
      <h3 className="mb-3 text-xl font-semibold">Таблиця результатів</h3>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {['x', 'Exp(cos(x))', 'Інтерполяція', 'Похибка'].map((title) => (
              <th className="border border-gray-300 p-2">{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chartData.xValue.map((x: number, index: number) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
              <td className="border border-gray-300 p-2">{x.toFixed(4)}</td>
              <td className="border border-gray-300 p-2">
                {chartData.y[index].toFixed(8)}
              </td>
              <td className="border border-gray-300 p-2">
                {chartData.yPoli[index].toFixed(8)}
              </td>
              <td className="border border-gray-300 p-2">
                {chartData.delta[index].toFixed(8)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
