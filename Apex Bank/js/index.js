
const STORAGE_KEY='apexbank_v2';
const SEED={
  user:{id:'USR-001',name:'Emeka Okafor',email:'emeka.okafor@email.com',phone:'+234 801 234 5678',avatar:'EO',joinDate:'2021-03-15',pin:'1234',tier:'Gold Member'},
  accounts:[
    {id:'ACC-001',type:'Current Account',number:'0123456789',balance:847500,currency:'₦',color:'#1a56db',icon:'💳'},
    {id:'ACC-002',type:'Savings Account',number:'9876543210',balance:2340000,currency:'₦',color:'#0e9f6e',icon:'🏦'},
    {id:'ACC-003',type:'Dollar Account',number:'1122334455',balance:3850,currency:'$',color:'#7e3af2',icon:'🌐'}
  ],
  transactions:[
    {id:'T01',date:'2025-05-24',desc:'Salary — MTN Nigeria',type:'credit',amount:450000,account:'ACC-001',category:'Income',ref:'SAL-0524',status:'success'},
    {id:'T02',date:'2025-05-23',desc:'Shoprite Ikeja Mall',type:'debit',amount:18750,account:'ACC-001',category:'Shopping',ref:'POS-7823',status:'success'},
    {id:'T03',date:'2025-05-22',desc:'Transfer to Savings',type:'debit',amount:100000,account:'ACC-001',category:'Transfer',ref:'TRF-4421',status:'success'},
    {id:'T04',date:'2025-05-22',desc:'Transfer from Current',type:'credit',amount:100000,account:'ACC-002',category:'Transfer',ref:'TRF-4421',status:'success'},
    {id:'T05',date:'2025-05-21',desc:'DSTV Subscription',type:'debit',amount:29500,account:'ACC-001',category:'Bills',ref:'BIL-1120',status:'success'},
    {id:'T06',date:'2025-05-20',desc:'Zenith Bank ATM',type:'debit',amount:50000,account:'ACC-001',category:'Withdrawal',ref:'ATM-9934',status:'success'},
    {id:'T07',date:'2025-05-19',desc:'Amazon Purchase',type:'debit',amount:124.99,account:'ACC-003',category:'Shopping',ref:'AMZ-5512',status:'success'},
    {id:'T08',date:'2025-05-18',desc:'Freelance Payment',type:'credit',amount:850,account:'ACC-003',category:'Income',ref:'FRL-8871',status:'success'},
    {id:'T09',date:'2025-05-17',desc:'LAWMA Water Bill',type:'debit',amount:8500,account:'ACC-001',category:'Bills',ref:'BIL-3310',status:'success'},
    {id:'T10',date:'2025-05-16',desc:'Interest Credit',type:'credit',amount:12340,account:'ACC-002',category:'Interest',ref:'INT-0516',status:'success'},
    {id:'T11',date:'2025-05-15',desc:'Airtime Recharge',type:'debit',amount:5000,account:'ACC-001',category:'Airtime',ref:'AIR-2201',status:'success'},
    {id:'T12',date:'2025-05-14',desc:'Bolt Ride',type:'debit',amount:2800,account:'ACC-001',category:'Transport',ref:'BLT-6642',status:'success'},
    {id:'T13',date:'2025-05-13',desc:"Mama's Kitchen",type:'debit',amount:7500,account:'ACC-001',category:'Food',ref:'POS-4418',status:'success'},
    {id:'T14',date:'2025-05-12',desc:'Netflix Subscription',type:'debit',amount:4900,account:'ACC-001',category:'Bills',ref:'NET-0012',status:'success'},
    {id:'T15',date:'2025-05-10',desc:'Salary Bonus',type:'credit',amount:75000,account:'ACC-001',category:'Income',ref:'BON-0510',status:'success'}
  ]
};
function getData(){return JSON.parse(localStorage.getItem(STORAGE_KEY))||SEED;}
function saveData(d){localStorage.setItem(STORAGE_KEY,JSON.stringify(d));}
function initData(){if(!localStorage.getItem(STORAGE_KEY))saveData(SEED);}
function bankLogin(pin){const d=getData();if(pin===d.user.pin){sessionStorage.setItem('apex_auth','1');return true;}return false;}
function bankLogout(){sessionStorage.removeItem('apex_auth');}
function isAuthed(){return sessionStorage.getItem('apex_auth')==='1';}
function bankTransfer({fromId,toName,toNumber,amount,pin,note}){const d=getData();if(pin!==d.user.pin)return{ok:false,err:'Incorrect PIN.'};const acc=d.accounts.find(a=>a.id===fromId);if(!acc)return{ok:false,err:'Account not found.'};if(acc.balance<amount)return{ok:false,err:'Insufficient funds.'};if(amount<=0)return{ok:false,err:'Invalid amount.'};acc.balance-=amount;const ref='TRF-'+Math.floor(Math.random()*90000+10000);d.transactions.unshift({id:'T'+Date.now(),date:new Date().toISOString().split('T')[0],desc:'Transfer to '+toName,type:'debit',amount,account:fromId,category:'Transfer',ref,status:'success',note});saveData(d);return{ok:true,ref};}
function bankPayBill({accountId,biller,ref,amount,pin}){const d=getData();if(pin!==d.user.pin)return{ok:false,err:'Incorrect PIN.'};const acc=d.accounts.find(a=>a.id===accountId);if(!acc)return{ok:false,err:'Account not found.'};if(acc.balance<amount)return{ok:false,err:'Insufficient funds.'};acc.balance-=amount;const r='BIL-'+Math.floor(Math.random()*90000+10000);d.transactions.unshift({id:'T'+Date.now(),date:new Date().toISOString().split('T')[0],desc:biller+(ref?' — '+ref:''),type:'debit',amount,account:accountId,category:'Bills',ref:r,status:'success'});saveData(d);return{ok:true,ref:r};}
function fmtMoney(n,cur){return(cur||'₦')+n.toLocaleString('en-NG',{minimumFractionDigits:2});}
function fmtDate(s){return new Date(s).toLocaleDateString('en-NG',{day:'numeric',month:'short',year:'numeric'});}
function catIcon(c){return{Income:'💰',Shopping:'🛍',Transfer:'↔️',Bills:'📄',Withdrawal:'🏧',Interest:'📈',Airtime:'📱',Transport:'🚗',Food:'🍽',Default:'💳'}[c]||'💳';}
function catBg(c){return{Income:'#d1fae5',Shopping:'#dbeafe',Transfer:'#ede9fe',Bills:'#fef3c7',Withdrawal:'#fee2e2',Interest:'#d1fae5',Airtime:'#fce7f3',Transport:'#e0f2fe',Food:'#fef9c3',Default:'#f3f4f6'}[c]||'#f3f4f6';}

