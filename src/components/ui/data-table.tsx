import * as React from "react";
import { cn } from "@/lib/utils";
import "@/app/table-optimizations.css";

const DataTable = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={cn("data-grid", className)}
    {...props}
  />
));
DataTable.displayName = "DataTable";

const DataTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("data-grid-header", className)} {...props} />
));
DataTableHeader.displayName = "DataTableHeader";

const DataTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={className} {...props} />
));
DataTableBody.displayName = "DataTableBody";

const DataTableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn("data-record-row", className)}
    {...props}
  />
));
DataTableRow.displayName = "DataTableRow";

const DataTableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn("data-grid-header-cell", className)}
    {...props}
  />
));
DataTableHead.displayName = "DataTableHead";

const DataTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("data-cell", className)}
    {...props}
  />
));
DataTableCell.displayName = "DataTableCell";

interface DataTableContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const DataTableContainer = React.forwardRef<HTMLDivElement, DataTableContainerProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("layout-table-container", className)} {...props}>
      <div className="layout-table-scroll">
        {children}
      </div>
    </div>
  )
);
DataTableContainer.displayName = "DataTableContainer";

interface DataTableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const DataTableToolbar = React.forwardRef<HTMLDivElement, DataTableToolbarProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("data-table-toolbar", className)} {...props}>
      {children}
    </div>
  )
);
DataTableToolbar.displayName = "DataTableToolbar";

interface DataTablePaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const DataTablePagination = React.forwardRef<HTMLDivElement, DataTablePaginationProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("data-table-pagination", className)} {...props}>
      {children}
    </div>
  )
);
DataTablePagination.displayName = "DataTablePagination";

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: "new" | "active" | "qualified" | "paused" | "completed";
  children: React.ReactNode;
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, status, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("data-status-badge", `data-status-${status}`, className)}
      {...props}
    >
      {children}
    </span>
  )
);
StatusBadge.displayName = "StatusBadge";

export {
  DataTable,
  DataTableHeader,
  DataTableBody,
  DataTableRow,
  DataTableHead,
  DataTableCell,
  DataTableContainer,
  DataTableToolbar,
  DataTablePagination,
  StatusBadge,
};