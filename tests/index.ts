import assert from "node:assert";
import test from "node:test";

import { app } from "../app";

test("intergration tests", async (t) => {
  let req = await fetch("http://localhost:3000/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: "test", body: "test" }),
  });
  let res = await req.json() as {title: string, _id: string};
  
  let id = res._id;
  let title = res.title;

  await t.test("test 2 - Get note by id", async (t) => {
    let req = await fetch(`http://localhost:3000/notes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let res = await req.json() as {title: string};
    assert.equal(res.title, title);
  });

  await t.test("test 3 - delete note by id", async (t) => {
    let req = await fetch(`http://localhost:3000/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let res = await req.json() as {title: string};
    assert.equal(res.title, title);
  });
});
