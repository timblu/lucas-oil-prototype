import type { ReactNode } from "react";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { Card } from "../components/shared/Card";
import { PageHeader } from "../components/shared/PageHeader";
import { DISTRIBUTOR_ACCOUNT } from "../data/account";

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
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <PageHeader title="Account" />
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
    </div>
  );
}
