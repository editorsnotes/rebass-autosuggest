const React = require('react') // eslint-disable-line no-unused-vars
    , {render} = require('react-dom')
    , {Input} = require('rebass')
    , Autosuggest = require('./Autosuggest')

const snacks =
  [ {label: 'Apple', category: 'Healthy'}
  , {label: 'Banana', category: 'Healthy'}
  , {label: 'Blueberries', category: 'Healthy'}
  , {label: 'Carrot', category: 'Healthy'}
  , {label: 'Almond Joy', category: 'Unhealthy'}
  , {label: 'Beer Nuts', category: 'Unhealthy'}
  , {label: 'Butterfinger', category: 'Unhealthy'}
  , {label: 'Cheetos', category: 'Unhealthy'}
  ]

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase()
      , inputLength = inputValue.length

  return inputLength === 0 ? [] : snacks.filter(snack =>
    snack.label.toLowerCase().slice(0, inputLength) === inputValue
  )
}

const categorize = suggestions => {
  const categorized = suggestions
    .reduce(
      (categorized, suggestion) => (
        { ...categorized
        , [suggestion.category]:
            [...categorized[suggestion.category], suggestion]
        }
      ), {Healthy: [], Unhealthy: []}
    )
  return Object.keys(categorized).map(
    category => ({category: category, suggestions: categorized[category]})
  )
}

const App = React.createClass(
  { getInitialState: function() {
      return {value: 'b', suggestions: getSuggestions('b')}
    }

  , render: function() {
      return (
        <div>
          <Input
            p={1}
            style={{border: '1px solid red'}}
            name="snack"
            label="Snack"
            value={this.state.value}
            onChange={()=>{}}
          />
          <Autosuggest
            p={1}
            style={
              { border: '1px solid red'
              , suggestionsContainer: {borderStyle: 'solid'}
              }
            }
            name="snack"
            label="Snack"
            suggestions={this.state.suggestions}
            onSuggestionsFetchRequested={({value}) => {
              this.setState({suggestions: getSuggestions(value)})
            }}
            onSuggestionsClearRequested={() => {
              this.setState({suggestions: []})
            }}
            getSuggestionValue={suggestion => suggestion.label}
            renderSuggestion={suggestion => suggestion.label}
            inputProps={
              { value: this.state.value
              , onChange: (e, {newValue}) => {
                  this.setState({value: newValue})
                }
              }
            }
          />
          <Input
            p={1}
            style={{border: '1px solid red'}}
            name="snack"
            label="Snack"
            hideLabel={true}
            value={this.state.value}
            onChange={()=>{}}
          />
          <Autosuggest
            p={1}
            style={{border: '1px solid red'}}
            name="snack"
            label="Snack"
            hideLabel={true}
            suggestions={this.state.suggestions}
            onSuggestionsFetchRequested={({value}) => {
              this.setState({suggestions: categorize(getSuggestions(value))})
            }}
            onSuggestionsClearRequested={() => {
              this.setState({suggestions: []})
            }}
            getSuggestionValue={suggestion => suggestion.label}
            renderSuggestion={suggestion => suggestion.label}
            inputProps={
              { value: this.state.value
              , onChange: (e, {newValue}) => {
                  this.setState({value: newValue})
                }
              }
            }
            multiSection={true}
            renderSectionTitle={section => section.category}
            getSectionSuggestions={section => section.suggestions}
          />
        </div>
      )
    }
  }
)

const mount = document.createElement('div')
document.body.appendChild(mount)

render(<App/>, mount)
