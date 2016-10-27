const React = require('react') // eslint-disable-line no-unused-vars
    , ReactAutosuggest = require('react-autosuggest')
    , classnames = require('classnames')
    , {withRebass} = require('rebass')
    , FocusableInput = require('./FocusableInput')

const Autosuggest = (
  { label
  , name
  , type
  , message
  , hideLabel
  , horizontal
  , baseRef
  , autoOff
  , className
  , style
  , theme
  , subComponentStyles
  , ...props
  }) => {

  const {scale, zIndex, colors, borderColor, borderRadius} = theme

  const cx = classnames('Autosuggest', className)

  const
    { paddingBottom
    , paddingLeft
    , padding
    , ...rootStyle
    } = style

  const sx =
    { root:
      { position: 'relative'
      , paddingBottom
      , paddingLeft
      , padding
      , marginBottom: scale[2]
      , ...rootStyle
      }
    , suggestionsContainer:
      { position: 'absolute'
      , marginLeft: paddingLeft || padding
      , marginTop: -(paddingBottom || padding)
      , left: 0
      , right: 'auto'
      , top: '100%'
      , bottom: 'auto'
      , zIndex: zIndex[1]
      , ...subComponentStyles.suggestionsContainer
      }
    , suggestionsList:
      { listStyle: 'none'
      , margin: 0
      , padding: 0
      , borderWidth: 1
      , borderStyle: 'solid'
      , borderColor
      , borderRadius
      , backgroundColor: colors.white
      , ...subComponentStyles.suggestionsList
      }
    , suggestion:
      { lineHeight: 2
      , paddingLeft: scale[1]
      , paddingRight: scale[1]
      , ...subComponentStyles.suggestion
      }
    , suggestionFocused:
      { backgroundColor: colors.muted
      , ...subComponentStyles.suggestionFocused
      }
    }

  return (
    <div
      className={cx}
      style={sx.root}
    >
      <ReactAutosuggest
        renderInputComponent={
          props => React.createElement(FocusableInput,
            { ...props
            , label
            , name
            , type
            , message
            , hideLabel
            , horizontal
            , autoOff
            , baseRef
            , mb: 0
            , subComponentStyles
            }
          )
        }
        theme={sx}
        {...props}
      />
    </div>
  )
}

Autosuggest._name = 'Autosuggest'

module.exports = withRebass(Autosuggest)
