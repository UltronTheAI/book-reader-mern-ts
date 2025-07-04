// type annotations

let x: number;
let y = 5;
let z: number = 5;

x = y;

//  This is wrong:
// x = y: number; //  Syntax error: unexpected ":"


x = y as number;    //trust me its number type

// x = y as string;    //trust me its string type wrong 