import express, { Request, Response } from "express";
import db from "@repo/db/client";

const PORT: number = 3000;

const app = express();

app.post("/hdfcbank", async (req: Request, res: Response) => {
  //TODO: Add zod validation here
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  try {
    await db.$transaction([
      db.balances.update({
        where: {
          userId: paymentInformation.userId,
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),

      db.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    res.json({ msg: "captured" });
  } catch (err) {
    res.status(411).json({
      message: "captured",
    });
  }
});

function startServer() {
  app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
  });
}

startServer();
