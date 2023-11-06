//คิดค้อกับฐานข้อมูล
const slugify = require("slugify")
const Blogs = require("../models/blogModel")
const { v4: uuidv4 } = require('uuid');
//บันทึกข้อมูล
exports.create=(req,res) => { 
    const {title,content,author}=req.body
    let slug = slugify(title)

    //ตรวจสอบความถูกต้องของข้อมูล
    if(!slug)slug=uuidv4();

    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนหัวข้อ"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนข้อมูล"})
            break;
    }
    //บันทึกข้อมูล
    Blogs.create({title,content,author,slug},(err,blog) => {
        if(err){
            res.status(400).json({error:"มีข้อมูลซ้ำกัน"})
        }
        res.json(blog)
    })
}

//ดึงข้อมูลบทความทั้งหมด
exports.getAllblogs=(req,res) => {
    Blogs.find({}).exec((err,blogs) => {
        res.json(blogs)
    })
}

//ดึงข้อมูลที่สนใจอ้างอิงตาม slug

exports.singleBlog=(req,res) => {
    const {slug} = req.params
    Blogs.findOne({slug}).exec((err,blog) =>{
        res.json(blog)
    })
}

exports.remove=(req,res) => {
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).exec((err,blog) =>{
        if(err) console.log(err)
        res.json({
        message:"ลบข้อมูลเรียบร้อย"})
    })
}

exports.update=(req,res) => {
    const {slug} = req.params
    // ส่งข้อมูล => title content author
    const {title,content,author}=req.body
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec((err,blog) => {
        if(err) console.log(err)
        res.json(blog)
    })
}