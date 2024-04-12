export interface InvoiceViewModel {
  id: string;
  jobAdId: string;
  jobName: string;
  amount: number;
  dueDate: Date;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    _embedded: unknown;
  };
}
