import cf from "./../index";
// import DosFileSystem from '../src/dos-file-system'

// const DosFileSystem = require('./../src/dos-file-system')

test("_if", () => {
  const str = _if(true)
    .then(() => "abc")
    .else(() => "123");

  expect(str).toBe("abc");
});

test("_asyncIf", async (done) => {
  const str = await _asyncIf(true)
    .then(async () => Promise.resolve("abc"))
    .else(async () => Promise.resolve("123"));

  expect(str).toBe("abc");

  done();
});

test("_switch", () => {
  const str1 = _switch(1)
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

  const str2 = _switch(99)
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

test("_try", () => {
  const str = _try(() => {
    throw "aaa";
  }).catch((e) => "ok");

  expect(str).toBe("ok");
});

test("_asyncTry", async (done) => {
  const str = await _asyncTry(async () => {
    throw "aaa";
  }).catch(async (e) => Promise.resolve("ok"));

  console.log(str);
  expect(str).toBe("ok");

  done();
});
