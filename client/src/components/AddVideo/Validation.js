
function Validation(values) {
   
   let errors = {};
   
   if(!values.title){
       errors.title = "Please Enter Title";
   }
    if(!values.url){
      errors.url = "Please Enter url";
   }

return errors;
}



export default Validation
