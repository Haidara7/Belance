const IfAuthenticated = ({ children, else:otherwise,token }) => {
    if(token){
      return children
    }else{
      return otherwise || null
    }
   }
  
   export default IfAuthenticated;