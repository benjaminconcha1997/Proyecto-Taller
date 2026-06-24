-- CreateTable
CREATE TABLE "Workshop" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "schedule" TEXT NOT NULL,
    "availableSlots" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Workshop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "minStock" INTEGER NOT NULL,
    "unitPrice" INTEGER NOT NULL,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "concept" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);
