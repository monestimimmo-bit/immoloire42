/* ImmoLoire42 : menu, liste des communes, formulaire d'estimation */
(function(){
'use strict';
var COMMUNES=[{"n": "Saint-Étienne", "s": "saint-etienne", "c": "42000"}, {"n": "Saint-Chamond", "s": "saint-chamond", "c": "42400"}, {"n": "Roanne", "s": "roanne", "c": "42300"}, {"n": "Firminy", "s": "firminy", "c": "42700"}, {"n": "Montbrison", "s": "montbrison", "c": "42600"}, {"n": "Saint-Just-Saint-Rambert", "s": "saint-just-saint-rambert", "c": "42170"}, {"n": "Rive-de-Gier", "s": "rive-de-gier", "c": "42800"}, {"n": "Le Chambon-Feugerolles", "s": "le-chambon-feugerolles", "c": "42500"}, {"n": "Riorges", "s": "riorges", "c": "42153"}, {"n": "Andrézieux-Bouthéon", "s": "andrezieux-boutheon", "c": "42160"}, {"n": "Roche-la-Molière", "s": "roche-la-moliere", "c": "42230"}, {"n": "Veauche", "s": "veauche", "c": "42340"}, {"n": "Unieux", "s": "unieux", "c": "42240"}, {"n": "Feurs", "s": "feurs", "c": "42110"}, {"n": "Sorbiers", "s": "sorbiers", "c": "42290"}, {"n": "La Ricamarie", "s": "la-ricamarie", "c": "42150"}, {"n": "Villars", "s": "villars", "c": "42390"}, {"n": "Mably", "s": "mably", "c": "42300"}, {"n": "La Talaudière", "s": "la-talaudiere", "c": "42350"}, {"n": "Le Coteau", "s": "le-coteau", "c": "42120"}];
var AUTRE='Autre commune de la Loire';
var PAGE=12;
function norm(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}

var yr=document.getElementById('year');
if(yr){yr.textContent=new Date().getFullYear();}

/* menu mobile */
var tg=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
if(tg&&nav){
  tg.addEventListener('click',function(){var o=nav.classList.toggle('open');tg.setAttribute('aria-expanded',o?'true':'false');});
  nav.addEventListener('click',function(e){if(e.target.closest('a')){nav.classList.remove('open');tg.setAttribute('aria-expanded','false');}});
}

/* grille des communes (page d'accueil) */
var grid=document.getElementById('commune-grid');
if(grid){
  var search=document.getElementById('commune-search'),count=document.getElementById('commune-count'),
      label=document.getElementById('pagination-label'),more=document.getElementById('load-more'),shown=PAGE;
  var render=function(){
    var q=norm(search.value.trim());
    var list=COMMUNES.filter(function(c){return !q||norm(c.n).indexOf(q)>-1||c.c.indexOf(q)>-1;});
    var vis=q?list:list.slice(0,shown);
    grid.textContent='';
    vis.forEach(function(c){
      var a=document.createElement('a');a.className='commune-card';a.href='vendre-a-'+c.s+'.html';
      var n=document.createElement('span');n.textContent=c.n;
      var p=document.createElement('span');p.textContent=c.c;
      a.appendChild(n);a.appendChild(p);grid.appendChild(a);
    });
    if(!list.length){var m=document.createElement('p');m.textContent='Aucune commune ne correspond à votre recherche.';grid.appendChild(m);}
    count.textContent=list.length+' commune'+(list.length>1?'s':'');
    label.textContent=q?'':vis.length+' sur '+list.length+' communes';
    more.hidden=!!q||vis.length>=list.length;
  };
  search.addEventListener('input',render);
  more.addEventListener('click',function(){shown+=PAGE;render();});
  render();
}

/* ---------- validation ---------- */
function validEmail(v){
  var m=/^([^@\s]+)@([^@\s]+)$/.exec(v);if(!m)return false;
  var local=m[1],dom=m[2];
  if(local.length>64||/^\.|\.$|\.\./.test(local)||!/^[A-Za-z0-9._%+'-]+$/.test(local))return false;
  var parts=dom.split('.');if(parts.length<2)return false;
  for(var i=0;i<parts.length;i++){if(!/^[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/.test(parts[i]))return false;}
  return /^[A-Za-z]{2,24}$/.test(parts[parts.length-1]);
}
function validPhone(v){
  var t=v.trim();if(!/^[+0-9 .\-]+$/.test(t))return false;
  var c=t.replace(/[\s.\-]/g,'');
  return /^0[1-9][0-9]{8}$/.test(c)||/^(?:\+33|0033)[1-9][0-9]{8}$/.test(c);
}
var NAMES={consentement:'Consentement'};
function labelOf(el){
  if(NAMES[el.name])return NAMES[el.name];
  var l=el.closest('label');if(!l)return el.name;
  for(var i=0;i<l.childNodes.length;i++){var n=l.childNodes[i];if(n.nodeType===3&&n.textContent.trim())return n.textContent.trim();}
  var w=l.querySelector('.lt');return w?w.textContent.trim():el.name;
}
function problem(el){
  if(el.type==='checkbox')return el.checked?'':'Vous devez accepter pour envoyer votre demande.';
  var v=el.value.trim();
  if(!v)return el.tagName==='SELECT'?'Merci de faire un choix.':(el.name==='email'?'Indiquez votre adresse e-mail.':el.name==='telephone'?'Indiquez votre numéro de téléphone.':'Ce champ est obligatoire.');
  if(el.name==='email'&&!validEmail(v))return 'Adresse e-mail incomplète ou invalide (exemple : prenom.nom@exemple.fr).';
  if(el.name==='telephone'&&!validPhone(v))return 'Numéro incomplet ou invalide : saisissez 10 chiffres (exemple : 06 12 34 56 78).';
  if(el.name==='surface'&&!(parseFloat(v)>0))return 'Indiquez une surface supérieure à 0.';
  if((el.name==='prenom'||el.name==='nom')&&v.length<2)return 'Indiquez votre '+(el.name==='nom'?'nom':'prénom')+' complet.';
  if(el.name==='details'&&v.length<3)return 'Ajoutez quelques précisions sur votre bien.';
  return '';
}
function show(el,msg){
  var l=el.closest('label');if(!l)return;
  var m=l.querySelector('.field-error');
  if(!msg){if(m)m.remove();el.removeAttribute('aria-invalid');el.removeAttribute('aria-describedby');return;}
  if(!m){m=document.createElement('span');m.className='field-error';m.setAttribute('role','alert');m.id='err-'+el.name;l.appendChild(m);}
  m.textContent=msg;el.setAttribute('aria-invalid','true');el.setAttribute('aria-describedby',m.id);
}

/* formulaire d'estimation */
var form=document.getElementById('estimate-form');
if(form){
  form.noValidate=true;
  var fb=form.querySelector('.form-feedback');
  var sel=document.getElementById('commune-select'),extra=null,inp=null;
  if(sel){
    COMMUNES.forEach(function(c){var o=new Option(c.n+' ('+c.c+')',c.n);o.setAttribute('data-slug',c.s);sel.add(o);});
    sel.add(new Option(AUTRE,AUTRE));
    var wanted=new URLSearchParams(location.search).get('commune');
    if(wanted){for(var i=0;i<sel.options.length;i++){if(sel.options[i].getAttribute('data-slug')===wanted){sel.value=sel.options[i].value;break;}}}
    extra=document.createElement('label');extra.hidden=true;
    extra.appendChild(document.createTextNode('Précisez votre commune'));
    inp=document.createElement('input');inp.name='commune_autre';inp.placeholder='Nom de la commune';extra.appendChild(inp);
    sel.closest('label').after(extra);
    sel.addEventListener('change',function(){
      var on=sel.value===AUTRE;extra.hidden=!on;inp.required=on;if(!on){inp.value='';show(inp,'');}
    });
  }
  var fields=function(){return Array.prototype.filter.call(form.querySelectorAll('[required]'),function(el){return !el.closest('[hidden]');});};
  form.addEventListener('input',function(e){var t=e.target;if(t.getAttribute&&t.getAttribute('aria-invalid'))show(t,problem(t));});
  form.addEventListener('change',function(e){var t=e.target;if(t.required)show(t,problem(t));});
  form.addEventListener('focusout',function(e){var t=e.target;if(t.required&&(t.name==='email'||t.name==='telephone')&&t.value.trim())show(t,problem(t));});
  form.addEventListener('submit',function(e){
    e.preventDefault();
    fb.className='form-feedback';fb.textContent='';
    var bad=[];
    fields().forEach(function(el){var m=problem(el);show(el,m);if(m)bad.push(el);});
    if(bad.length){
      fb.className='form-feedback is-error';
      fb.textContent='Merci de compléter ou de corriger les champs signalés : '+bad.map(labelOf).join(', ')+'.';
      bad[0].focus();return;
    }
    var btn=form.querySelector('[type=submit]');btn.disabled=true;
    fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}})
      .then(function(r){
        if(r.ok)return null;
        return r.json().catch(function(){return {};}).then(function(d){
          var m=(d.errors||[]).map(function(x){return x.message;}).join(', ');
          throw new Error((m||'Erreur')+' (code '+r.status+')');
        });
      })
      .then(function(){
        form.reset();if(extra)extra.hidden=true;
        fb.className='form-feedback is-ok';
        fb.textContent='Merci ! Votre demande a bien été transmise à un conseiller immobilier local, qui vous recontactera pour réaliser votre estimation, gratuite et sans engagement.';
      })
      .catch(function(err){
        fb.className='form-feedback is-error';
        fb.textContent=(err instanceof TypeError)?'L’envoi a échoué. Vérifiez votre connexion et réessayez.':'L’envoi a échoué : '+err.message;
      })
      .then(function(){btn.disabled=false;});
  });
}
})();
