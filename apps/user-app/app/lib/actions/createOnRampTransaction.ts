"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function createOnRampTransaction(
  provider: string,
  amount: number,
) {
  // Ideally the token should come from the bankig provider (hdbf/axis)
  const session = await getServerSession(authOptions);

  if (!session?.user || !session?.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }

  const token = (Math.random() * 1000).toString();

  try {
    await prisma.onRampTransaction.create({
      data: {
        provider: provider,
        status: "Processing",
        startTime: new Date(),
        token: token,
        userId: Number(session.user.id),
        amount: amount,
      },
    });

    return {
      success: true,
      message: "Done",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      err: "Error occured in the db",
    };
  }
}
