export interface InvoiceDto extends Invoice {
  createdAt: Date;
  updatedAt: Date;
  _embedded: unknown;
}

export interface Invoice {
  id: string;
  jobAdId: string;
  amount: number;
  dueDate: Date;
}
