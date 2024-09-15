-- CreateTable
CREATE TABLE "WatchHistory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "showId" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "episodeNum" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "showName" TEXT NOT NULL,
    "posterUrl" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "WatchHistory_showId_seasonId_episodeNum_idx" ON "WatchHistory"("showId", "seasonId", "episodeNum");
