-- CreateTable
CREATE TABLE "Audit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "principle" INTEGER NOT NULL,
    "guideline" INTEGER NOT NULL,
    "section" INTEGER NOT NULL,
    "pass" BOOLEAN NOT NULL,
    "failure_pages" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
