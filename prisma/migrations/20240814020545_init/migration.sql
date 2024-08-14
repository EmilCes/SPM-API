-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "lastname" VARCHAR(50) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Project" (
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("projectId")
);

-- CreateTable
CREATE TABLE "Activity" (
    "activityId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("activityId")
);

-- CreateTable
CREATE TABLE "Subactivity" (
    "subactivityId" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subactivity_pkey" PRIMARY KEY ("subactivityId")
);

-- CreateTable
CREATE TABLE "Tag" (
    "tagId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("tagId")
);

-- CreateTable
CREATE TABLE "ActivityTag" (
    "activityId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivityTag_pkey" PRIMARY KEY ("activityId","tagId")
);

-- CreateTable
CREATE TABLE "_UserProjects" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_UserProjects_AB_unique" ON "_UserProjects"("A", "B");

-- CreateIndex
CREATE INDEX "_UserProjects_B_index" ON "_UserProjects"("B");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("projectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subactivity" ADD CONSTRAINT "Subactivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("activityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityTag" ADD CONSTRAINT "ActivityTag_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("activityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityTag" ADD CONSTRAINT "ActivityTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("tagId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserProjects" ADD CONSTRAINT "_UserProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("projectId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserProjects" ADD CONSTRAINT "_UserProjects_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
