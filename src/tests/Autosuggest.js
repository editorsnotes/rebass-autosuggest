const React = require('react') // eslint-disable-line no-unused-vars
    , test = require('tape')
    , {shallow, mount} = require('enzyme')
    , {isDOMComponent} = require('react-addons-test-utils')
    , Autosuggest = require('../Autosuggest')

const props =
  { suggestions: [{text: 'A'}, {text: 'B'}, {text: 'C'}]
  , onSuggestionsFetchRequested: ()=>{}
  , onSuggestionsClearRequested: ()=>{}
  , getSuggestionValue: suggestion => suggestion.text
  , renderSuggestion: suggestion => suggestion.text
  , inputProps: {value: '', onChange: ()=>{}}
  }

require('jsdom-global')()

test('is a div', t => {
  const wrapper = shallow(<Autosuggest {...props} />)
      , inner = wrapper.first().shallow()
  t.plan(1)
  t.ok(inner.is('div'))
})

test('has a className', t => {
  const wrapper = shallow(<Autosuggest {...props} />)
      , inner = wrapper.first().shallow()
  t.plan(1)
  t.equal(inner.props().className, 'Autosuggest')
})

test('accepts custom className props', t => {
  const wrapper = shallow(<Autosuggest {...props}  className="foo" />)
      , inner = wrapper.first().shallow()
  t.plan(1)
  t.equal(inner.props().className, 'Autosuggest foo')
})

test('accepts custom styles',t => {
  const wrapper = shallow(<Autosuggest {...props} style={{margin: 12}} />)
      , inner = wrapper.first().shallow()
  t.plan(1)
  t.equal(inner.props().style.margin, 12)
})

test('context styles override default styles', t => {
  const wrapper = shallow(
    <Autosuggest {...props} />,
    {context: {rebass: {Autosuggest: {marginLeft: 24}}}}
  )
      , inner = wrapper.first().shallow()
  t.plan(1)
  t.equal(inner.props().style.marginLeft, 24)
})

test('style props override context styles', t => {
  const wrapper = shallow(
    <Autosuggest {...props} m={0} style={{margin: 12}} />,
    {context: {rebass: {Input: {margin: 24}}}}
  )
      , inner = wrapper.first().shallow()
  t.plan(1)
  t.equal(inner.props().style.margin, 12)
})

test('baseRef returns the input element', t => {
  let input
  mount(<Autosuggest {...props} baseRef={r => { input = r }} />)
  t.plan(2)
  t.notEqual(input, undefined)
  t.ok(isDOMComponent(input))
})

