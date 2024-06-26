import { Card } from "@repo/ui/card";

interface Transaction {
  time: Date;
  amount: number;
  //TODO: Make the type of 'status' be more specific
  status?: string;
  provider?: string;
}

export const OnRampTransactions = ({
  //TODO: Render the status of the transaction also
  transactions,
}: {
  transactions: Transaction[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }

  const renderedTransactions = transactions.map((t) => {
    return (
      <div className="flex justify-between">
        <div>
          <div className="text-sm">Received INR</div>
          <div className="text-slate-600 text-xs">{t.time.toDateString()}</div>
        </div>
        <div>+ Rs {t.amount}</div>
      </div>
    );
  });

  return (
    <Card title="Recent Transactions">
      <div className="pt-2">{renderedTransactions}</div>
    </Card>
  );
};
