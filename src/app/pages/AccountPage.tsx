import { useEffect, useRef, type ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Receipt,
  Truck,
  User,
} from "lucide-react";
import { Card } from "../components/shared/Card";
import { StatusBadge } from "../components/shared/StatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  ACCOUNT_SNAPSHOT,
  CREDIT_MEMOS,
  CUSTOMER_CONTACTS,
  DISTRIBUTOR_ACCOUNT,
  type CreditMemo,
} from "../data/account";
import { fmt } from "../lib/format";
import { ROUTES } from "../routes";

// OPEN QUESTION: Financial fields (Credit Line, Available Credit, Current
// Balance, Credit Memos) may live in Sage 100 and not yet be mapped through
// Snowflake into Salesforce. Credit memos are transactional records (status,
// remaining balance, related invoice) — confirm shape with Mark/Amber before
// treating this list UI as final.

const SECTIONS = ["info", "contacts", "financial"] as const;
type Section = (typeof SECTIONS)[number];

const MEMO_FILTERS = ["all", "open", "applied"] as const;
type MemoFilter = (typeof MEMO_FILTERS)[number];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111]/30 focus-visible:ring-offset-2";

function isSection(value: string | null): value is Section {
  return SECTIONS.includes(value as Section);
}

function isMemoFilter(value: string | null): value is MemoFilter {
  return MEMO_FILTERS.includes(value as MemoFilter);
}

function telHref(phone: string) {
  const [base, ext] = phone.split(/\s*x/i);
  const digits = base.replace(/[^\d+]/g, "");
  return ext ? `tel:${digits};ext=${ext.trim()}` : `tel:${digits}`;
}

function initials(name: string) {
  return name
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function splitAddress(address: string) {
  const idx = address.lastIndexOf(",");
  if (idx === -1) return { street: address, locality: "" };
  return {
    street: address.slice(0, idx),
    locality: address.slice(idx + 1).trim(),
  };
}

function parseMemoDate(date: string) {
  const [month, day, year] = date.split("/").map(Number);
  if (!month || !day || !year) return 0;
  return new Date(2000 + year, month - 1, day).getTime();
}

function plural(count: number, singular: string, pluralLabel = `${singular}s`) {
  return count === 1 ? singular : pluralLabel;
}

function ContactAction({
  href,
  icon,
  children,
}: {
  href: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/60 transition-colors ${focusRing}`}
    >
      <span className="text-muted-foreground shrink-0">{icon}</span>
      <span className="break-all text-left">{children}</span>
    </a>
  );
}

function AddressCard({
  label,
  hint,
  address,
  icon,
}: {
  label: string;
  hint: string;
  address: string;
  icon: ReactNode;
}) {
  const { street, locality } = splitAddress(address);

  return (
    <Card className="p-5 h-full">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-foreground">{label}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{hint}</div>
        </div>
      </div>
      <address className="not-italic mt-4 text-sm leading-relaxed text-foreground">
        <div className="font-medium">{street}</div>
        {locality ? <div>{locality}</div> : null}
      </address>
    </Card>
  );
}

function CreditSnapshot({ onViewOpenMemos }: { onViewOpenMemos: () => void }) {
  const { totalCreditLine, availableCredit, currentBalance } = ACCOUNT_SNAPSHOT;
  const usedPct =
    totalCreditLine > 0
      ? Math.min(100, (currentBalance / totalCreditLine) * 100)
      : 0;
  const openMemos = CREDIT_MEMOS.filter((memo) => memo.status === "Open");
  const openRemaining = openMemos.reduce((sum, memo) => sum + memo.balance, 0);

  return (
    <Card className="p-5 sm:p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-stretch gap-5 lg:gap-8">
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Available credit
          </div>
          <div className="mono text-3xl font-semibold tracking-tight text-foreground mt-1 tabular-nums">
            {fmt(availableCredit)}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {fmt(currentBalance)} currently in use
          </p>
          <div className="mt-4">
            <div
              role="progressbar"
              aria-valuenow={Math.round(usedPct)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Share of credit line currently used"
              className="h-2 rounded-full bg-muted overflow-hidden"
            >
              <div
                className="h-full rounded-full bg-[#111]"
                style={{ width: `${usedPct}%` }}
              />
            </div>
            <div className="flex items-center justify-between gap-3 mt-1.5 text-[11px] text-muted-foreground">
              <span className="font-medium uppercase tracking-wider">
                {Math.round(usedPct)}% used
              </span>
              <span>{fmt(totalCreditLine)} credit line</span>
            </div>
          </div>
        </div>

        {openMemos.length > 0 ? (
          <button
            type="button"
            onClick={onViewOpenMemos}
            className={`lg:w-64 lg:shrink-0 w-full text-left rounded-xl border border-border bg-muted/40 px-4 py-3.5 hover:bg-muted hover:border-[#999]/50 transition-colors group flex flex-col justify-center ${focusRing}`}
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Open credit
            </div>
            <div className="mt-1 flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {openMemos.length}{" "}
                  {plural(openMemos.length, "memo")} to apply
                </div>
                <div className="mono text-sm text-muted-foreground mt-0.5 tabular-nums">
                  {fmt(openRemaining)} remaining
                </div>
              </div>
              <ChevronRight
                size={16}
                className="text-muted-foreground shrink-0 group-hover:translate-x-0.5 transition-transform"
              />
            </div>
          </button>
        ) : null}
      </div>
    </Card>
  );
}

