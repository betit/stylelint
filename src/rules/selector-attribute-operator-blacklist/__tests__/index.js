import { testRule } from "../../../testUtils"
import rules from "../../../rules"
import { ruleName, messages } from ".."

const rule = rules[ruleName]

testRule(rule, {
  ruleName,

  config: [[
    "*=",
    "~=",
  ]],

  accept: [ {
    code: "a[target] { }",
  }, {
    code: "a[target=\"_blank\"] { }",
  }, {
    code: "[class|=\"top\"] { }",
  }, {
    code: "[class^=top] { }",
  }, {
    code: "[class$=\"test\"] { }",
  } ],

  reject: [ {
    code: "[title~=\"flower\"] { }",
    message: messages.rejected("~="),
    line: 1,
    column: 7,
  }, {
    code: "[ title~=\"flower\" ] { }",
    message: messages.rejected("~="),
    line: 1,
    column: 8,
  }, {
    code: "[title ~= \"flower\"] { }",
    message: messages.rejected("~="),
    line: 1,
    column: 8,
  }, {
    code: "[class*=te] { }",
    message: messages.rejected("*="),
    line: 1,
    column: 7,
  } ],
})
