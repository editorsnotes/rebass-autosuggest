const React = require('react') // eslint-disable-line no-unused-vars
    , test = require('tape')
    , {shallow} = require('enzyme')
    , FocusableInput = require('../FocusableInput')

test('has a focus method', t => {
  const wrapper = shallow(<FocusableInput name="t" label="t" />)
      , instance = wrapper.instance()
  t.plan(2)
  t.notEqual(instance.focus, undefined)
  t.equal(typeof instance.focus, 'function')
})