let hideBalance=false,activeCat='All',currentBiller='';

const pins=document.querySelectorAll('.pin-digit');
pins.forEach((p,i)=>{
  p.addEventListener('input',()=>{p.classList.toggle('filled',!!p.value);if(p.value&&i<3)pins[i+1].focus();});
  p.addEventListener('keydown',e=>{if(e.key==='Backspace'&&!p.value&&i>0)pins[i-1].focus();});
});
function getPin(){return Array.from(pins).map(p=>p.value).join('');}

function doLogin(){
  const pin=getPin();
  if(pin.length<4){showToast('Enter all 4 digits','error');return;}
  if(bankLogin(pin)){
    document.getElementById('login-page').style.display='none';
    document.getElementById('app').style.display='flex';
    bootDashboard();
  }else{
    document.getElementById('login-err').style.display='block';
    pins.forEach(p=>{p.value='';p.classList.remove('filled');});
    pins[0].focus();
    setTimeout(()=>{document.getElementById('login-err').style.display='none';},3000);
  }
}
function quickDemo(){['1','2','3','4'].forEach((v,i)=>{pins[i].value=v;pins[i].classList.add('filled');});setTimeout(doLogin,350);}
function doLogout(){bankLogout();document.getElementById('app').style.display='none';document.getElementById('login-page').style.display='flex';pins.forEach(p=>{p.value='';p.classList.remove('filled');});}

