const React = require('react') // eslint-disable-line no-unused-vars
    , ReactAutosuggest = require('react-autosuggest')
    , classnames = require('classnames')
    , {withRebass, Input, Block, List} = require('rebass')

const Autosuggest = (
  { baseRef
  , className
  , style
  , subComponentStyles
  , ...props
  }) => {

  const cx = classnames('Autosuggest', className)

  const {
    ...rootStyle
  } = style

  const sx =
    { root: { ...rootStyle }
    }

  return (
    <div
      className={cx}
      style={sx.root}
    >
      <ReactAutosuggest
        ref={autosuggest => baseRef(autosuggest ? autosuggest.input : null)}
        inputComponent={
          props => (
            <Input
              {...props}
              baseRef={baseRef}
              subComponentStyles={subComponentStyles}
            />
          )
        }
        renderSuggestionsContainer={
          ({children, ...props}) => (
            <Block
              {...props}
              subComponentStyles={subComponentStyles}
            >
              <List
                children={children}
                subComponentStyles={subComponentStyles}
              />
            </Block>
          )
        }
        {...props}
      />
    </div>
  )
}

Autosuggest._name = 'Autosuggest'

module.exports = withRebass(Autosuggest)
