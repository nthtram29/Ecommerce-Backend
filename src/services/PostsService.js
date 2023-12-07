const Posts = require('../models/PostsModel')
// const bcrypt = require("bcrypt")


const createPosts = (newPosts) =>{
    return new Promise(async (resolve, reject)=>{
        const {title,image , description, preview} = newPosts
        
        try{

            const checkPosts = await Posts.findOne({
                title: title
            })
            if(checkPosts !== null){
                resolve({
                    status: 'OK',
                    message: 'The title of posts is already'
                })
            }
            
            const newPosts = await Posts.create({
                title,
                image , 
                description, 
                preview
            })
            if(newPosts){
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newPosts
                })
            }
        }
        catch(e){
            reject(e)
        }
    })
}


const deletePosts = (id) => {
    return new Promise(async (resolve, reject)=>{
        try{
            const checkPosts = await Posts.findOne({
                _id: id
            })
            if(checkPosts === null){
                resolve({
                    status: 'ERR',
                    message: 'The posts is not defined'
                })
            }

            await Posts.findByIdAndDelete(id)
                resolve({
                    status: 'OK',
                    message: 'Delete posts success'
                })
        } catch(e){
            reject(e)
        }

    })
}

const deleteManyPosts = (ids) => {
    return new Promise(async (resolve, reject)=>{
        try{
          await Posts.deleteMany({
                _id: ids
            })
                resolve({
                    status: 'OK',
                    message: 'Delete posts success'
                })
        } catch(e){
            reject(e)
        }

    })
}

const getAllPosts = (limit , page, sort , filter) => {
    
    return new Promise(async (resolve, reject)=>{
        try{
            const totalPosts = await Posts.count()
            let allPosts = []
            if(filter){
                const label = filter[0];
                const allObjectFilter = await Posts.find({ [label]: {'$regex': filter[1]}})
                // const allObjectFilter = await Posts.find({ [label]: {'$regex': filter[1]}}).limit(limit).skip(page * limit)
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: allObjectFilter,
                    total: totalPosts,
                    pageCurrent: Number(page + 1 ),
                    totalPage: Math.ceil(totalPosts / limit)
                })
            }   
            if(sort){
                const objectSort ={}
                objectSort[sort[1]] = sort[0]
                const allPostsSort = await Posts.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: allPostsSort,
                    total: totalPosts,
                    pageCurrent: Number(page + 1 ),
                    totalPage: Math.ceil(totalPosts / limit)
                })
            }
            if(!limit){
                allPosts = await Posts.find().sort({createdAt: -1, updatedAt: -1})
            }else{
                allPosts = await Posts.find().sort({createdAt: -1, updatedAt: -1}).limit(limit).skip(page * limit)
            }
             
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: allPosts,
                    total: totalPosts,
                    pageCurrent: Number(page + 1 ),
                    totalPage: Math.ceil(totalPosts / limit)
                })
        } catch(e){
            reject(e)
        }

    })
}



const getDetailsPosts = (id) => {
    return new Promise(async (resolve, reject)=>{
        try{
            const posts = await Posts.findOne({
                _id: id
            })
            if(posts === null){
                resolve({
                    status: 'OK',
                    message: 'The posts is not defined'
                })
            }

            
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: posts
                })
        } catch(e){
            reject(e)
        }

    })
}
module.exports = {
 createPosts,
 getDetailsPosts,
 deletePosts,
 getAllPosts,
 deleteManyPosts,

}
