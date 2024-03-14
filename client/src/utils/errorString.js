const errorString = (error) => {
    const errStr = error?.response?.data?.msg;
    const updatedStr = errStr.split(' ').map((word)=>word.charAt(0).toUpperCase()+word.slice(1)).join(' ')
    return updatedStr;
}
export default errorString;