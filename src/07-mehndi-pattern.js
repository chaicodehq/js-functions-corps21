/**
 * 🎨 Mehndi Pattern Maker - Recursion
 *
 * Mehndi artist hai tu! Intricate patterns banane hain using RECURSION.
 * Yahan loops use karna MANA hai — sirf function khud ko call karega
 * (recursive calls). Har function mein base case aur recursive case hoga.
 *
 * Functions:
 *
 *   1. repeatChar(char, n)
 *      - Repeat char n times using recursion (NO loops, NO .repeat())
 *      - Base case: n <= 0 => return ""
 *      - Recursive: char + repeatChar(char, n - 1)
 *      - Agar char not a string or empty, return ""
 *
 *   2. sumNestedArray(arr)
 *      - Sum all numbers in an arbitrarily nested array
 *      - e.g., [1, [2, [3, 4]], 5] => 15
 *      - Skip non-number values
 *      - Base case: empty array => 0
 *      - Agar input not array, return 0
 *
 *   3. flattenArray(arr)
 *      - Flatten an arbitrarily nested array into a single flat array
 *      - e.g., [1, [2, [3, 4]], 5] => [1, 2, 3, 4, 5]
 *      - Agar input not array, return []
 *
 *   4. isPalindrome(str)
 *      - Check if string is palindrome using recursion
 *      - Case-insensitive comparison
 *      - Base case: string length <= 1 => true
 *      - Compare first and last chars, recurse on middle
 *      - Agar input not string, return false
 *
 *   5. generatePattern(n)
 *      - Generate symmetric mehndi border pattern
 *      - n = 1 => ["*"]
 *      - n = 2 => ["*", "**", "*"]
 *      - n = 3 => ["*", "**", "***", "**", "*"]
 *      - Pattern goes from 1 star up to n stars, then back down to 1
 *      - Use recursion to build the ascending part, then mirror it
 *      - Agar n <= 0, return []
 *      - Agar n is not a positive integer, return []
 *
 * Hint: Every recursive function needs a BASE CASE (when to stop) and a
 *   RECURSIVE CASE (calling itself with a smaller/simpler input).
 *
 * @example
 *   repeatChar("*", 4)        // => "****"
 *   sumNestedArray([1, [2, [3]]]) // => 6
 *   flattenArray([1, [2, [3]]]) // => [1, 2, 3]
 *   isPalindrome("madam")     // => true
 *   generatePattern(3)        // => ["*", "**", "***", "**", "*"]
 */
export function repeatChar(char, n) {
  // Your code here
  if (typeof char !== "string" || char === "") return ""
  if (n <= 0) return ""
  return char + repeatChar(char, n - 1)
}

export function sumNestedArray(arr) {
  // Your code here
  let sum = 0
  if (!Array.isArray(arr)) return 0;

  function helper(arr) {
    if (arr.length === 0) return sum;
    let newArr = []

    arr.forEach(element => {
      if (Array.isArray(element)) newArr = element
      else if (typeof element === "number" && !Number.isNaN(element)) sum += element
    });

    return helper(newArr)
  }

  return helper(arr)
}

export function flattenArray(arr) {
  const result = []
  if (!Array.isArray(arr)) return [];

  function helper(arr) {
    arr.forEach((element) => {
      if(Array.isArray(element)) {
        helper(element)
      }else result.push(element)
    })
  }

  helper(arr);

  return result;
}

export function isPalindrome(str) {
  // Your code here
  if (typeof str !== "string") return false
  
  function helper(str, start = 0, end = str.length - 1) {
    if (str[start] !== str[end]) return false
    if (start > end) return true
    return helper(str, start + 1, end - 1)
  }

  return helper(str.toLowerCase());
}

export function generatePattern(n) {
  // Your code here
  if(typeof n !== "number" || Number.isNaN(n) || !Number.isInteger(n) || n <= 0 ) return []
  const result = []
  
  function helper(count, max, str) {
    if(count === max) return;
    
    result.push(`${str}*`);
    helper(count + 1, n, `${str}*`)
    if(str !== "")result.push(str)
  }

  helper(0, n, "")

  return result
}
