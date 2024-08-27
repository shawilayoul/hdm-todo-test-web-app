1. Choosing React and Prisma
   
React:offers component-based architecture, which promotes reusability and clean code.
Prisma:I think prisma simplifies working with databases and integrates well with modern JavaScript/TypeScript projects.

2- Decisions:

name: A required field representing the task's title.
createdAt and updatedAt: Timestamps for task creation and last update.

3-Breakpoints:

Initial Setup: Setting up Prisma with MySQL required careful configuration of the .env file and initial migrations.
Frontend-Backend Integration: Making sure that the frontend correctly communicated with the backend and validating data across the stack.

4-Challenges Encountered

Database Connection Issues: Initially, there were issues connecting Prisma to the MySQL database.
 This was resolved by ensuring the correct database URL was configured in the .env file ,usename/password match with the one in phpmyadmin
