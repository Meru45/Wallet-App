/*
  Warnings:

  - Added the required column `timestamp` to the `P2PTransactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "P2PTransactions" ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;
