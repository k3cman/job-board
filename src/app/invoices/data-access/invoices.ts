export interface InvoiceViewModel {
  id: number | string;
  jobAdId: number | string;
  jobName: string;
  amount: number;
  dueDate: Date;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    _embedded: unknown;
  };
}
