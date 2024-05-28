"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { InputBox } from "@repo/ui/input-box";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { createOnRampTransaction } from "../app/lib/actions/createOnRampTransaction";

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
  const [redirectURL, setRedirectURL] = useState<string | undefined>(
    SUPPORTED_BANKS[0]?.redirectUrl,
  );
  const [provider, setProvider] = useState<string | undefined>(
    SUPPORTED_BANKS[0]?.name,
  );

  const url404 = "/fdadfdasfdsf";

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
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || "",
            );
          }}
          options={SUPPORTED_BANKS.map((bank) => {
            return { key: bank.name, value: bank.name };
          })}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              if (provider == undefined) {
                window.location.href = url404;
              } else {
                await createOnRampTransaction(provider, amount);
                window.location.href = redirectURL || "";
              }
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
