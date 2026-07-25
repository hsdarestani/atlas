document.addEventListener('DOMContentLoaded',()=>{
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  lucide.createIcons();

  const cursor=$('#ballCursor');
  if(cursor){document.addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});$$('button,a,.player-card,.row,.folder,tr').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('active'));el.addEventListener('mouseleave',()=>cursor.classList.remove('active'))})}

  function showView(name){$$('.view').forEach(v=>v.classList.toggle('active',v.id===`view-${name}`));$$('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===name&&b.closest('.view-switch')));window.scrollTo({top:0,behavior:'smooth'});setTimeout(()=>lucide.createIcons(),20)}
  $$('[data-view]').forEach(b=>b.addEventListener('click',()=>{showView(b.dataset.view);closeProfile()}));
  $$('[data-scroll]').forEach(b=>b.addEventListener('click',()=>document.getElementById(b.dataset.scroll)?.scrollIntoView({behavior:'smooth'})));

  function showPage(id){const page=document.getElementById(id);if(!page)return;const view=page.closest('.view');$$('.page',view).forEach(p=>p.classList.toggle('active',p===page));$$('[data-page]',view).forEach(b=>b.classList.toggle('active',b.dataset.page===id&&b.closest('nav')));window.scrollTo({top:0,behavior:'smooth'});setTimeout(()=>lucide.createIcons(),20)}
  $$('[data-page]').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));

  const toast=$('#toast'),toastText=$('#toastText');let toastTimer;
  function notify(text){toastText.textContent=text;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2800)}
  $$('[data-toast]').forEach(b=>b.addEventListener('click',()=>notify(b.dataset.toast)));

  const modalLayer=$('#modalLayer'),modalTitle=$('#modalTitle'),demoForm=$('#demoForm');
  function openModal(title){modalTitle.textContent=title;modalLayer.classList.add('open');setTimeout(()=>$('.modal input',modalLayer)?.focus(),80)}
  function closeModal(){modalLayer.classList.remove('open');demoForm.reset()}
  $$('[data-modal]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.modal)));
  $('#modalClose').addEventListener('click',closeModal);$('#modalCancel').addEventListener('click',closeModal);modalLayer.addEventListener('click',e=>{if(e.target===modalLayer)closeModal()});
  demoForm.addEventListener('submit',e=>{e.preventDefault();const title=modalTitle.textContent;closeModal();notify(`${title} wurde in der Vorführung gespeichert`)});

  const profileLayer=$('#profileLayer'),profileName=$('#profileName');
  function closeProfile(){profileLayer.classList.remove('open')}
  $$('[data-profile]').forEach(c=>c.addEventListener('click',()=>{profileName.textContent=c.dataset.profile;profileLayer.classList.add('open')}));
  $('.profile-close').addEventListener('click',closeProfile);profileLayer.addEventListener('click',e=>{if(e.target===profileLayer)closeProfile()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();closeProfile()}});

  const agenda=[['28','JUL','Leistungsdiagnostik','Frankfurt · 10:30','Bestätigt',''],['30','JUL','Vertragsgespräch','Videokonferenz · 14:00','Vorbereiten','gold'],['02','AUG','Auswärtsspiel','Treffpunkt · 08:30','Reise',''],['05','AUG','Sponsorenaufnahme','Studio · 12:00','Neu','red']];
  $('#agenda').innerHTML=agenda.map(x=>`<div class="row"><div class="date">${x[0]}<small>${x[1]}</small></div><div class="row-copy"><b>${x[2]}</b><span>${x[3]}</span></div><span class="status ${x[5]}">${x[4]}</span></div>`).join('');

  const calendar=$('#calendar');
  const events={3:['Training',''],6:['Arzttermin','cyan'],9:['Spielanalyse','gold'],12:['Heimspiel',''],16:['Reise','cyan'],18:['Auswärtsspiel',''],22:['Vertragsgespräch','gold'],28:['Diagnostik',''],30:['Videokonferenz','cyan']};
  calendar.innerHTML=['MO','DI','MI','DO','FR','SA','SO'].map(d=>`<div class="day"><b>${d}</b></div>`).join('')+Array.from({length:31},(_,i)=>{const n=i+1,e=events[n];return `<div class="day ${n===25?'today':''}">${n}${e?`<span class="event ${e[1]}">${e[0]}</span>`:''}</div>`}).join('');

  const folders=[['file-signature','Verträge','4 Dateien'],['plane','Reisen','8 Dateien'],['shield-check','Versicherungen','3 Dateien'],['heart-pulse','Medizin','6 Dateien'],['badge-euro','Sponsoren','5 Dateien'],['folder-key','Persönlich','11 Dateien'],['video','Spielanalysen','14 Dateien'],['id-card','Ausweise und Visa','4 Dateien']];
  $('#folders').innerHTML=folders.map(f=>`<article class="folder" data-toast="Ordner ${f[1]} geöffnet"><i data-lucide="${f[0]}"></i><b>${f[1]}</b><span>${f[2]}</span></article>`).join('');
  const docs=[['Flugplan_Madrid.pdf','Reisen · vor 2 Stunden','Bereit'],['Versicherung_2026.pdf','Versicherungen · gestern','Geprüft'],['Spielanalyse_27.pdf','Spielanalysen · 21. Juli','Neu'],['Reisepass.pdf','Ausweise und Visa · 17. Juli','Gültig']];
  $('#documents').innerHTML=docs.map(d=>`<div class="row"><div class="date"><i data-lucide="file-text"></i></div><div class="row-copy"><b>${d[0]}</b><span>${d[1]}</span></div><span class="status">${d[2]}</span></div>`).join('');

  const skills=[['Tempo',91],['Dribbling',88],['Passspiel',84],['Abschluss',79],['Pressing',86],['Mentalität',92]];
  $('#skills').innerHTML=skills.map(s=>`<div class="skill"><div><b>${s[0]}</b><span>${s[1]}/100</span></div><div class="track"><i style="width:${s[1]}%"></i></div></div>`).join('');

  let taskData=JSON.parse(localStorage.getItem('atlas_tasks')||'null')||[
    {t:'Reisepass für Madrid prüfen',d:'Heute · 20:00',done:false,urgent:true},{t:'Freigabe für Sponsorenaufnahme',d:'Morgen · 10:00',done:false},{t:'Versicherungsbogen bestätigen',d:'30. Juli',done:true},{t:'Spielanalyse kommentieren',d:'02. August',done:false}
  ];
  function renderTasks(){const root=$('#tasks');root.innerHTML=taskData.map((t,i)=>`<div class="row ${t.done?'done':''}"><input class="task-check" type="checkbox" data-task="${i}" ${t.done?'checked':''}><div class="row-copy"><b>${t.t}</b><span>${t.d}</span></div>${t.urgent?'<span class="status red">Dringend</span>':''}</div>`).join('');$$('[data-task]',root).forEach(c=>c.addEventListener('change',()=>{taskData[c.dataset.task].done=c.checked;localStorage.setItem('atlas_tasks',JSON.stringify(taskData));renderTasks();notify(c.checked?'Aufgabe erledigt':'Aufgabe wieder geöffnet')}))}
  renderTasks();

  const messageForm=$('#messageForm'),messageInput=$('#messageInput'),messages=$('#messages');
  const savedMessages=JSON.parse(localStorage.getItem('atlas_messages')||'[]');savedMessages.forEach(m=>appendMessage(m,false));
  function appendMessage(text,save=true){const time=new Date().toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'});messages.insertAdjacentHTML('beforeend',`<div class="bubble mine">${String(text).replace(/[<>]/g,'')}<time>${time}</time></div>`);messages.scrollTop=messages.scrollHeight;if(save){savedMessages.push(text);localStorage.setItem('atlas_messages',JSON.stringify(savedMessages))}}
  messageForm.addEventListener('submit',e=>{e.preventDefault();const value=messageInput.value.trim();if(!value)return;appendMessage(value);messageInput.value='';setTimeout(()=>{messages.insertAdjacentHTML('beforeend','<div class="bubble">Danke, ich melde mich gleich bei dir.<time>jetzt</time></div>');messages.scrollTop=messages.scrollHeight},700)});

  const players=[
    ['Jamie Leweling','Rechtsaußen','2029','M. Amami','Aktiv'],['Younes Ebnoutalib','Mittelstürmer','2031','M. Amami','Aktiv'],['Luca Sirch','Innenverteidiger','offen','D. Keller','Gespräch'],['Aymen Barkok','Offensives Mittelfeld','2028','M. Amami','Aktiv'],['Ayoub Chaikhoun','Offensives Mittelfeld','2029','D. Keller','Aktiv'],['Marco Meyerhöfer','Rechter Verteidiger','offen','S. Wolf','Prüfung'],['Dickson Abiama','Rechtsaußen','2027','S. Wolf','Aktiv'],['Uche Obiogumu','Linksaußen','2027','D. Keller','Aktiv'],['Besar Halimi','Offensives Mittelfeld','offen','M. Amami','Gespräch'],['Amin Farouk','Offensives Mittelfeld','2028','S. Wolf','Aktiv'],['Ilias Ebnoutalib','Innenverteidiger','2027','M. Amami','Aktiv'],['Lucas Becker','Torwart','2027','D. Keller','Aktiv'],['Mohamadaziz Abdelhadi','Innenverteidiger','2027','S. Wolf','Aktiv'],['Alae Hadaji','Rechter Verteidiger','offen','D. Keller','Prüfung'],['Ayoub Bagdadi','Rechtes Mittelfeld','offen','M. Amami','Gespräch']
  ];
  $('#playersTable').innerHTML=players.map(p=>`<tr data-toast="Profil ${p[0]} geöffnet"><td><div class="person-cell"><i>${p[0].split(' ').map(x=>x[0]).join('').slice(0,2)}</i><b>${p[0]}</b></div></td><td>${p[1]}</td><td>${p[2]}</td><td>${p[3]}</td><td><span class="status ${p[4]==='Prüfung'?'gold':''}">${p[4]}</span></td></tr>`).join('');

  const contracts=[['Jamie Leweling','Spielervertrag','bis 2029','15.09.2028','Vollständig'],['Younes Ebnoutalib','Spielervertrag','bis 2031','01.11.2030','Vollständig'],['Luca Sirch','Beratungsvertrag','in Prüfung','03.08.2026','Dringend'],['Aymen Barkok','Spielervertrag','bis 2028','12.12.2027','Vollständig'],['Marco Meyerhöfer','Beratungsvertrag','Entwurf','30.07.2026','Unterschrift'],['Besar Halimi','Vereinbarung','Entwurf','04.08.2026','Offen']];
  $('#contractsTable').innerHTML=contracts.map(c=>`<tr><td><b>${c[0]}</b></td><td>${c[1]}</td><td>${c[2]}</td><td>${c[3]}</td><td><span class="status ${c[4]==='Dringend'?'red':c[4]!=='Vollständig'?'gold':''}">${c[4]}</span></td></tr>`).join('');

  const urgent=[['Vertragsfrist · Luca Sirch','Heute · 16:00','Dringend','red'],['Visum · Reise Madrid','Heute · 18:00','Prüfen','gold'],['Medizinische Freigabe','Morgen · 09:00','Offen',''],['Sponsorenfreigabe','Morgen · 12:00','Neu','']];
  $('#urgent').innerHTML=urgent.map(u=>`<div class="row"><div class="date"><i data-lucide="circle-alert"></i></div><div class="row-copy"><b>${u[0]}</b><span>${u[1]}</span></div><span class="status ${u[3]}">${u[2]}</span></div>`).join('');

  const board={
    'Erstkontakt':[['Amin Farouk','Zweitligist · Deutschland'],['Ayoub Bagdadi','Erstligist · Belgien']],
    'Gespräch':[['Luca Sirch','Verein · Österreich'],['Besar Halimi','Verein · Schweiz'],['Uche Obiogumu','Verein · Niederlande']],
    'Entscheidung':[['Younes Ebnoutalib','Unterlagen vollständig'],['Aymen Barkok','Freigabe ausstehend']]
  };
  $('#transferBoard').innerHTML=Object.entries(board).map(([title,deals])=>`<section class="board-column"><h3>${title}<span>${deals.length}</span></h3>${deals.map(d=>`<article class="deal" draggable="true"><small>${title.toUpperCase()}</small><b>${d[0]}</b><p>${d[1]}</p></article>`).join('')}</section>`).join('');
  $$('.deal').forEach(d=>{d.addEventListener('dragstart',()=>d.classList.add('dragging'));d.addEventListener('dragend',()=>d.classList.remove('dragging'))});$$('.board-column').forEach(col=>{col.addEventListener('dragover',e=>e.preventDefault());col.addEventListener('drop',()=>{const d=$('.dragging');if(d){col.appendChild(d);notify('Vorgang verschoben')}})});

  const talents=[['Samir A.','Mittelstürmer · 18','92','Frankfurt'],['David K.','Zentrales Mittelfeld · 19','88','Köln'],['Leon M.','Innenverteidiger · 17','86','Mainz'],['Karim B.','Linksaußen · 18','84','Stuttgart'],['Nico S.','Torwart · 19','82','Darmstadt'],['Emir H.','Rechtsaußen · 17','80','Mannheim']];
  $('#scouting').innerHTML=talents.map(t=>`<article class="scout-card"><span class="eyebrow">Beobachtung</span><b>${t[0]}</b><p>${t[1]} · ${t[3]}</p><p class="rating">${t[2]}</p><button class="secondary" data-toast="Bewertung geöffnet">Bewerten</button></article>`).join('');
  const sponsors=[['Ausrüster Nord','Textil und Schuhe','Vertrag bis 2028'],['Kinetik Lab','Leistungsdiagnostik','8 Spieler aktiv'],['Mainblick Hotels','Reisen und Unterkunft','12 Buchungen'],['Frankfurt Mobil','Fahrdienst','24/7 Bereitschaft'],['Nexus Media','Inhalte und Aufnahmen','3 Kampagnen'],['Vitalwerk','Ernährung','9 Pläne aktiv']];
  $('#sponsors').innerHTML=sponsors.map(s=>`<article class="sponsor-card"><i data-lucide="handshake"></i><b>${s[0]}</b><p>${s[1]}</p><span class="status">${s[2]}</span></article>`).join('');
  const medical=[['Jamie Leweling','Spielfähig','Letzte Prüfung: 22. Juli',''],['Younes Ebnoutalib','Spielfähig','Letzte Prüfung: 20. Juli',''],['Luca Sirch','Untersuchung','Termin: 29. Juli','gold'],['Dickson Abiama','Aufbautraining','Kontrolle: 31. Juli','gold'],['Aymen Barkok','Spielfähig','Letzte Prüfung: 18. Juli','']];
  $('#medical').innerHTML=medical.map(m=>`<div class="row"><div class="date"><i data-lucide="heart-pulse"></i></div><div class="row-copy"><b>${m[0]}</b><span>${m[2]}</span></div><span class="status ${m[3]}">${m[1]}</span></div>`).join('');

  document.addEventListener('click',e=>{const target=e.target.closest('[data-toast]');if(target)notify(target.dataset.toast)});
  lucide.createIcons();
});