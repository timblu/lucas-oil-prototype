import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Plus, Search } from "lucide-react";
import { Card } from "../../components/shared/Card";
import { PageHeader } from "../../components/shared/PageHeader";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { CASES } from "../../data/cases";
import { ROUTES } from "../../routes";

export default function CasesListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = CASES.filter((c) => {
    const q = search.toLowerCase();
    return (
      !q ||
      c.id.toLowerCase().includes(q) ||
      c.subject.toLowerCase().includes(q) ||
      c.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader
        title="Cases"
        action={
          <button
            onClick={() => navigate(ROUTES.newCase)}
            className="flex items-center gap-2 bg-primary hover:bg-[var(--primary-dark)] text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={15} /> New Case
          </button>
        }
      />

      <div className="relative mb-5 max-w-sm">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search cases…"
          className="w-full pl-9 pr-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring/40"
        />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Case #", "Subject", "Status", "Last Updated"].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground px-5 py-3.5"
                  >
                    {h}
                  </th>
                ))}
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => navigate(ROUTES.case(c.id))}
                  className="hover:bg-muted/30 cursor-pointer transition-colors group"
                >
                  <td className="px-5 py-4 mono text-sm font-medium text-[#111] group-hover:text-[#333]">
                    {c.id}
                  </td>
                  <td className="px-5 py-4 text-sm text-foreground max-w-xs truncate">
                    {c.subject}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-5 py-4 mono text-sm text-muted-foreground">
                    {c.lastUpdated}
                  </td>
                  <td className="px-4 py-4 text-muted-foreground">
                    <ChevronRight
                      size={15}
                      className="opacity-30 group-hover:opacity-80 transition-opacity"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No cases found.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
