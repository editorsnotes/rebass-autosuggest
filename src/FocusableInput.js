const React = require('react') // eslint-disable-line no-unused-vars
    , {Input} = require('rebass')

const FocusableInput = React.createClass(
  { focus: function() {
      this.input.focus

    }
  , storeInputReference: function(input) {
      this.input = input
    }
  , render: function() {
      const {baseRef, ...props} = this.props
      return (
        <Input
          baseRef={input => {
            this.storeInputReference(input)
            if (baseRef) { baseRef(input) }
          }}
          {...props}
        />
      )
    }
  }
)

module.exports = FocusableInput
