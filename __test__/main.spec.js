import cf from "./../index";
// import DosFileSystem from '../src/dos-file-system'

// const DosFileSystem = require('./../src/dos-file-system')

test("_if", () => {
  const str = cf
    ._if(true)
    .then(() => "abc")
    .else(() => "123");

  expect(str).toBe("abc");
});

test("_switch", () => {
  const str1 = cf
    ._switch(1)
    .case(1)
    .then(() => "a")
    .case(2)
    .then(() => "b")
    .case(3)
    .then(() => "c")
    .case(4)
    .then(() => "e")
    .case(5)
    .then(() => "f")
    .default(() => "z");

  expect(str1).toBe("a");

  const str2 = cf
    ._switch(99)
    .case(1)
    .then(() => "a")
    .case(2)
    .then(() => "b")
    .case(3)
    .then(() => "c")
    .case(4)
    .then(() => "e")
    .case(5)
    .then(() => "f")
    .default(() => "z");

  expect(str2).toBe("z");
});
