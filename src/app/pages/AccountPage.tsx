import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Mail, MapPin, Phone, User } from "lucide-react";
import { Card } from "../components/shared/Card";
import { PageHeader } from "../components/shared/PageHeader";
import { StatusBadge } from "../components/shared/StatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  ACCOUNT_SNAPSHOT,
  CREDIT_MEMOS,
  CUSTOMER_CONTACTS,
  DISTRIBUTOR_ACCOUNT,
} from "../data/account";
import { fmt } from "../lib/format";
import { ROUTES } from "../routes";

// OPEN QUESTION: Financial fields (Credit Line, Available Credit, Current
// Balance, Credit Memos) may live in Sage 100 and not yet be mapped through
// Snowflake into Salesforce. Credit memos are transactional records (status,
// remaining balance, related invoice) — confirm shape with Mark/Amber before
// treating this list UI as final.

// Sept 2026: Sign out moved from page-bottom into the persistent TopNav
// header/profile area (see TopNav.tsx) so it's reachable from every page,
// not just Account.

function DetailRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-3.5">
      {icon ? (
        <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground shrink-0">
          {icon}
        </div>
      ) : null}
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          {label}
        </div>
        <div className="text-sm font-medium text-foreground leading-snug">
          {value}
        </div>
      </div>
    </div>
  );
}

function ContactLinkRow({
  icon,
  href,
  value,
}: {
  icon: ReactNode;
  href: string;
  value: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-2.5 text-sm text-foreground hover:text-primary transition-colors group"
    >
      <span className="text-muted-foreground shrink-0">{icon}</span>
      <span className="mono underline decoration-muted-foreground/40 underline-offset-2 group-hover:decoration-primary">
        {value}
      </span>
    </a>
  );
}

function AccountInfoTab() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 pb-5 mb-1 border-b border-border">
        <div className="w-12 h-12 rounded-xl bg-[#111]/8 flex items-center justify-center shrink-0">
          <Building2 size={22} className="text-[#111]" />
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-foreground leading-snug">
            {DISTRIBUTOR_ACCOUNT.legalName}
          </div>
          <div className="text-sm text-muted-foreground mt-0.5 mono">
            Account #{DISTRIBUTOR_ACCOUNT.accountNumber}
          </div>
        </div>
      </div>
      <div className="divide-y divide-border">
        <DetailRow
          label="Territory"
          value={DISTRIBUTOR_ACCOUNT.territory}
          icon={<MapPin size={15} />}
        />
        <DetailRow
          label="Ship-To Address"
          value={DISTRIBUTOR_ACCOUNT.shipToAddress}
          icon={<MapPin size={15} />}
        />
        <DetailRow
          label="Bill-To Address"
          value={DISTRIBUTOR_ACCOUNT.billToAddress}
          icon={<MapPin size={15} />}
        />
      </div>
    </Card>
  );
}

function ContactsTab() {
  return (
    <Card className="overflow-hidden">
      <div className="p-6 bg-muted/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-[#111]/8 flex items-center justify-center shrink-0">
            <User size={20} className="text-[#111]" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-foreground leading-snug">
              {DISTRIBUTOR_ACCOUNT.repName}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-0.5">
              Lucas Oil Rep
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-6 pl-0 sm:pl-14">
          <ContactLinkRow
            icon={<Phone size={14} />}
            href={`tel:${DISTRIBUTOR_ACCOUNT.repPhone.replace(/\s/g, "")}`}
            value={DISTRIBUTOR_ACCOUNT.repPhone}
          />
          <ContactLinkRow
            icon={<Mail size={14} />}
            href={`mailto:${DISTRIBUTOR_ACCOUNT.repEmail}`}
            value={DISTRIBUTOR_ACCOUNT.repEmail}
          />
        </div>
      </div>

      <div className="p-6 border-t border-border">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground/80 mb-3">
          Customer Contacts
        </div>
        <div className="divide-y divide-border">
          {CUSTOMER_CONTACTS.map((c) => (
            <div
              key={c.email}
              className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
            >
              <div className="flex items-center gap-2.5">
                <User size={14} className="text-muted-foreground shrink-0" />
                <div>
                  <div className="text-sm text-foreground">{c.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {c.role}
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-1.5 pl-6 sm:pl-0">
                <ContactLinkRow
                  icon={<Mail size={13} />}
                  href={`mailto:${c.email}`}
                  value={c.email}
                />
                <ContactLinkRow
                  icon={<Phone size={13} />}
                  href={`tel:${c.phone.replace(/\s/g, "")}`}
                  value={c.phone}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function FinancialTab() {
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      <Card className="p-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Account Snapshot
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Total Credit Line
            </div>
            <div className="mono text-lg font-semibold text-foreground">
              {fmt(ACCOUNT_SNAPSHOT.totalCreditLine)}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Available Credit
            </div>
            <div className="mono text-lg font-semibold text-foreground">
              {fmt(ACCOUNT_SNAPSHOT.availableCredit)}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Current Balance
            </div>
            <div className="mono text-lg font-semibold text-foreground">
              {fmt(ACCOUNT_SNAPSHOT.currentBalance)}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="px-6 pt-6 pb-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Credit Memos
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-border">
                {[
                  "Memo #",
                  "Date",
                  "Amount",
                  "Balance",
                  "Status",
                  "Related Invoice",
                  "Reason",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground px-6 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {CREDIT_MEMOS.map((m) => (
                <tr key={m.memoNumber}>
                  <td className="px-6 py-3.5 mono text-sm font-medium text-foreground">
                    {m.memoNumber}
                  </td>
                  <td className="px-6 py-3.5 mono text-sm text-muted-foreground">
                    {m.date}
                  </td>
                  <td className="px-6 py-3.5 mono text-sm font-semibold text-foreground">
                    {fmt(m.originalAmount)}
                  </td>
                  <td className="px-6 py-3.5 mono text-sm font-semibold text-foreground">
                    {fmt(m.balance)}
                  </td>
                  <td className="px-6 py-3.5">
                    <StatusBadge status={m.status} />
                  </td>
                  <td className="px-6 py-3.5">
                    {m.relatedInvoiceNumber ? (
                      <button
                        type="button"
                        onClick={() =>
                          navigate(ROUTES.invoice(m.relatedInvoiceNumber!))
                        }
                        className="mono text-sm font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-2 hover:decoration-primary hover:text-primary transition-colors"
                      >
                        {m.relatedInvoiceNumber}
                      </button>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-foreground">
                    {m.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {CREDIT_MEMOS.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No credit memos on file.
            </div>
          )}
        </div>
      </Card>

      <p className="text-xs text-muted-foreground italic">
        View-only — no self-service credit requests in Phase 1.
      </p>
    </div>
  );
}

export default function AccountPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader title="Account" />

      <Tabs defaultValue="info" className="gap-6">
        <TabsList className="w-full sm:w-fit h-auto p-1">
          <TabsTrigger value="info" className="flex-1 sm:flex-none px-4 py-2">
            Account Info
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex-1 sm:flex-none px-4 py-2">
            Contacts
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex-1 sm:flex-none px-4 py-2">
            Financial
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <AccountInfoTab />
        </TabsContent>
        <TabsContent value="contacts">
          <ContactsTab />
        </TabsContent>
        <TabsContent value="financial">
          <FinancialTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
