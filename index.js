import express from 'express'
import 'dotenv/config'

const app = express();
const port =process.env.PORT || 3001

app.use(express.json());
let teadata=[];
let nextid=1;
// adding 
app.post("/teas",(req,res)=>{
    const {name,price}=req.body;
    const newtea={
        id:nextid++,
        name,
        price
    }
    teadata.push(newtea);
    res.status(201).send(newtea);
});
// listing
app.get('/teas',(req,res)=>{
    res.status(200).send(teadata);
})
// checking
app.get("/teas/:id",(req,res)=>{
    let tea=teadata.find((t)=> t.id===parseInt(req.params.id));
    if(!tea){
        res.status(404).send("not found");
    }
    res.status(200).send(tea);
})  
// update
app.put('/teas/:id',(req,res)=>{
    const tea=teadata.find((t)=> t.id===parseInt(req.params.id));
    if(!tea){
        res.status(404).send("not found");
    }

    const {name,price}=req.body;
    tea.name=name;
    tea.price=price;
    res.status(200).send(tea);
})
// delete 
app.delete('/teas/:id',(req,res)=>{
    const index=teadata.findIndex((t)=> t.id=== parseInt(req.params.id));
    if(index==-1){
        res.status(404).send("not found");
    }
    teadata.splice(index,1);
    
    res.status(204).send("deleted");
})


app.listen(port,()=>{
    console.log("server is running ...")
});