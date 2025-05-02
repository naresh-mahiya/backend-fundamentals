const notFound=(req,res,next)=>{
    const err=new Error('Route does not found')
    err.status=400;
    next(err);
   
} 


module.exports=notFound ;