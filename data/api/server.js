const express = require('express');
const db = require('../helpers/actionModel')

const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({ sanity: 'Everything okay?'})
});

server.post('/api', (req, res) => {
    
});

server.get('/api',  (req, res) => {
    const {post} = req.params
    db.get()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json({ error: err})
    })
})

server.get('/api/:id', validateId, (req, res) => {
    // const {id} = req.params
    console.log('Check Here',req.post)
    // db.get(id)
        res.status(200).json(req.post)       
    })
    // .catch(()=>res.status(500).json({error: 'why wont it work yet lmao'}))

server.put('/api/:id', (req, res) => {
    const { id } = req.params
    const { description, notes } = req.body
    if(!description || !notes){
        return res.status(400).json({ error: 'Need name and description' })
    }
    // console.log(req.body)
    db.update(id, req.body)
        .then(post => {
            console.log(id)
            res.status(200).json(post)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: 'Something happened'})
        })
});

server.delete('/api/:id', (req, res) => {
    const { id } = req.params
    db.remove(id)
        .then(post=>{res.status(204).end()})
        .catch(()=> res.status(500).json({ error: 'oops something happened' }))
});

function validateId(req, res, next){
    const { id } = req.params
    db.get(id)
     .then(post => {
        //  console.log(post,'asdfasdf')
         if(post){
            console.log('ValidationID',id)
            req.post = post
            // console.log(post)
            next()
        
         } else {
            res.status(404).json({ error: 'Id does not exist'})
         }     
     })
     .catch(err => {
        res.status(500).json({ error: 'couldnt process'})
     })
}

module.exports = server