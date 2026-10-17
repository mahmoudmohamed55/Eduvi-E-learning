import type { ReactNode } from "react";

export interface DashboardTableColumn<T> {
  key: string;
  header: string;
  className?: string;
  render: (item: T) => ReactNode;
}

interface DashboardTableProps<T> {
  columns: DashboardTableColumn<T>[];
  data: T[];
  rowKey: (item: T) => string;
  minWidth?: string;
}

const DashboardTable = <T,>({
  columns,
  data,
  rowKey,
  minWidth = "900px",
}: DashboardTableProps<T>) => {
  return (
    <div className="custom-scroll overflow-x-auto">
      <table
        className="w-full border-collapse text-left"
        style={{ minWidth }}
      >
        <thead>
          <tr className="border-b border-surface-300 bg-neutral-50/70">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-5 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-500 ${column.className ?? ""}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-surface-300">
          {data.map((item) => (
            <tr
              key={rowKey(item)}
              className="group transition-colors hover:bg-primary-50/30"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-5 py-4 ${column.className ?? ""}`}
                >
                  {column.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;