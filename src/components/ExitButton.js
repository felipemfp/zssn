import { withRouter } from 'react-router-dom'

const ExitButton = withRouter(({history, onClick, render}) => {
  const onClickWithRedirect = () => {
    onClick()
    history.push('/')
  }

  return render(onClickWithRedirect)
})

export default ExitButton
