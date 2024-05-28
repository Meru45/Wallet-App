"use client";

import { useState } from "react";
import { Card } from "@repo/ui/card";
import { InputBox } from "@repo/ui/input-box";
import { Button } from "@repo/ui/button";
import { Center } from "@repo/ui/center";
import { sendMoney } from "../../lib/actions/sendMoney";

const P2P = () => {
  const [number, setNumber] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  return (
    <div className="w-screen h-[90vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <InputBox
              label="Number"
              onChange={(value) => setNumber(value)}
              placeholder="Number"
              type="text"
              min=""
            />
            <InputBox
              label="Amount"
              onChange={(value) => setAmount(Number(value))}
              placeholder="Amount"
              type="number"
              min="0"
            />
            <div className="pt-6 flex justify-center">
              <Button
                onClick={async () => {
                  await sendMoney(number, amount * 100);
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
};

export default P2P;