function bootDashboard(){
  const{user}=getData();
  document.getElementById('sb-avatar').textContent=user.avatar;
  document.getElementById('sb-name').textContent=user.name;
  document.getElementById('sb-tier').textContent=user.tier;
  const now=new Date();
  document.getElementById('page-date').textContent=now.toLocaleDateString('en-NG',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  const hr=now.getHours();
  document.getElementById('welcome-msg').textContent=`${hr<12?'Good morning':hr<17?'Good afternoon':'Good evening'}, ${user.name.split(' ')[0]} 👋`;
  populateAccDropdowns();initCatFilter();renderStats();renderDashAccounts();renderChart();renderRecentTxns();renderTxns();
}

const PAGE_TITLES={dashboard:'Dashboard',accounts:'My Accounts',transactions:'Transactions',transfer:'Transfer Money',bills:'Pay Bills',profile:'Profile',settings:'Settings'};
function showPage(id,btn){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  if(btn)btn.classList.add('active');
  document.getElementById('page-title').textContent=PAGE_TITLES[id]||id;
  if(id==='accounts')renderAllAccounts();
  if(id==='transactions')renderTxns();
  if(id==='profile')renderProfile();
}

function renderStats(){
  const{accounts,transactions:txns}=getData();
  const totalNGN=accounts.filter(a=>a.currency==='₦').reduce((s,a)=>s+a.balance,0);
  const month=txns.filter(t=>t.date.startsWith('2025-05'));
  const income=month.filter(t=>t.type==='credit').reduce((s,t)=>s+t.amount,0);
  const expense=month.filter(t=>t.type==='debit').reduce((s,t)=>s+t.amount,0);
  const items=[
    {label:'Total Balance',value:fmtMoney(totalNGN),change:'↑ 8.2% this month',up:true,icon:'💰',color:'#1a56db'},
    {label:'Monthly Income',value:fmtMoney(income),change:'Salary + Bonus',up:true,icon:'📈',color:'#0e9f6e'},
    {label:'Monthly Spend',value:fmtMoney(expense),change:'↓ vs last month',up:false,icon:'💸',color:'#e02424'},
    {label:'Savings Rate',value:'73.2%',change:'↑ Great work!',up:true,icon:'🎯',color:'#7e3af2'}
  ];
  document.getElementById('stats-row').innerHTML=items.map(s=>`<div class="stat-card"><div style="display:flex;justify-content:space-between;align-items:flex-start;"><div><div class="stat-label">${s.label}</div><div class="stat-value">${hideBalance?'••••':s.value}</div><div class="stat-change ${s.up?'up':'down'}">${s.change}</div></div><div style="width:42px;height:42px;border-radius:12px;background:${s.color}20;display:flex;align-items:center;justify-content:center;font-size:1.1rem;">${s.icon}</div></div></div>`).join('');
}

function renderDashAccounts(){
  const{accounts}=getData();
  document.getElementById('dash-accounts').innerHTML=accounts.map(a=>`<div onclick="showPage('accounts',null)" style="background:${a.color};border-radius:14px;padding:1.2rem 1.4rem;color:#fff;cursor:pointer;display:flex;justify-content:space-between;align-items:center;transition:transform .2s;box-shadow:0 4px 16px ${a.color}44;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'"><div><div style="font-size:.7rem;opacity:.75;font-weight:600;letter-spacing:.08em;text-transform:uppercase;">${a.type}</div><div style="font-size:1.3rem;font-weight:800;margin-top:.2rem;">${hideBalance?'••••':fmtMoney(a.balance,a.currency)}</div><div style="font-size:.72rem;opacity:.6;margin-top:.15rem;font-family:monospace;">•••• ${a.number.slice(-4)}</div></div><div style="font-size:2rem;opacity:.5;">${a.icon}</div></div>`).join('');
}

function renderChart(){
  const{transactions:txns}=getData();
  const days=['18','19','20','21','22','23','24'];
  const vals=days.map(d=>txns.filter(t=>t.date===`2025-05-${d}`&&t.type==='debit').reduce((s,t)=>s+t.amount,0));
  const max=Math.max(...vals,1);
  const cols=['#bfdbfe','#93c5fd','#60a5fa','#3b82f6','#2563eb','#1d4ed8','#1e40af'];
  document.getElementById('chart-bars').innerHTML=vals.map((v,i)=>`<div class="chart-bar" style="height:${Math.max(8,(v/max)*100)}%;background:${cols[i]};" title="May ${days[i]}: ₦${v.toLocaleString()}"></div>`).join('');
  document.getElementById('chart-labels').innerHTML=days.map(d=>`<div style="flex:1;text-align:center;font-size:.65rem;color:var(--muted);">May ${d}</div>`).join('');
  const cats={};txns.filter(t=>t.type==='debit').forEach(t=>{cats[t.category]=(cats[t.category]||0)+t.amount;});
  const tot=Object.values(cats).reduce((a,b)=>a+b,0);
  document.getElementById('cat-breakdown').innerHTML=Object.entries(cats).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([c,v])=>`<div style="display:flex;align-items:center;gap:.5rem;"><span style="font-size:.9rem;">${catIcon(c)}</span><div><div style="font-size:.72rem;font-weight:600;">${c}</div><div style="font-size:.68rem;color:var(--muted);">${((v/tot)*100).toFixed(0)}%</div></div></div>`).join('');
}

