/**
 * 🎨 Holi Color Mixer - Pure Functions
 *
 * Holi ka festival hai! Rang mix karne hain. Lekin PURE FUNCTIONS use
 * karne hain — matlab:
 *   1. Input ko KABHI modify mat karo (no mutation)
 *   2. Same input pe HAMESHA same output aaye
 *   3. Koi side effects nahi (no console.log, no external state changes)
 *
 * Har color object: { name: string, r: number, g: number, b: number }
 *   where r, g, b are 0-255 (RGB values)
 *
 * Functions:
 *
 *   1. mixColors(color1, color2)
 *      - Mix two colors by averaging their RGB values
 *      - New name: `${color1.name}-${color2.name}`
 *      - Round RGB values to integers
 *      - MUST NOT modify color1 or color2
 *      - Agar either color null/invalid, return null
 *
 *   2. adjustBrightness(color, factor)
 *      - Multiply each RGB by factor, clamp to 0-255 range
 *      - Round to integers using Math.round
 *      - Name stays same
 *      - MUST NOT modify original color
 *      - Agar color null or factor not number, return null
 *
 *   3. addToPalette(palette, color)
 *      - Return NEW array with color added at end
 *      - MUST NOT modify original palette array
 *      - Agar palette not array, return [color]
 *      - Agar color null/invalid, return copy of palette
 *
 *   4. removeFromPalette(palette, colorName)
 *      - Return NEW array without the color with that name
 *      - MUST NOT modify original palette
 *      - Agar palette not array, return []
 *
 *   5. mergePalettes(palette1, palette2)
 *      - Merge two palettes into NEW array
 *      - No duplicate names (keep first occurrence)
 *      - MUST NOT modify either original palette
 *      - Agar either not array, treat as empty array
 *
 * Hint: Use spread operator [...arr], Object spread {...obj} to create
 *   copies. NEVER use push, splice, or direct property assignment on inputs.
 *
 * @example
 *   const red = { name: "red", r: 255, g: 0, b: 0 };
 *   const blue = { name: "blue", r: 0, g: 0, b: 255 };
 *   mixColors(red, blue)
 *   // => { name: "red-blue", r: 128, g: 0, b: 128 }
 *   // red and blue objects are UNCHANGED
 */
export function mixColors(color1, color2) {
  if(color1 === null || typeof color1 != 'object' || color2 === null || typeof color2 != 'object'){
    return null;
  }

 const newColor1 = {...color1};  //deep copy which means newColor1 ke change hone par color1 change nahi hoga kyuki reference alag alag hai
 const newColor2 = {...color2};

 const newName = `${newColor1.name}-${newColor2.name}`; 
 const newR = Math.round((newColor1.r + newColor2.r) /2 );
 const newG = Math.round((newColor1.g + newColor2.g)/2);
 const newB = Math.round((newColor1.b + newColor2.b)/2);

 const mixedColor = {name:newName,r: newR,g: newG,b: newB};
 return mixedColor;
}

export function adjustBrightness(color, factor) {
  if(color === null || typeof factor !== 'number')
  {
   return null;
  }

  const newColor = {...color};

  let rValue = Math.round( newColor.r * factor );
  rValue = rValue<0 ? 0 : rValue > 255 ? 255 : rValue; //clamping

  let gValue = Math.round( newColor.g * factor );
  gValue = gValue<0 ? 0 : gValue > 255 ? 255 : gValue; //clamping

  let bValue = Math.round( newColor.b * factor );
  bValue = bValue<0 ? 0 : bValue > 255 ? 255 : bValue; //clamping

  const obj = {name: newColor.name, r: rValue, g: gValue, b: bValue};
  return obj;
}

export function addToPalette(palette, color) {
  if(!Array.isArray(palette))
  {
    return [color];
  }

  if(color === null || typeof color !== 'object')
  {
    return [...palette];
  }

  return [...palette,color];
}

export function removeFromPalette(palette, colorName) {
  if(!Array.isArray(palette)){
    return [];
  }

  const newarray = [...palette];

  const indexToRemove = newarray.findIndex((o)=> o.name === colorName);
  
  if(indexToRemove > -1)  //if element found
  {
  newarray.splice(indexToRemove,1); //1 means remove 1 element
  }

  return newarray;
}

/*
export function removeFromPalette(palette, colorName) {
  if(!Array.isArray(palette)){
    return [];
  }

  const newarray = [...palette];

  const indexToRemove = newarray.findIndex((o)=> o.name == colorName);
  
  if(indexToRemove > -1)  //if element found
  {
  newarray[indexToRemove] = [];
  }

  return newarray.flat();
}
*/

export function mergePalettes(palette1, palette2) {
  let array1,array2;
  
  array1 = Array.isArray(palette1) ? [...palette1] : [];
  array2 = Array.isArray(palette2) ? [...palette2] : [];
  
  const merged = array1.concat(array2); //concat() does not mutate original arrays 
  
  for(let i=0; i<merged.length;i++)
  {
    for(let j=i+1; j<merged.length; j++)
    {
      if(merged[i].name === merged[j].name) //or instead can use object comparison i.e. JSON.stringify(merged[i]) === JSON.stringify(merged[j])
      {
        merged.splice(j,1); //at j index 1 item removed because we want only the first occurrence i
      }

    }
  }
  
  return merged;
}
