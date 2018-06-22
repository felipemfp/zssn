import React from 'react'
import { Form } from 'semantic-ui-react'

const genderOptions = [
  { key: 'm', text: 'Male', value: 'M' },
  { key: 'f', text: 'Female', value: 'F' },
]

export default (props) => (
  <Form size="large">
    <Form.Input label="Name" placeholder="Name" value={props.name} onChange={props.onNameChange} />
    <Form.Input label="Age" placeholder="Age" type="number" value={props.age} onChange={props.onAgeChange} />
    <Form.Field control={Form.Select} options={genderOptions} label="Gender" placeholder="Gender" value={props.gender} onChange={props.onGenderChange} />
  </Form>
)
