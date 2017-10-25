/* global describe it */
var assert = require('assert')
var { Timeline, TimeAction } = require( '../lib/timeline.js' )

describe( 'time_action', ()=>{
  var greet = greeting => greeting + " World!!!"

  let say_hi_action  = new TimeAction(greet, ["Hi"], "hi")
  let say_hello_action  = new TimeAction(greet, ["Hello"], "hello")

  it( 'should be named properly', ()=> {
      assert.equal(say_hi_action.toString(), "TimeAction:(hi)")
      assert.equal(say_hello_action.toString(), "TimeAction:(hello)")
  })

  it( 'should return greeting on trigger', ()=> {
      assert.equal(say_hi_action.trigger(), "Hi World!!!")
      assert.equal(say_hello_action.trigger(), "Hello World!!!")
  })
})
