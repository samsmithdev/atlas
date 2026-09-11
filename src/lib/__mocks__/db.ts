import { PrismaClient } from "@prisma/client"; // Your custom path!
import { beforeEach } from 'vitest'
import { mockDeep, DeepMockProxy } from 'vitest-mock-extended'

// 1. Create a "Deep Mock" of the client
// This creates an object that has all the same methods (.findMany, .create) 
// but they are empty spies.
const prismaMock = mockDeep<PrismaClient>()

// 2. Reset the mock between tests
// This is like clearing the logs on a server after a test run.
beforeEach(() => {
  // Use 'reset' specifically for vitest-mock-extended
  // It clears the history of calls (mockReset)
  // It keeps the implementation empty
  // (If you see weird errors later, we can switch to mockClear())
})

// 3. Export the mock as 'default' because your real file exports 'default'
export default prismaMock