const model = require("./../Model/person");
const model2 = require("./../Model/product");
const model3=require("./../Model/cart");
const model4=require("./../Model/wish");
const Person = model.Person;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path=require("path");
var privateKey = fs.readFileSync(path.resolve(__dirname,"../private.key"),"utf-8");
const Product=model2.Product;
const Cart=model3.Cart;
const Wish=model4.Wish;

exports.signUp = async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    var token = jwt.sign({ email: req.body.email }, privateKey, {
      algorithm: "RS256",
      expiresIn: "15m",
    });
    const hash = bcrypt.hashSync(req.body.password, 10);
    newPerson.token = token;
    newPerson.password = hash;
    const response = await newPerson.save();
    res.json(response);
    console.log("data saved");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.logIn = async (req, res) => {
  try {
    const doc = await Person.findOne({ email: req.body.email });
    const isAuth = bcrypt.compareSync(req.body.password, doc.password);
    

    if(isAuth){
        var token = jwt.sign({ email: req.body.email }, privateKey, {
            algorithm: "RS256",
            expiresIn: '15m'
          }); 
          doc.token=token;
          const response=await doc.save();
          res.json(response);
    }
    else{
        res.sendStatus(401);
    }
   

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.validate = async (req, res) => {
  try {
    res.json({isAuth:true,email:req.user.email});
  } catch (err) {
    console.error(err);
    res.json({ error: "Internal Server Error" });
  }
};

exports.getData=async (req,res)=>{ 
  const value= req.params.type;
  const product= await Product.find({type:value});
  res.json(product);
};

exports.getdataByTitle=async (req,res)=>{ 
  const value= req.params.title;
  const product= await Product.find({title:value});
  res.json(product);
};

exports.getProduct=async (req,res)=>{
  const id= req.params.id;
  const product= await Product.findById(id).exec();
  res.json(product);
}

exports.getTitle=async (req,res)=>{ 
  const value= req.params.title;
  console.log(value);
  const product= await Product.find({title:value});
  res.json(product);
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.find(); 

    const items = [];

    for (let item of cart) {
      const doc = await Product.findById(item.realId).exec(); 
      items.push({id:item._id,title:doc.title,type:doc.type,img:doc.img,name:doc.name,text:doc.text,price:doc.price,size:item.size,color:item.color,amount:item.amount}); 
    }

    res.json(items); 
  } catch (error) {
    console.error('Error in getCart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



exports.cartData=async (req,res)=>{
  const cartProduct = new Cart(req.body);
   
    const savedProduct = await cartProduct.save();
    
    
    res.status(201).json(savedProduct);
};

exports.deleteCart=async (req,res)=>{
  const id= req.params.id;
  try{
   const doc= await Cart.findOneAndDelete({_id:id});
   res.json(doc);
  }
  catch(err){
    res.json({message:err});
  }
  }


  exports.getWish = async (req, res) => {
    try {
      const wish = await Wish.find(); 
  
      const items = [];
  
      for (let item of wish) {
        const doc = await Product.findById(item.realId).exec(); 
        items.push({id:doc._id,title:doc.title,img:doc.img}); 
      }
  
      res.json(items); 
    } catch (error) {
      console.error('Error in getWish:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  
  
  exports.wishData=async (req,res)=>{
    const wishProduct = new Wish(req.body);
     
      const savedProduct = await wishProduct.save();
      
      
      res.status(201).json(savedProduct);
  };
  
  exports.deleteWish=async (req,res)=>{
    const id= req.params.id;
    try{
     const doc= await Wish.findOneAndDelete({realId:id});
     res.json(doc);
    }
    catch(err){
      res.json({message:err});
    }
    }



