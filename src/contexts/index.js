import React from 'react'

export const PeopleContext = React.createContext({
    people: [],
    healthy: [],
    infected: [],
    refetch: () => {}
})
