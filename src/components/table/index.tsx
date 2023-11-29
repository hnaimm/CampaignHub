"use client";
import { useEffect, useState, useRef, HTMLProps, ReactElement } from "react";
import "./style.scss";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import RowActions from "./RowActions";
import TableActions from "./TableActions";
import TablePagination from "./TablePagination";

const columnHelper = createColumnHelper();

const SearchInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      id="search-input"
      type="search"
      value={value}
      placeholder="Search campaigns..."
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);
  // Store the itemRank info
  addMeta({ itemRank });
  // Return if the item should be filtered in/out
  return itemRank.passed;
};

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}

let selectColumn = columnHelper.accessor("select", {
  header: ({ table }: any) => (
    <IndeterminateCheckbox
      {...{
        checked: table.getIsAllRowsSelected(),
        indeterminate: table.getIsSomeRowsSelected(),
        onChange: table.getToggleAllRowsSelectedHandler(),
      }}
    />
  ),
  cell: ({ row }: any) => (
    <IndeterminateCheckbox
      {...{
        checked: row.getIsSelected(),
        disabled: !row.getCanSelect(),
        indeterminate: row.getIsSomeSelected(),
        onChange: row.getToggleSelectedHandler(),
        // key: `${row.original.name}_${row.original.account_id}`
      }}
    />
  ),
});

const Table = ({
  tableData,
  tableColumns,
  onItemClone,
  onItemsDelete,
  onItemAdd,
  AddRowForm,
}: {
  tableData: any[];
  tableColumns: any[];
  onItemClone: Function;
  onItemsDelete: Function;
  onItemAdd: Function;
  AddRowForm: (props: any) => JSX.Element;
}) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});

  const selectedRowsIndices = Object.keys(rowSelection);

  const emptyRowSelection = () => {
    table.resetRowSelection();
  };

  const actionsColumn = columnHelper.accessor("action", {
    header: "",
    cell: ({ row }: any) => (
      <RowActions
        rowItem={row.original}
        onClone={(props) => {
          emptyRowSelection();
          onItemClone(props);
        }}
        onDelete={(props) => {
          emptyRowSelection();
          onItemsDelete(props);
        }}
        shouldHide={selectedRowsIndices?.length != 0}
      />
    ),
  });

  const table = useReactTable({
    data: tableData,
    columns: [selectColumn, ...tableColumns, actionsColumn],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: { globalFilter, rowSelection },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),

    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    onRowSelectionChange: setRowSelection,
  });

  return (
    <div id="table-wrapper">
      <div id="table-header">
        <SearchInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
        />
        <TableActions
          selectedRows={tableData.filter((row, index) =>
            selectedRowsIndices.includes(`${index}`),
          )}
          onClone={(props) => {
            emptyRowSelection();
            onItemClone(props);
          }}
          onDelete={(props) => {
            emptyRowSelection();
            onItemsDelete(props);
          }}
          onAdd={(props) => {
            onItemAdd(props);
          }}
          AddRowForm={AddRowForm}
        />
      </div>

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <>
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <TablePagination table={table} />
    </div>
  );
};

export default Table;
