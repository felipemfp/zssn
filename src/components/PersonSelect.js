import React from 'react'
import { Dropdown, Header } from 'semantic-ui-react'

const PersonSelect = ({people, value, loading, placeholder, onChange, size}) => {
  return (
    <Dropdown
      className={size}
      placeholder={placeholder}
      fluid
      search
      selection
      loading={loading}
      options={people.map(person => ({
        key: person.id,
        text: person.name,
        value: person.id,
        content: <Header content={person.name} subheader={`${person.age} years old`} />
      }))}
      value={value}
      onChange={onChange}
    />
  )
}

export default PersonSelect
