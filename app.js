const express = require('express');
const cors = require('cors');

const environment=process.env.NODE_ENV || 'development';
const knex=require('knex')(require('./knexfile.js')[environment]);

const app = express();
app.locals.port = 443;
app.use(cors());
app.use(express.json());


function strictObj(obj, ...list){
    const retObj = {};
    for (const item of list){
        const [name, type]=item.split(':');
        if (obj[name]===undefined) return 'missing '+name;
        if (typeof obj[name]!==type) return 'expected type '+type+' on '+name+', but got type '+typeof obj[name];
        retObj[name]=obj[name];
    }
    return retObj;
}

app.get('/form/:formId/:formPass', async (req, res) => {
    const p = strictObj(req.params, 'formId:string','formPass:string');
    if (typeof p==='string'){
        console.warn(req.params);
        return res.status(400).json({error: p});
    }
    p.formId=parseInt(p.formId, 36);
    p.formPass=parseInt(p.formPass, 36);
    const form = await knex.select('data').from('forms').where({id: p.formId, pass: p.formPass});
    if (form.length>1){
        console.warn('more than one form exists with this criteria', p);
        return res.status(400).json({error: 'multiple forms with that search criteria, should be impossible'});
    }
    if (form.length===0){
        console.warn('request for non existant form', p);
        return res.status(404).json({error: 'form not found'});
    }
    console.log('request fullfilled for form ',p)
    return res.status(200).json(JSON.parse(form[0].data));
});

app.post('/form', async (req, res) => {
    if (typeof strictObj(req.body,'id:string','package:object')==='string') return res.status(400).json({error: 'invalid request'});

    const secret = req.body.id;
    if (secret!=='cv22') {
        console.info('someone tried submitting a form with invalid secret');
        return res.status(400).json({error: 'Invalid JSON'});
    }
    const form = req.body.package;
    const pass = Math.floor(Math.random()*45321)+1333;
    //todo validate form
    try {
        const returnedData = await knex('forms').insert({pass: pass, data: JSON.stringify(form)});
        id=returnedData[0];
        const sendObj = {id: Number(id).toString(36).toUpperCase(), pass: Number(pass).toString(36).toUpperCase()};
        console.log("new form ",id, pass);
        return res.status(200).json(sendObj);
    } catch (e){
        console.error('failed to insert', e);
        return res.status(400).json({error: 'unable to create ('+e.code+')'})
    }
});

app.use((err, req, res, next) => {
    console.error('error',err.type, ', probably bad json() parse');
    res.status(400).send({error: 'error ('+err.type+')'});
});

app.listen(app.locals.port, () => console.log(`listening on port: ${app.locals.port}`))