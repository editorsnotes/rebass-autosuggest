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

  const {scale, zIndex, colors, borderColor, borderRadius, fontSizes} = theme

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
      , marginLeft: (paddingLeft || padding || 0)
      , marginTop: -(paddingBottom || padding || 0)
      , left: 0
      , right: 'auto'
      , top: '100%'
      , bottom: 'auto'
      , zIndex: zIndex[1]
      , borderWidth: 1
      , borderColor
      , borderStyle: props.multiSection ? 'none solid solid' : 'solid'
      , borderBottomRightRadius: borderRadius
      , borderBottomLeftRadius: borderRadius
      , backgroundColor: colors.white
      , ...subComponentStyles.suggestionsContainer
      }
    , sectionContainer:
      { ...subComponentStyles.sectionContainer
      }
    , sectionTitle:
      { borderTopWidth: 1
      , borderTopStyle: 'dashed'
      , borderColor
      , paddingLeft: scale[1]
      , paddingRight: scale[1]
      , lineHeight: 2
      , fontSize: fontSizes[6]
      , color: colors.secondary
      , ...subComponentStyles.sectionTitle
      }
    , suggestionsList:
      { listStyle: 'none'
      , margin: 0
      , padding: 0
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
        renderSuggestionsContainer={
          ({children, style, ...props}) => (
            <div
              style={
                { ...style
                , borderStyle: children == null ? 'none' : style.borderStyle
                }
              }
              {...props}
            >
              {children}
            </div>
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
