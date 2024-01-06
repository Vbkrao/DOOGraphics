import assert from "node:assert";
import test from "node:test";

import { app } from "../app";

async function init(){
  let req = await fetch("http://127.0.0.1:4000/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: "test", content: "test" }),
  });
  let res = await req.json() as {title: string, _id: string};

  return {
    id: res._id,
    title: res.title
  }
}

test("intergration tests", async (t) => {
  let {id, title} = await init();

  await t.test("test 2 - Get note by id", async (t) => {
    let req = await fetch(`http://127.0.0.1:4000/notes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let res = await req.json() as {title: string};
    assert.equal(res.title, title);
  });

  await t.test("test 3 - delete note by id", async (t) => {
    let req = await fetch(`http://127.0.0.1:4000/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let res = await req.json() as {title: string};
    assert.equal(res.title, title);
  });
});
