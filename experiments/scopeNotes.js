let something = "outside the function";

function thing() {
  let something = "outside the if statement";
  if (true) {
    let something = "inside the if statement";
    console.log(something);
  }
  console.log(something);
}
console.log(something);

// scope - things can get inside the 'walls' of the block, but the walls won't let anything out.

// once the block has finished executing, the stuff inside it is gone.

// very important key is whether you use let to reassign a value to a variable (ie where it was declared).
// This is a good reason not to name variables with a name you've already used elsewhere.
