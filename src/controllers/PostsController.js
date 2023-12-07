const PostsService = require('../services/PostsService')


const createPosts = async(req, res) =>{
    try{
        
        const {title,image , description, preview} = req.body
       
        if(!title || !image || !description || !preview  ){
            return res.status(200).json({
                status: "ERR",
                message: 'The input is required'
            })
        }
       const response = await PostsService.createPosts(req.body)
       return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}



const deletePosts = async(req, res) =>{
    try{
      const postsId = req.params.id 
   
      if(!postsId){
        return res.status(200).json({
            status: 'ERR',
            message: 'The postsId is required'
        })
      }
  
      const response = await PostsService.deletePosts(postsId)
      return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const deleteMany = async(req, res) =>{
    try{
      const ids = req.body.ids
     
      if(!ids){
        return res.status(200).json({
            status: 'ERR',
            message: 'The ids is required'
        })
      }
      const response = await PostsService.deleteManyPosts(ids)
      return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}


const getAllPosts = async(req, res) =>{
    try{
        const { limit, page, sort, filter } = req.query
      const response = await PostsService.getAllPosts(Number(limit) || null, Number(page) || 0, sort, filter)
      return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}


const getDetailsPosts = async(req, res) =>{
    try{
      const postsId = req.params.id 
      
      if(!postsId){
        return res.status(200).json({
            status: 'ERR',
            message: 'The userID is required'
        })
      }
    
      const response = await PostsService.getDetailsPosts(postsId)
      return res.status(200).json(response)
    }
    catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
module.exports ={
   createPosts,
   getDetailsPosts,
   deletePosts,
   getAllPosts,
   deleteMany,
   
}