function buildTxnTable(txns){
  if(!txns.length)return'<p style="color:var(--muted);padding:1rem 0;font-size:.875rem;">No transactions found.</p>';
  const{accounts}=getData();const amap={};accounts.forEach(a=>amap[a.id]=a);
  return`<div style="overflow-x:auto;"><table class="txn-table"><thead><tr><th>Description</th><th>Date</th><th>Account</th><th>Category</th><th style="text-align:right">Amount</th><th>Status</th></tr></thead><tbody>${txns.map(t=>{const a=amap[t.account];return`<tr><td><div style="display:flex;align-items:center;gap:.8rem;"><div class="txn-icon" style="background:${catBg(t.category)}">${catIcon(t.category)}</div><div><div class="txn-desc">${t.desc}</div><div class="txn-ref">${t.ref}</div></div></div></td><td style="color:var(--muted);font-size:.8rem;">${fmtDate(t.date)}</td><td style="font-size:.75rem;color:var(--muted);font-family:monospace;">${a?'••••'+a.number.slice(-4):'—'}</td><td><span class="badge badge-info" style="font-size:.65rem;">${t.category}</span></td><td class="${t.type==='credit'?'amt-credit':'amt-debit'}" style="text-align:right;">${t.type==='credit'?'+':'-'}${a?a.currency:'₦'}${t.amount.toLocaleString('en-NG',{minimumFractionDigits:2})}</td><td><span class="badge badge-success">✓ ${t.status}</span></td></tr>`;}).join('')}</tbody></table></div>`;
}

function renderRecentTxns(){document.getElementById('recent-txns').innerHTML=buildTxnTable(getData().transactions.slice(0,6));}

function renderAllAccounts(){
  const{accounts}=getData();
  document.getElementById('all-acct-cards').innerHTML=accounts.map(a=>`<div class="acct-card" style="background:linear-gradient(135deg,${a.color},${a.color}cc);" onclick="showAccDetail('${a.id}')"><div><div style="font-size:.75rem;font-weight:600;opacity:.8;text-transform:uppercase;letter-spacing:.08em;">${a.type}</div><div style="font-size:.8rem;opacity:.65;margin-top:.3rem;font-family:monospace;letter-spacing:.15em;">${a.number.replace(/(.{4})/g,'$1 ').trim()}</div></div><div><div style="font-size:1.9rem;font-weight:800;letter-spacing:-.02em;">${hideBalance?'••••':fmtMoney(a.balance,a.currency)}</div><div style="font-size:.8rem;opacity:.7;margin-top:.2rem;">Available Balance</div></div><div class="acct-card-icon">${a.icon}</div></div>`).join('');
  showAccDetail(accounts[0].id);
}

function showAccDetail(id){
  const{accounts,transactions}=getData();const acc=accounts.find(a=>a.id===id);const txns=transactions.filter(t=>t.account===id).slice(0,10);
  document.getElementById('acct-detail').innerHTML=`<div class="card"><div class="section-header"><h3>${acc.type} — Activity</h3><span style="font-size:.75rem;color:var(--muted);">${acc.number}</span></div>${buildTxnTable(txns)}</div>`;
}

function initCatFilter(){
  const cats=['All','Income','Shopping','Transfer','Bills','Withdrawal','Airtime','Transport','Food','Interest'];
  document.getElementById('cat-filter-bar').innerHTML=cats.map(c=>`<button class="filter-btn${c==='All'?' active':''}" onclick="setCat('${c}',this)">${c}</button>`).join('');
  const sel=document.getElementById('txn-acc-filter');
  getData().accounts.forEach(a=>{const o=document.createElement('option');o.value=a.id;o.textContent=`${a.type} (••••${a.number.slice(-4)})`;sel.appendChild(o);});
}

