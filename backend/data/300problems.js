

// 🌱 Seed 300 problems for this user
const userProblems = problemsSeed.map(p => ({ userId: newUser._id, ...p }));
await Problem.insertMany(userProblems);
console.log(`🌱 Seeded 300 problems for ${username}`);
