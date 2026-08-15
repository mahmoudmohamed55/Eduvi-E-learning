interface GridListProps<T> {
  records: T[];
  render: (record: T) => React.ReactNode;
}
type HasId = {
  id: string;
};
export const GridList = <T extends HasId>({
  records,
  render,
}: GridListProps<T>) => {
  if (records.length === 0) return null;
  return (
    <>
      {records.map((record) => (
        <div key={record.id}>{render(record)}</div>
      ))}
    </>
  );
};
