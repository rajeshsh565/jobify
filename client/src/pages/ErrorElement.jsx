import { useRouteError } from "react-router-dom"

const ErrorElement = () => {
    const error = useRouteError();
  if(error.status!==404){
    return <h4>There an error of some sorts!</h4>
  }
}
export default ErrorElement