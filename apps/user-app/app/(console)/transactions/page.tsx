import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { OnRampTransactions } from "../../../components/OnRampTransactions";

//TODO: Add received and deducted logic properly show all the transactions by the user
async function getTransactions() {
  const session = await getServerSession(authOptions);
  const transactions = await prisma.p2PTransactions.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
  });

  return transactions.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
  }));
}

const Transactions = async () => {
  const transactions = await getTransactions();
  return (
    <div className="w-screen pt-4 pr-4">
      <OnRampTransactions transactions={transactions} />
    </div>
  );
};

export default Transactions;
