-- CreateTable
CREATE TABLE "sensor_data" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "external_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "created_at" BIGINT NOT NULL DEFAULT (strftime('%s', 'now')),
    "updated_at" BIGINT NOT NULL DEFAULT (strftime('%s', 'now'))
);