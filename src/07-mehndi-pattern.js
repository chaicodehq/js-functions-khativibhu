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
export function repeatChar(char, n) {     //n dependent recursion. Here, recursion is dependent only on one parameter n. Sirf n ke change hone par recursion work kar raha hai.
  /*
  if(char.length === n) //base case
  {
    return char;
  }
  */
  
  if(typeof char !== 'string' || char.trim().length == 0) //validation
  {
    return "";
  }

  //base case
  if(n <= 0)
  {
    return "";
  }

  //recursive case
  return char + repeatChar(char,n-1); 
}


//less memory efficient as ... rest operator creates a new array , every call
export function sumNestedArray(arr) {
  if(!Array.isArray(arr))
  {
    return 0;
  }

  if(arr.length === 0)  //base case (terminating case)
  {
    return 0;
  }
  
  const [head,...tail] = arr;  //head is first element and tail is array of the rest elements
  
  let currentValue = 0;  
  
    if(Array.isArray(head))
    {
      currentValue = sumNestedArray(head);
    }
    else if(typeof head === 'number' )
    {
      currentValue = head;
    }
    
    //if non-numbers , then currentValue = 0

  return currentValue + sumNestedArray(tail) ; 
}


/*
export function sumNestedArray(arr) {
  if(!Array.isArray(arr))
  {
    return 0;
  }

  if(arr.length === 0)  //base case (terminating case)
  {
    return 0;
  }
  
  let sum=0;

  for(let i=0;i<arr.length;i++)
  {
    if(Array.isArray(arr[i]))
    {
      sum = sum + sumNestedArray(arr[i]);
      continue; //skip
    }
    else if(typeof arr[i] !== 'number' )
    {
      continue; //skip non-number values
    }

    sum = sum + arr[i]; 
  }
  
  return sum;
}
  */

//more memory costlier code as ... rest operator. So, code can cause Call Stack Overflow

export function flattenArray(arr) {
  if(!Array.isArray(arr)) //base case
  {
    return [];
  }

  if(arr.length === 0)  //base case
  {
    return [];
  }
  
  const [head,...tail] = arr;  //destructuring step

  let newarray = [];

  if(Array.isArray(head))
  {
      newarray = flattenArray(head);
  }
  else if(typeof head === 'number' || typeof head === 'string')
  {  
    newarray = [head];   //Wrap single number or single string in array for merging
  }  

  //if non-numbers and non-strings, then newarray = []

  return [...newarray,...flattenArray(tail)];  // Combine the flattened head with the flattened tail
}

/*
export function flattenArray(arr) {
  if(!Array.isArray(arr))
  {
    return [];
  }
  
  let newarray = [];

  for(let i=0;i<arr.length; i++)
  {
    if(Array.isArray(arr[i]))
    {
      newarray.push( ...flattenArray(arr[i]) );
      continue;
    }

    newarray.push(arr[i]);
  }

  return newarray;
}
  */

export function isPalindrome(str) {
  if(typeof str !== 'string'){
    return false;
  }

  if(str.length <= 1)
    {
      return true;
    } 

  
  const left = str.charAt(0).toLowerCase();
  const leftIndex = str.indexOf(left);
  const right = str.charAt(str.length - 1).toLowerCase();
  const rightIndex = str.indexOf(right);
  
  const booleanAns = isPalindrome( str.slice(leftIndex+1,rightIndex) );
  
  return booleanAns && left == right;   //compare left and right chars on middle when leftIndex >= rightIndex
}


export function generatePattern(n) {
  if(typeof n !== 'number' || isNaN(n) || !Number.isInteger(n) || n<=0)  //validation
  {
   return [];
  }

  if(n==1)   //base case
  {
    return ["*"];  //when inside this base case, below code does not runs
  }
  
  
  //recursive case
  const smallerPatternArray = generatePattern(n-1);  //repeatedly calling itself untill call hits base case n==1
   
  const starValue = "*".repeat(n); //current row of stars
   
  const middleIndex = Math.floor(smallerPatternArray.length /2);

 const leftSide = smallerPatternArray.slice(0,middleIndex+1);
 const rightSide = smallerPatternArray.slice(middleIndex);

  return [...leftSide,starValue,...rightSide];

}
