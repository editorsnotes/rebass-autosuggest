Pass any props taken by either the `rebass` [Input](https://rebass-beta.now.sh/components/Input) component or the `react-autosuggest` [Autosuggest](https://github.com/moroshko/react-autosuggest#props) component:

```
<Autosuggest
  p={1}
  style={{border: '1px solid red'}}
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


```
