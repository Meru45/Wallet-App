"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function sendMoney(to: string, amount: number) {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user) {
    return {
      success: false,
      err: "Unauthorized",
    };
  }

  const foundUser = await prisma.user.findFirst({
    where: { number: to },
  });

  if (!foundUser) {
    return {
      success: false,
      err: "User not found",
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      //Locking the balance of the sender
      await tx.$queryRaw`SELECT * FROM "Balances" WHERE "userId" = ${Number(session.user.id)} FOR UPDATE`;

      const fromBalance = await tx.balances.findUnique({
        where: { userId: Number(session.user.id) },
      });

      if (!fromBalance || fromBalance?.amount < amount) {
        throw new Error("Insufficient funds");
      }

      await tx.balances.update({
        where: { userId: Number(session.user.id) },
        data: {
          amount: {
            decrement: amount,
          },
        },
      });

      await tx.balances.upsert({
        where: { userId: Number(foundUser.id) },
        update: {
          amount: {
            increment: amount,
          },
        },
        create: {
          amount: amount,
          userId: foundUser.id,
          locked: 0,
        },
      });

      await tx.p2PTransactions.create({
        data: {
          amount: amount,
          timestamp: new Date(),
          fromUserId: Number(session.user.id),
          toUserId: foundUser.id,
        },
      });
    });

    return { success: true, msg: `Sent amount ${amount} to ${to}` };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      msg: "Transaction interupted due to either insufficient funds or database connection error",
    };
  }
}
