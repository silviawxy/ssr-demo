import Vue from 'vue';
var express = require('express');
var server = express();
// 读取模板字符串
const tmp = require('fs').readFileSync('./index.html','utf-8');
const render = require('vue-server-renderer').createRenderer({
    template:tmp
});
server.get('*',(req,res)=>{
    const app = new Vue({
        data:{
            title:'my love',
            loves:['sleep','swim','movie','photo','cookee','cat']
        },
        template:
        `
            <div>
                <h2>{{this.title}}</h2>
                <ul>
                    <li v-for="(item,index) in loves" :key="index">{{item}}</li>
                </ul>
            </div>
        `
    })
    // console.log(app);
    render.renderToString(app,{title:"ssr demo"},(err,html)=>{
        if(err){
            res.status(500).end('internal server error');
            return;
        }
        res.end(html);
    })
    
})
server.listen(2332,()=>{
    console.log('starting server on http://127.0.0.1:2332');
})