function setCat(c,btn){activeCat=c;document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');renderTxns();}

function renderTxns(){
  const search=(document.getElementById('txn-search')?.value||'').toLowerCase();
  const accF=document.getElementById('txn-acc-filter')?.value||'';
  const typeF=document.getElementById('txn-type-filter')?.value||'';
  let txns=[...getData().transactions].sort((a,b)=>new Date(b.date)-new Date(a.date));
  if(accF)txns=txns.filter(t=>t.account===accF);
  if(typeF)txns=txns.filter(t=>t.type===typeF);
  if(activeCat!=='All')txns=txns.filter(t=>t.category===activeCat);
  if(search)txns=txns.filter(t=>t.desc.toLowerCase().includes(search)||t.ref.toLowerCase().includes(search));
  const wrap=document.getElementById('txn-wrap');if(!wrap)return;
  const inc=txns.filter(t=>t.type==='credit').reduce((s,t)=>s+t.amount,0);
  const exp=txns.filter(t=>t.type==='debit').reduce((s,t)=>s+t.amount,0);
  wrap.innerHTML=`<div style="display:flex;gap:1.5rem;padding:1rem;background:var(--bg);border-radius:10px;margin-bottom:1rem;flex-wrap:wrap;"><div><div style="font-size:.72rem;color:var(--muted);font-weight:600;">RESULTS</div><div style="font-size:1.1rem;font-weight:700;">${txns.length} transactions</div></div><div><div style="font-size:.72rem;color:var(--green);font-weight:600;">TOTAL IN</div><div style="font-size:1.1rem;font-weight:700;color:var(--green);">+₦${inc.toLocaleString()}</div></div><div><div style="font-size:.72rem;color:var(--red);font-weight:600;">TOTAL OUT</div><div style="font-size:1.1rem;font-weight:700;color:var(--red);">-₦${exp.toLocaleString()}</div></div></div>`+buildTxnTable(txns);
}

function populateAccDropdowns(){
  const{accounts}=getData();
  const opts=accounts.map(a=>`<option value="${a.id}">${a.type} — ${fmtMoney(a.balance,a.currency)} (••••${a.number.slice(-4)})</option>`).join('');
  ['tf-from','bill-from','bm-from'].forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML=opts;});
}

function doTransfer(){
  const fromId=document.getElementById('tf-from').value;
  const name=document.getElementById('tf-name').value.trim();
  const num=document.getElementById('tf-number').value.trim();
  const amount=parseFloat(document.getElementById('tf-amount').value);
  const pin=document.getElementById('tf-pin').value;
  const note=document.getElementById('tf-note').value.trim();
  if(!name)return showToast('Enter recipient name','error');
  if(!num||num.length!==10)return showToast('Enter valid 10-digit account number','error');
  if(!amount||isNaN(amount))return showToast('Enter valid amount','error');
  if(!pin)return showToast('Enter your PIN','error');
  const r=bankTransfer({fromId,toName:name,toNumber:num,amount,pin,note});
  if(!r.ok)return showToast(r.err,'error');
  const acc=getData().accounts.find(a=>a.id===fromId);
  document.getElementById('tf-form-card').classList.add('hidden');
  document.getElementById('tf-success').classList.remove('hidden');
  document.getElementById('tf-success-msg').textContent=`${fmtMoney(amount,acc.currency)} sent to ${name}`;
  document.getElementById('tf-receipt').innerHTML=`<div style="display:flex;flex-direction:column;gap:.6rem;"><div style="display:flex;justify-content:space-between;font-size:.82rem;"><span style="color:var(--muted)">Recipient</span><b>${name}</b></div><div style="display:flex;justify-content:space-between;font-size:.82rem;"><span style="color:var(--muted)">Account</span><b>${num}</b></div><div style="display:flex;justify-content:space-between;font-size:.82rem;"><span style="color:var(--muted)">Amount</span><b style="color:var(--red)">${fmtMoney(amount,acc.currency)}</b></div><div style="display:flex;justify-content:space-between;font-size:.82rem;"><span style="color:var(--muted)">Reference</span><b>${r.ref}</b></div><div style="display:flex;justify-content:space-between;font-size:.82rem;"><span style="color:var(--muted)">Date</span><b>${fmtDate(new Date().toISOString().split('T')[0])}</b></div></div>`;
  showToast(`₦${amount.toLocaleString()} sent successfully!`,'success');
  populateAccDropdowns();renderStats();renderDashAccounts();
}
function clearTf(){['tf-name','tf-number','tf-amount','tf-pin','tf-note'].forEach(id=>{document.getElementById(id).value='';});}
function resetTf(){document.getElementById('tf-form-card').classList.remove('hidden');document.getElementById('tf-success').classList.add('hidden');clearTf();}

