"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { InputBox } from "@repo/ui/input-box";
import { Select } from "@repo/ui/select";
import { useState } from "react";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoneyCard = () => {
  const [amount, setAmount] = useState<number>(0);
  const [redirectURL, setRedirectURL] = useState<string>(
    SUPPORTED_BANKS[0]?.redirectUrl,
  );

  return (
    <Card title="Add Money">
      <div className="w-full">
        <InputBox
          label="Amount"
          min="0"
          onChange={(value) => setAmount(Number(value))}
          placeholder="Amount"
          type="number"
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            setRedirectURL(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || "",
            );
          }}
          options={SUPPORTED_BANKS.map((bank) => {
            return { key: bank.name, value: bank.name };
          })}
        />
        <div className="flex justify-center pt-4">
          <Button onClick={() => (window.location.href = redirectURL || "")}>
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
