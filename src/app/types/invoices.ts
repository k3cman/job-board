export interface InvoiceDto extends Invoice {
  createdAt: Date;
  updatedAt: Date;
  _embedded: unknown;
}

export interface Invoice {
  id: number;
  jobAdId: number | string;
  amount: number;
  dueDate: Date;
}
