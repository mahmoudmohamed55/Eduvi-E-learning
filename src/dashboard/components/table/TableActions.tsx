import {
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

interface TableActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onMore?: () => void;
}

const TableActions = ({
  onEdit,
  onDelete,
  onMore,
}: TableActionsProps) => {
  return (
    <div className="flex items-center justify-end gap-1">
      {onEdit && (
        <button
          type="button"
          title="Edit"
          onClick={onEdit}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-primary-100 hover:text-primary-600"
        >
          <Pencil className="h-4 w-4" />
        </button>
      )}

      {onDelete && (
        <button
          type="button"
          title="Delete"
          onClick={onDelete}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-red-50 hover:text-error-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}

      {onMore && (
        <button
          type="button"
          title="More"
          onClick={onMore}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-ink-900"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default TableActions;