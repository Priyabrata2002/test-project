const express=require("express");
var bodyParser=require("body-parser")
const database=require("./database");

/*
Route          /is
Description    Get all the books 
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
const booky=express();
booky.use(bodyParser.urlencoded({extended:true}))
booky.get("/",(req,res)=>{
    return res.json({books:database.books});
});
booky.get("/is/:isbn",(req,res)=>{
 const getSpecificBook = database.books.filter(
   (book)=>book.ISBN === req.params.isbn
 );
 if(getSpecificBook.length===0){
    return res.json({error:`No book found for the ISBN of ${req.params.isbn}`});
 }
 return res.json({book:getSpecificBook})
});

/*
Route          /c
Description    Get all the books 
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
//instalisation of nodemon;
booky.get("/c/:category",(req,res)=>{
    const getSpecificBook=database.books.filter(
        (book)=>book.category.includes(req.params.category)
    )
    if(getSpecificBook.length ===0){
        return res.json({error:`No book found for the category of ${req.params.category}`})
    }
    return res.json({book:getSpecificBook});
});
/*
Route          /d/:languages;
Description    Get all the books  based on a specific language
Access          PUBLIC
Parameter       languages
Methods         GET
*/
booky.get("/d/:language",(req,res)=>{
 const getSpecificBook=database.books.filter(
    (book)=>book.language.includes(req.params.language)
 )
 if(getSpecificBook.length === 0){
    return res.json({error:`No book found from the category ${req.params.language}`})
 }
 return res.json({book:getSpecificBook});
});
/*
Route          /author/book/:isbn;
Description    Get the specific book as per authors name 
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/author/book/:isbn",(req,res)=>{
    const getSpecificBook=database.author.filter(
        (author)=>author.books.includes(req.params.isbn)
    )
    if(getSpecificBook.length===0){
        return res.json({error:`NO books found of Author ${req.params.isbn}`})
    }
    return res.json({book:getSpecificBook});
});
/*
Route          /publications;
Description    Get the all book as per publications name  
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/publication",(req,res)=>{
  return res.json({publication:database.publication});
});
/*
Route          /publications;
Description    Get the specific book as per authors name 
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/publication/:isbn",(req,res)=>{
 const getSpecificBook=database.publication.filter(
    (publication)=>publication.books.includes(req.params.isbn)

 )
 if(getSpecificBook.length===0){
    return res.json({error:`No such book with writer ${req.params.isbn}` });
 }
 return res.json({book:getSpecificBook});
});
/*
Route          /book/new;
Description    POST REQUEST
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.post("/book/new", (req,res)=>{
  const newBook=req.body
  console.log({bod11 :req.body})
  let tempDb = database.books
  tempDb.push(newBook);
  console.log({tempDb})
  return res.status(200).json({updatedBooks:tempDb});
});
booky.listen(3000,()=>{
    console.log("Server is up and running");
    });
    