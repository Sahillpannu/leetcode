"use client";

import { Search } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";

/**
 * Empty state shown when no problems match the filters
 */
export function ProblemsEmpty({ hasProblems = true }: { hasProblems?: boolean }) {
  return (
    <TableRow>
      <TableCell
        colSpan={5}
        className="text-center py-8 text-muted-foreground"
      >
        <div className="flex flex-col items-center gap-2">
          <Search className="h-8 w-8 opacity-50" />
          <p>
            {hasProblems
              ? "No problems found matching your criteria."
              : "No problems yet. An admin can add them from Create Problem."}
          </p>
        </div>
      </TableCell>
    </TableRow>
  );
}