function AccountInfoTab() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <AddressCard
        label="Ship-to"
        hint="Where orders are delivered"
        address={DISTRIBUTOR_ACCOUNT.shipToAddress}
        icon={<Truck size={18} />}
      />
      <AddressCard
        label="Bill-to"
        hint="Where invoices are billed"
        address={DISTRIBUTOR_ACCOUNT.billToAddress}
        icon={<Receipt size={18} />}
      />
    </div>
  );
}

function ContactsTab() {
  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        Your Lucas Oil representative, and the people at{" "}
        {DISTRIBUTOR_ACCOUNT.shortName} we have on file.
      </p>

      <Card className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div
              className="w-12 h-12 rounded-full bg-[#111] text-white flex items-center justify-center text-sm font-semibold shrink-0"
              aria-hidden
            >
              {initials(DISTRIBUTOR_ACCOUNT.repName)}
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-foreground leading-snug">
                {DISTRIBUTOR_ACCOUNT.repName}
              </div>
              <div className="text-sm text-muted-foreground mt-0.5">
                Lucas Oil representative
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
            <ContactAction
              href={telHref(DISTRIBUTOR_ACCOUNT.repPhone)}
              icon={<Phone size={14} />}
            >
              {DISTRIBUTOR_ACCOUNT.repPhone}
            </ContactAction>
            <ContactAction
              href={`mailto:${DISTRIBUTOR_ACCOUNT.repEmail}`}
              icon={<Mail size={14} />}
            >
              {DISTRIBUTOR_ACCOUNT.repEmail}
            </ContactAction>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Customer contacts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CUSTOMER_CONTACTS.map((contact) => {
            const isPrimary =
              contact.name === DISTRIBUTOR_ACCOUNT.primaryContact;
            return (
              <Card key={contact.email} className="p-5 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-foreground shrink-0"
                    aria-hidden
                  >
                    {initials(contact.name)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="text-sm font-semibold text-foreground">
                        {contact.name}
                      </div>
                      {isPrimary ? (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-[#111] text-white">
                          Primary
                        </span>
                      ) : null}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {contact.role}
                    </div>
                  </div>
                </div>
                <div className="mt-auto space-y-2">
                  <a
                    href={`mailto:${contact.email}`}
                    className={`flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors rounded-md ${focusRing}`}
                  >
                    <Mail size={14} className="text-muted-foreground shrink-0" />
                    <span className="break-all">{contact.email}</span>
                  </a>
                  <a
                    href={telHref(contact.phone)}
                    className={`flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors rounded-md ${focusRing}`}
                  >
                    <Phone size={14} className="text-muted-foreground shrink-0" />
                    <span>{contact.phone}</span>
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MemoInvoiceLink({ memo }: { memo: CreditMemo }) {
  const navigate = useNavigate();

  if (!memo.relatedInvoiceNumber) {
    return <span className="text-sm text-muted-foreground">—</span>;
  }

  return (
    <button
      type="button"
      onClick={() => navigate(ROUTES.invoice(memo.relatedInvoiceNumber!))}
      className={`mono text-sm font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-2 hover:decoration-primary hover:text-primary transition-colors rounded-sm ${focusRing}`}
    >
      {memo.relatedInvoiceNumber}
    </button>
  );
}

function CreditMemoCards({ memos }: { memos: CreditMemo[] }) {
  return (
    <div className="md:hidden divide-y divide-border">
      {memos.map((memo) => (
        <article key={memo.memoNumber} className="px-5 py-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <span className="mono text-sm font-semibold text-foreground">
              {memo.memoNumber}
            </span>
            <StatusBadge status={memo.status} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Date
              </div>
              <div className="mono text-sm mt-0.5">{memo.date}</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Original
              </div>
              <div className="mono text-sm mt-0.5 tabular-nums">
                {fmt(memo.originalAmount)}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Remaining
              </div>
              <div className="mono text-sm font-semibold mt-0.5 tabular-nums">
                {fmt(memo.balance)}
              </div>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Invoice
              </div>
              <div className="mt-0.5">
                <MemoInvoiceLink memo={memo} />
              </div>
            </div>
          </div>
          <p className="text-sm text-foreground">{memo.reason}</p>
        </article>
      ))}
    </div>
  );
}

function CreditMemoTable({ memos }: { memos: CreditMemo[] }) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full min-w-[720px]" aria-label="Credit memos for this account">
        <thead>
          <tr className="border-b border-border">
            {[
              "Memo",
              "Date",
              "Original",
              "Remaining",
              "Status",
              "Invoice",
              "Reason",
            ].map((heading) => (
              <th
                key={heading}
                scope="col"
                className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground px-5 py-3"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {memos.map((memo) => (
            <tr key={memo.memoNumber} className="hover:bg-muted/30 transition-colors">
              <td className="px-5 py-3.5 mono text-sm font-medium text-foreground">
                {memo.memoNumber}
              </td>
              <td className="px-5 py-3.5 mono text-sm text-muted-foreground">
                {memo.date}
              </td>
              <td className="px-5 py-3.5 mono text-sm text-foreground tabular-nums">
                {fmt(memo.originalAmount)}
              </td>
              <td className="px-5 py-3.5 mono text-sm font-semibold text-foreground tabular-nums">
                {fmt(memo.balance)}
              </td>
              <td className="px-5 py-3.5">
                <StatusBadge status={memo.status} />
              </td>
              <td className="px-5 py-3.5">
                <MemoInvoiceLink memo={memo} />
              </td>
              <td className="px-5 py-3.5 text-sm text-foreground max-w-[220px]">
                {memo.reason}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FinancialTab({
  memoFilter,
  onFilterChange,
}: {
  memoFilter: MemoFilter;
  onFilterChange: (next: MemoFilter) => void;
}) {
  const memos = [...CREDIT_MEMOS].sort(
    (a, b) => parseMemoDate(b.date) - parseMemoDate(a.date),
  );
  const counts: Record<MemoFilter, number> = {
    all: memos.length,
    open: memos.filter((memo) => memo.status === "Open").length,
    applied: memos.filter((memo) => memo.status === "Applied").length,
  };
  const visible =
    memoFilter === "all"
      ? memos
      : memos.filter((memo) => memo.status.toLowerCase() === memoFilter);

  return (
    <div id="credit-memos" className="space-y-4 scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Credit memos</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Open memos still have a balance that can be applied. Applied memos
            are already used.
          </p>
        </div>
        <div className="flex items-center gap-1.5" role="group" aria-label="Filter credit memos">
          {MEMO_FILTERS.map((filter) => {
            const active = memoFilter === filter;
            const label = filter[0].toUpperCase() + filter.slice(1);
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={active}
                onClick={() => onFilterChange(filter)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${focusRing} ${
                  active
                    ? "bg-[#111] text-white"
                    : "bg-card border border-border text-foreground hover:bg-muted"
                }`}
              >
                {label}
                <span className={active ? "text-white/70" : "text-muted-foreground"}>
                  {counts[filter]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <Card className="overflow-hidden">
        {visible.length === 0 ? (
          <div className="text-center px-6 py-10">
            <p className="text-sm font-medium text-foreground">
              No {memoFilter === "all" ? "" : `${memoFilter} `}credit memos
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {memoFilter === "all"
                ? "Credits issued to this account will show up here."
                : "Switch the filter to see the other memos."}
            </p>
          </div>
        ) : (
          <>
            <CreditMemoCards memos={visible} />
            <CreditMemoTable memos={visible} />
          </>
        )}
      </Card>

      <p className="text-sm text-muted-foreground">
        Credit details are view-only. To request an adjustment, contact{" "}
        <a
          href={`mailto:${DISTRIBUTOR_ACCOUNT.repEmail}?subject=Credit%20adjustment%20for%20${encodeURIComponent(DISTRIBUTOR_ACCOUNT.accountNumber)}`}
          className={`font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-2 hover:text-primary hover:decoration-primary rounded-sm ${focusRing}`}
        >
          {DISTRIBUTOR_ACCOUNT.repName}
        </a>
        .
      </p>
    </div>
  );
}

export default function AccountPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pendingMemoScroll = useRef(false);
  const rawSection = searchParams.get("section");
  const rawMemo = searchParams.get("memo");
  const section: Section = isSection(rawSection) ? rawSection : "info";
  const memoFilter: MemoFilter = isMemoFilter(rawMemo) ? rawMemo : "all";
  const openMemoCount = CREDIT_MEMOS.filter((memo) => memo.status === "Open").length;

  function writeParams(next: { section?: Section; memo?: MemoFilter }) {
    const sectionValue = next.section ?? section;
    const memoValue = next.memo ?? (sectionValue === "financial" ? memoFilter : "all");
    const params = new URLSearchParams();
    if (sectionValue !== "info") params.set("section", sectionValue);
    if (sectionValue === "financial" && memoValue !== "all") {
      params.set("memo", memoValue);
    }
    setSearchParams(params, { replace: true });
  }

  useEffect(() => {
    const sectionInvalid = rawSection !== null && !isSection(rawSection);
    const memoInvalid = rawMemo !== null && !isMemoFilter(rawMemo);
    if (!sectionInvalid && !memoInvalid) return;
    const params = new URLSearchParams(searchParams);
    if (sectionInvalid) params.delete("section");
    if (memoInvalid) params.delete("memo");
    setSearchParams(params, { replace: true });
  }, [rawMemo, rawSection, searchParams, setSearchParams]);

  useEffect(() => {
    if (section !== "financial" || !pendingMemoScroll.current) return;
    pendingMemoScroll.current = false;
    document.getElementById("credit-memos")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [section, memoFilter]);

  return (
    <div className="max-w-page mx-auto px-4 sm:px-6 py-8">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Account
        </p>
        <h1 className="text-2xl font-semibold text-foreground mt-1">
          {DISTRIBUTOR_ACCOUNT.legalName}
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
          <span className="mono">#{DISTRIBUTOR_ACCOUNT.accountNumber}</span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} aria-hidden />
            {DISTRIBUTOR_ACCOUNT.territory}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <User size={14} aria-hidden />
            {DISTRIBUTOR_ACCOUNT.repName}
            <span aria-hidden>·</span>
            Lucas Oil rep
          </span>
        </div>
      </header>

      <CreditSnapshot
        onViewOpenMemos={() => {
          if (section === "financial" && memoFilter === "open") {
            document.getElementById("credit-memos")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            return;
          }
          pendingMemoScroll.current = true;
          writeParams({ section: "financial", memo: "open" });
        }}
      />

      <Tabs
        value={section}
        onValueChange={(value) => {
          if (isSection(value)) writeParams({ section: value });
        }}
        className="gap-5"
      >
        <TabsList className="w-full sm:w-fit h-auto p-1">
          <TabsTrigger value="info" className="flex-1 sm:flex-none px-3 sm:px-4 py-2">
            Account Info
          </TabsTrigger>
          <TabsTrigger
            value="contacts"
            className="flex-1 sm:flex-none px-3 sm:px-4 py-2"
          >
            Contacts
          </TabsTrigger>
          <TabsTrigger
            value="financial"
            className="flex-1 sm:flex-none px-3 sm:px-4 py-2"
          >
            Financial
            {openMemoCount > 0 ? (
              <span className="inline-flex min-w-5 h-5 items-center justify-center rounded-full bg-[#111] px-1.5 text-[10px] font-semibold text-white tabular-nums">
                {openMemoCount}
              </span>
            ) : null}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <AccountInfoTab />
        </TabsContent>
        <TabsContent value="contacts">
          <ContactsTab />
        </TabsContent>
        <TabsContent value="financial">
          <FinancialTab
            memoFilter={memoFilter}
            onFilterChange={(next) => writeParams({ section: "financial", memo: next })}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
