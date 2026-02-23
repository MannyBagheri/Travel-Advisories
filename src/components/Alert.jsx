//This is a shortcut for props.alert! 
//This way we are only extracting only what we need from props.

const Alert = ({alert}) => {

  if (!alert) return (<></>); // Render an empty fragment

  return (<>
    {`(${alert.country_code}) ${alert.country_name}`}
  </>);
};

export default Alert;