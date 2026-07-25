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
  return (
    <>
      {records.map((record) => (
        <div key={record.id}>{render(record)}</div>
      ))}
    </>
  );
};
