export interface Provider {
  date: string;
  id: string;
  availability: Availability[];
}

export interface Availability {
  name: string;
  providerID: number;
  times: string[];
}
