-- CreateTable
CREATE TABLE "WatchList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contentType" TEXT NOT NULL,
    "contentId" TEXT NOT NULL
);
