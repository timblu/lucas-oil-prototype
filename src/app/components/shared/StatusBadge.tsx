export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Received: "bg-[#E4E4E4] text-[#555] ring-1 ring-[#ccc]",
    Picked: "bg-[#E4E4E4] text-[#333] ring-1 ring-[#ccc]",
    Shipping: "bg-[#E4E4E4] text-[#111] ring-1 ring-[#ccc]",
    "Out for Delivery": "bg-[#111] text-white ring-1 ring-[#111]",
    Delivered: "bg-white text-[#111] ring-1 ring-[#bbb]",
    Open: "bg-[#111] text-white ring-1 ring-[#111]",
    "In Progress": "bg-[#555] text-white ring-1 ring-[#555]",
    Resolved: "bg-white text-[#111] ring-1 ring-[#bbb]",
    Closed: "bg-[#E4E4E4] text-[#777] ring-1 ring-[#ddd]",
    Paid: "bg-white text-[#111] ring-1 ring-[#bbb]",
    "Past Due": "bg-[#111] text-white ring-1 ring-[#111]",
    Applied: "bg-white text-[#111] ring-1 ring-[#bbb]",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold tracking-wide ${map[status] ?? "bg-[#E4E4E4] text-[#555]"}`}
    >
      {status}
    </span>
  );
}
