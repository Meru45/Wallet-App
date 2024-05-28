import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import db from "@repo/db/client";

const PORT: number = 8080;

const app = express();

app.use(bodyParser.json());

app.post("/hdfcbank", async (req: Request, res: Response) => {
  //TODO: Add zod validation here
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  const onRampTransaction = await db.onRampTransaction.findFirst({
    where: {
      token: paymentInformation.token,
    },
  });

  if (!onRampTransaction) {
    return res.status(404).json({ msg: "Transaction does not exist" });
  }

  if (onRampTransaction.status != "Processing") {
    return res.status(400).json({ msg: "The request is already proccesed" });
  }

  if (onRampTransaction.amount != Number(paymentInformation.amount)) {
    return res
      .status(400)
      .json({ msg: "Ammounts on the transaction and request don't match" });
  }

  try {
    await db.$transaction(async (tx) => {
      await tx.balances.upsert({
        where: {
          userId: Number(paymentInformation.userId),
        },
        update: {
          amount: {
            increment:
              Number(paymentInformation.amount) -
              Number(paymentInformation.amount) / 10,
          },
          locked: {
            increment: Number(paymentInformation.amount) / 10,
          },
        },
        create: {
          amount:
            Number(paymentInformation.amount) -
            Number(paymentInformation.amount) / 10,
          locked: Number(paymentInformation.amount) / 10,
          userId: Number(paymentInformation.userId),
        },
      });

      await db.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      });
    });
    return res.status(200).json({ message: "captured" });
  } catch (err) {
    console.log(err);
    return res.status(411).json({
      message: "failed to capture",
    });
  }
});

function startServer() {
  app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
  });
}

startServer();
