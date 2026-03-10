import PortableTextRenderer from './PortableTextRenderer'

export default function ColumnsContent({ groups }) {
  if (!groups?.length) return null

  return (
    <div className="space-y-16 my-12">
      {groups.map((group, i) => {
        const cols = [group.column1, group.column2]
        if (group.columns === '3') cols.push(group.column3)

        return (
          <div
            key={i}
            className={
              group.columns === '3'
                ? 'grid grid-cols-1 gap-4 md:grid-cols-3'
                : 'grid grid-cols-1 gap-4 md:grid-cols-2'
            }
          >
            {cols.map((col, j) => (
              <div key={j}>
                <PortableTextRenderer value={col} compact />
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
