const Bootcamp=require('../models/Bootcamp')
const ErrorResponse =require('../utils/errorResponse')
const asyncHandler=require('../middleware/async')

//@desc    get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps =asyncHandler(async (req,res,next) =>{


     const bootcamps= await Bootcamp.find();
     res.status(200).json({success: true,count: bootcamps.length,data: bootcamps});

 })



//@desc     get single bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp =asyncHandler(async (req,res,next) =>{
    
       const bootcamp= await Bootcamp.findById(req.params.id);
       res.status(200).json({success: true,data: bootcamp});

        //in case there is tinker with the id
       if(!bootcamp)
       {
          return  next(new ErrorResponse(`Bootcamp was not found with id of ${req.params.id}`,404))
       }  
})

//@desc     Create new Bootcamp
//@route    POST /api/v1/bootcamps
//@access   Public
exports.createBootcamp =asyncHandler(async (req,res,next) =>{   
    //every mongoose method returns a promise
  
        const bootcamp=await Bootcamp.create(req.body);

        res.status(201).json({
            success: true,
            data: bootcamp
        });
 
})

//@desc     update Bootcamp
//@route    PUT /api/v1/bootcamps/:id
//@access   Public
exports.updateBootcamp =asyncHandler(async (req,res,next) =>{
  
       const bootcamp= await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true
        });     
       if(!bootcamp)
       {
        return  next(new ErrorResponse(`Bootcamp was not found with id of ${req.params.id}`,404))
       }

       res.status(200).json({success: true,data: bootcamp});
   
})


//@desc     Delete Bootcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access   Public
exports.deleteBootcamp =asyncHandler(async (req,res,next) =>{
  
        const bootcamp= await Bootcamp.findByIdAndDelete(req.params.id);     
       if(!bootcamp)
       {  
           return  next(new ErrorResponse(`Bootcamp was not found with id of ${req.params.id}`,404))
       }

       res.status(200).json({success: true,data: {}});
})

