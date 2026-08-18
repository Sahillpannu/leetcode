import "dotenv/config";
import { prisma } from "../lib/db";
import {
  sampleDPProblem,
  sampleStringProblem,
} from "../modules/problems/constant/sample-problem";

const twoSumProblem = {
  title: "Two Sum",
  description:
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
  difficulty: "EASY" as const,
  tags: ["Array", "Hash Table"],
  constraints:
    "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9\nOnly one valid answer exists.",
  hints: "Use a hash map to store numbers you have already seen.",
  editorial:
    "Iterate through the array once. For each number, check if target - number exists in a hash map. If it does, return both indices. Otherwise store the current number and its index.",
  testCases: [
    { input: "2 7 11 15\n9", output: "0 1" },
    { input: "3 2 4\n6", output: "1 2" },
    { input: "3 3\n6", output: "0 1" },
  ],
  examples: {
    JAVASCRIPT: {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    PYTHON: {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    JAVA: {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const lines = [];
rl.on('line', (line) => {
  lines.push(line);
  if (lines.length === 2) {
    const nums = lines[0].trim().split(/\\s+/).map(Number);
    const target = parseInt(lines[1].trim(), 10);
    const result = twoSum(nums, target) || [];
    console.log(result.join(' '));
    rl.close();
  }
});`,
    PYTHON: `class Solution:
    def twoSum(self, nums, target):
        # Return the two indices, for example [0, 1]
        return []

if __name__ == "__main__":
    import sys
    nums = list(map(int, sys.stdin.readline().strip().split()))
    target = int(sys.stdin.readline().strip())
    sol = Solution()
    result = sol.twoSum(nums, target) or []
    print(" ".join(map(str, result)))`,
    JAVA: `import java.util.Scanner;

class Main {
  public int[] twoSum(int[] nums, int target) {
      return new int[]{0, 1};
  }

  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      String[] parts = scanner.nextLine().trim().split("\\\\s+");
      int[] nums = new int[parts.length];
      for (int i = 0; i < parts.length; i++) {
          nums[i] = Integer.parseInt(parts[i]);
      }
      int target = Integer.parseInt(scanner.nextLine().trim());
      Main main = new Main();
      int[] result = main.twoSum(nums, target);
      System.out.println(result[0] + " " + result[1]);
      scanner.close();
  }
}`,
  },
  referenceSolutions: {
    JAVASCRIPT: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const lines = [];
rl.on('line', (line) => {
  lines.push(line);
  if (lines.length === 2) {
    const nums = lines[0].trim().split(/\\s+/).map(Number);
    const target = parseInt(lines[1].trim(), 10);
    const result = twoSum(nums, target) || [];
    console.log(result.join(' '));
    rl.close();
  }
});`,
    PYTHON: `class Solution:
    def twoSum(self, nums, target):
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []

if __name__ == "__main__":
    import sys
    nums = list(map(int, sys.stdin.readline().strip().split()))
    target = int(sys.stdin.readline().strip())
    sol = Solution()
    result = sol.twoSum(nums, target)
    print(" ".join(map(str, result)))`,
    JAVA: `import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

class Main {
  public int[] twoSum(int[] nums, int target) {
      Map<Integer, Integer> map = new HashMap<>();
      for (int i = 0; i < nums.length; i++) {
          int complement = target - nums[i];
          if (map.containsKey(complement)) {
              return new int[]{map.get(complement), i};
          }
          map.put(nums[i], i);
      }
      return new int[]{};
  }

  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      String[] parts = scanner.nextLine().trim().split("\\\\s+");
      int[] nums = new int[parts.length];
      for (int i = 0; i < parts.length; i++) {
          nums[i] = Integer.parseInt(parts[i]);
      }
      int target = Integer.parseInt(scanner.nextLine().trim());
      Main main = new Main();
      int[] result = main.twoSum(nums, target);
      System.out.println(result[0] + " " + result[1]);
      scanner.close();
  }
}`,
  },
};

const maximumSubarrayProblem = {
  title: "Maximum Subarray",
  description:
    "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
  difficulty: "MEDIUM" as const,
  tags: ["Array", "Dynamic Programming", "Divide and Conquer"],
  constraints: "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
  hints: "Kadane's algorithm keeps a running sum and resets it when it becomes negative.",
  editorial:
    "Use Kadane's algorithm: track the current subarray sum and the global maximum. If the current sum drops below zero, start a new subarray.",
  testCases: [
    { input: "-2 1 -3 4 -1 2 1 -5 4", output: "6" },
    { input: "1", output: "1" },
    { input: "5 4 -1 7 8", output: "23" },
  ],
  examples: {
    JAVASCRIPT: {
      input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
      output: "6",
      explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
    },
    PYTHON: {
      input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
      output: "6",
      explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
    },
    JAVA: {
      input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
      output: "6",
      explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const nums = line.trim().split(/\\s+/).map(Number);
  console.log(maxSubArray(nums));
  rl.close();
});`,
    PYTHON: `class Solution:
    def maxSubArray(self, nums):
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    nums = list(map(int, sys.stdin.readline().strip().split()))
    sol = Solution()
    print(sol.maxSubArray(nums))`,
    JAVA: `import java.util.Scanner;

class Main {
  public int maxSubArray(int[] nums) {
      return 0;
  }

  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      String[] parts = scanner.nextLine().trim().split("\\\\s+");
      int[] nums = new int[parts.length];
      for (int i = 0; i < parts.length; i++) {
          nums[i] = Integer.parseInt(parts[i]);
      }
      Main main = new Main();
      System.out.println(main.maxSubArray(nums));
      scanner.close();
  }
}`,
  },
  referenceSolutions: {
    JAVASCRIPT: `function maxSubArray(nums) {
  let current = nums[0];
  let best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const nums = line.trim().split(/\\s+/).map(Number);
  console.log(maxSubArray(nums));
  rl.close();
});`,
    PYTHON: `class Solution:
    def maxSubArray(self, nums):
        current = best = nums[0]
        for num in nums[1:]:
            current = max(num, current + num)
            best = max(best, current)
        return best

if __name__ == "__main__":
    import sys
    nums = list(map(int, sys.stdin.readline().strip().split()))
    sol = Solution()
    print(sol.maxSubArray(nums))`,
    JAVA: `import java.util.Scanner;

class Main {
  public int maxSubArray(int[] nums) {
      int current = nums[0];
      int best = nums[0];
      for (int i = 1; i < nums.length; i++) {
          current = Math.max(nums[i], current + nums[i]);
          best = Math.max(best, current);
      }
      return best;
  }

  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      String[] parts = scanner.nextLine().trim().split("\\\\s+");
      int[] nums = new int[parts.length];
      for (int i = 0; i < parts.length; i++) {
          nums[i] = Integer.parseInt(parts[i]);
      }
      Main main = new Main();
      System.out.println(main.maxSubArray(nums));
      scanner.close();
  }
}`,
  },
};

const SAMPLE_PROBLEMS = [
  twoSumProblem,
  sampleStringProblem,
  sampleDPProblem,
  maximumSubarrayProblem,
];

async function main() {
  const user = await prisma.user.findFirst({
    orderBy: { createdAt: "asc" },
  });

  if (!user) {
    throw new Error(
      "No user found. Sign in to the app once, then run the seed again.",
    );
  }

  for (const problem of SAMPLE_PROBLEMS) {
    const existing = await prisma.problem.findFirst({
      where: { title: problem.title },
    });

    if (existing) {
      console.log(`Skipping existing problem: ${problem.title}`);
      continue;
    }

    await prisma.problem.create({
      data: {
        title: problem.title,
        description: problem.description,
        difficulty: problem.difficulty as "EASY" | "MEDIUM" | "HARD",
        tags: problem.tags,
        examples: problem.examples,
        constraints: problem.constraints,
        hints: problem.hints,
        editorial: problem.editorial,
        testCases: problem.testCases,
        codeSnippets: problem.codeSnippets,
        referenceSolutions: problem.referenceSolutions,
        userId: user.id,
      },
    });

    console.log(`Created problem: ${problem.title}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