function doPayBill(){
  const accountId=document.getElementById('bill-from').value;
  const biller=document.getElementById('bill-biller').value.trim();
  const ref=document.getElementById('bill-ref').value.trim();
  const amount=parseFloat(document.getElementById('bill-amount').value);
  const pin=document.getElementById('bill-pin').value;
  if(!biller)return showToast('Enter biller name','error');
  if(!amount)return showToast('Enter amount','error');
  if(!pin)return showToast('Enter your PIN','error');
  const r=bankPayBill({accountId,biller,ref,amount,pin});
  if(!r.ok)return showToast(r.err,'error');
  showToast(`${biller} — ₦${amount.toLocaleString()} paid! Ref: ${r.ref}`,'success');
  ['bill-biller','bill-ref','bill-amount','bill-pin'].forEach(id=>{document.getElementById(id).value='';});
  populateAccDropdowns();renderStats();renderDashAccounts();
}
function openBill(biller,title,amount){currentBiller=biller;document.getElementById('bill-modal-title').textContent='Pay — '+title;document.getElementById('bm-amount').value=amount;document.getElementById('bm-ref').value='';document.getElementById('bm-pin').value='';document.getElementById('bill-modal').classList.remove('hidden');populateAccDropdowns();}
function closeBill(){document.getElementById('bill-modal').classList.add('hidden');}
function confirmBill(){
  const accountId=document.getElementById('bm-from').value;
  const amount=parseFloat(document.getElementById('bm-amount').value);
  const ref=document.getElementById('bm-ref').value.trim();
  const pin=document.getElementById('bm-pin').value;
  if(!amount)return showToast('Enter amount','error');
  if(!pin)return showToast('Enter your PIN','error');
  const r=bankPayBill({accountId,biller:currentBiller,ref,amount,pin});
  if(!r.ok)return showToast(r.err,'error');
  showToast(`${currentBiller} paid! Ref: ${r.ref}`,'success');
  closeBill();populateAccDropdowns();renderStats();renderDashAccounts();
}
function renderProfile(){
  const{user,accounts}=getData();
  document.getElementById('prof-avatar').textContent=user.avatar;
  document.getElementById('prof-name').textContent=user.name;
  document.getElementById('prof-tier').textContent=user.tier;
  document.getElementById('prof-details').innerHTML=[{label:'User ID',value:user.id},{label:'Email',value:user.email},{label:'Phone',value:user.phone},{label:'Member Since',value:fmtDate(user.joinDate)}].map(f=>`<div style="padding:.8rem;background:var(--bg);border-radius:10px;"><div style="font-size:.7rem;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:.1em;">${f.label}</div><div style="font-size:.875rem;font-weight:600;margin-top:.25rem;">${f.value}</div></div>`).join('');
  document.getElementById('prof-accounts').innerHTML=accounts.map(a=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:.9rem;background:var(--bg);border-radius:10px;margin-bottom:.7rem;"><div style="display:flex;align-items:center;gap:.8rem;"><div style="width:38px;height:38px;border-radius:10px;background:${a.color};color:#fff;display:flex;align-items:center;justify-content:center;font-size:1rem;">${a.icon}</div><div><div style="font-size:.82rem;font-weight:600;">${a.type}</div><div style="font-size:.72rem;color:var(--muted);font-family:monospace;">${a.number.replace(/(.{4})/g,'$1 ').trim()}</div></div></div><div style="text-align:right;"><div style="font-weight:700;font-size:.95rem;">${hideBalance?'••••':fmtMoney(a.balance,a.currency)}</div><span class="badge badge-success" style="font-size:.65rem;">Active</span></div></div>`).join('');
}

function toggleHide(){hideBalance=document.getElementById('hide-bal').checked;renderStats();renderDashAccounts();renderProfile();}
function resetDemo(){if(!confirm('Reset all demo data?'))return;localStorage.removeItem(STORAGE_KEY);initData();showToast('Demo data reset!','info');setTimeout(()=>location.reload(),1200);}

function showToast(msg,type='info'){
  const icons={success:'✓',error:'✕',info:'ℹ'};
  const t=document.createElement('div');t.className=`toast toast-${type}`;t.innerHTML=`<span>${icons[type]}</span> ${msg}`;
  document.getElementById('toast-container').appendChild(t);setTimeout(()=>t.remove(),4000);
}

initData();
if(isAuthed()){document.getElementById('login-page').style.display='none';document.getElementById('app').style.display='flex';bootDashboard();}