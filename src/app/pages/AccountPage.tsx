import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Mail, MapPin, Phone, User, Users } from "lucide-react";
import { Card } from "../components/shared/Card";
import { PageHeader } from "../components/shared/PageHeader";
import {
  ACCOUNT_SNAPSHOT,
  CREDIT_MEMOS,
  CUSTOMER_CONTACTS,
  DISTRIBUTOR_ACCOUNT,
} from "../data/account";
import { useAuth } from "../auth/AuthContext";
import { fmt } from "../lib/format";
import { ROUTES } from "../routes";

// OPEN QUESTION: PRD references a Salesforce -> Sage 100 data-provenance
// caveat for account/credit data (which fields are authoritative in which
// system). Left out of the UI this pass — unconfirmed with Zach as of
// Sept 14. Revisit before this becomes more than mock data.

function AccountDetailRow({
  label,
  value,
  icon,
  href,
  mono = false,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
  href?: string;
  mono?: boolean;
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
        {href ? (
          <a
            href={href}
            className={`text-sm font-medium text-foreground hover:underline ${mono ? "mono" : ""}`}
          >
            {value}
          </a>
        ) : (
          <div
            className={`text-sm font-medium text-foreground leading-snug ${mono ? "mono" : ""}`}
          >
            {value}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AccountPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleSignOut() {
    logout();
    navigate(ROUTES.login);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader title="Account" />

      {/* Account Snapshot */}
      <Card className="p-6 mb-5">
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

      {/* Credit Memos */}
      <Card className="mb-5">
        <div className="px-6 pt-6 pb-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Credit Memos
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Memo #", "Date", "Amount", "Reason"].map((h) => (
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
                    {fmt(m.amount)}
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

      {/* Customer Contacts */}
      <Card className="p-6 mb-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          <Users size={13} /> Customer Contacts
        </div>
        <div className="divide-y divide-border">
          {CUSTOMER_CONTACTS.map((c) => (
            <div
              key={c.email}
              className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
            >
              <div>
                <div className="text-sm font-medium text-foreground">
                  {c.name}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {c.role}
                </div>
              </div>
              <div className="text-xs text-muted-foreground sm:text-right">
                <div className="mono">{c.email}</div>
                <div className="mono mt-0.5">{c.phone}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <p className="text-xs text-muted-foreground italic mb-8">
        View-only — no self-service credit requests in Phase 1.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Card className="p-6">
          <div className="flex items-center gap-3 pb-5 mb-1 border-b border-border">
            <div className="w-12 h-12 rounded-xl bg-[#111]/8 flex items-center justify-center shrink-0">
              <User size={22} className="text-[#111]" />
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
            <AccountDetailRow
              label="Territory"
              value={DISTRIBUTOR_ACCOUNT.territory}
              icon={<MapPin size={15} />}
            />
            <AccountDetailRow
              label="Lucas Oil Rep"
              value={DISTRIBUTOR_ACCOUNT.repName}
              icon={<User size={15} />}
            />
            <AccountDetailRow
              label="Rep Phone"
              value={DISTRIBUTOR_ACCOUNT.repPhone}
              href={`tel:${DISTRIBUTOR_ACCOUNT.repPhone.replace(/\s/g, "")}`}
              icon={<Phone size={15} />}
              mono
            />
            <AccountDetailRow
              label="Rep Email"
              value={DISTRIBUTOR_ACCOUNT.repEmail}
              href={`mailto:${DISTRIBUTOR_ACCOUNT.repEmail}`}
              icon={<Mail size={15} />}
              mono
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 pb-5 mb-1 border-b border-border">
            <div className="w-12 h-12 rounded-xl bg-[#111]/8 flex items-center justify-center shrink-0">
              <Mail size={20} className="text-[#111]" />
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-foreground leading-snug">
                {DISTRIBUTOR_ACCOUNT.primaryContact}
              </div>
              <div className="text-sm text-muted-foreground mt-0.5">
                Primary contact
              </div>
            </div>
          </div>
          <div className="divide-y divide-border">
            <AccountDetailRow
              label="Email"
              value={DISTRIBUTOR_ACCOUNT.contactEmail}
              href={`mailto:${DISTRIBUTOR_ACCOUNT.contactEmail}`}
              icon={<Mail size={15} />}
              mono
            />
            <AccountDetailRow
              label="Ship-to Address"
              value={DISTRIBUTOR_ACCOUNT.shipToAddress}
              icon={<MapPin size={15} />}
            />
            <AccountDetailRow
              label="Bill-to Address"
              value={DISTRIBUTOR_ACCOUNT.billToAddress}
              icon={<MapPin size={15} />}
            />
          </div>
        </Card>
      </div>

      <div className="mt-8 flex justify-center sm:justify-start">
        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </div>
  );
}
