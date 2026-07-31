import type { Case, Message } from "../types";

export const CASES: Case[] = [
  {
    id: "CS-2041",
    subject: "Damaged case on delivery",
    status: "Open",
    lastUpdated: "03/22/26",
    orderId: "SO-10041",
  },
  {
    id: "CS-2039",
    subject: "Missing item — short-shipped 2 cases",
    status: "In Progress",
    lastUpdated: "03/21/26",
    orderId: "SO-10042",
  },
  {
    id: "CS-2031",
    subject: "Request MSDS sheet #10245",
    status: "Resolved",
    lastUpdated: "03/18/26",
  },
  {
    id: "CS-2028",
    subject: "Wrong ship-to on last PO",
    status: "Resolved",
    lastUpdated: "03/16/26",
  },
  {
    id: "CS-2020",
    subject: "Q about case-pack breakdown",
    status: "Closed",
    lastUpdated: "03/12/26",
  },
  {
    id: "CS-2015",
    subject: "Marketing collateral request",
    status: "Open",
    lastUpdated: "03/10/26",
  },
  {
    id: "CS-2011",
    subject: "Return authorization ask",
    status: "In Progress",
    lastUpdated: "03/07/26",
  },
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    sender: "agent",
    agentName: "A. Reyes",
    timestamp: "03/22 2:14p",
    body: "Thanks — can you confirm the lot # affected?",
  },
  {
    id: "2",
    sender: "you",
    timestamp: "03/22 3:02p",
    body: "Lot #A22-0345. Packing slip photo attached.",
  },
  {
    id: "3",
    sender: "agent",
    agentName: "A. Reyes",
    timestamp: "03/23 9:10a",
    body: "Got it — credit for 3 cases issued today.",
  },
];
