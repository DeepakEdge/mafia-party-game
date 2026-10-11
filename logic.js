(function(g){
  function living(players){return Object.keys(players||{}).filter(id=>players[id].alive);}
  function roleIds(players,role){return living(players).filter(id=>players[id].role===role);}
  function tally(votes,eligible){const t={}; for(const id of eligible){const v=votes&&votes[id]; if(v)t[v]=(t[v]||0)+1;} return t;}
  function firstVoteResult(players,votes){
    const eligible=living(players), cast=eligible.filter(id=>votes&&votes[id]);
    if(cast.length<eligible.length)return {status:'waiting',cast:cast.length,required:eligible.length};
    const t=tally(votes,eligible), counts=Object.values(t); if(!counts.length)return {status:'waiting',cast:0,required:eligible.length};
    const top=Math.max(...counts), leaders=Object.keys(t).filter(id=>t[id]===top);
    return leaders.length===1?{status:'accused',accused:leaders[0],tally:t}:{status:'tie',leaders,tally:t};
  }
  function finalVoteResult(players,votes,accused){
    const eligible=living(players).filter(id=>id!==accused), cast=eligible.filter(id=>votes&&['eliminate','spare'].includes(votes[id]));
    if(cast.length<eligible.length)return {status:'waiting',cast:cast.length,required:eligible.length};
    const eliminate=cast.filter(id=>votes[id]==='eliminate').length, spare=cast.length-eliminate;
    return {status:eliminate>eligible.length/2?'eliminate':'revote',eliminate,spare,eligible:eligible.length};
  }
  function outcome(players,excluded){
    const ids=living(players).filter(id=>id!==excluded), mafia=ids.filter(id=>players[id].role==='Mafia').length, others=ids.length-mafia;
    if(mafia===0)return 'villagers'; if(mafia>=others)return 'mafia'; return null;
  }
  function consensus(players,actions,role){const ids=roleIds(players,role), vals=ids.map(id=>actions&&actions[id]);return ids.length&&vals.every(Boolean)&&vals.every(v=>v===vals[0])?vals[0]:null;}
  g.GameLogic={living,roleIds,tally,firstVoteResult,finalVoteResult,outcome,consensus};
  if(typeof module!=='undefined')module.exports=g.GameLogic;
})(typeof window!=='undefined'?window:globalThis);