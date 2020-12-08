export type TicketSegmentData = {
  date: string;
  destination: string;
  duration: number;
  origin: string;
  stops: string[];
};

export type TicketData = {
  carrier: string;
  price: number;
  segments: TicketSegmentData[];
};
