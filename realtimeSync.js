import mqtt from 'mqtt';
const BROKERS=['wss://broker.emqx.io:8084/mqtt','wss://broker.hivemq.com:8884/mqtt'];
class Sync{constructor(){this.id=`hs_${Math.random().toString(16).slice(2,10)}`;this.session=localStorage.getItem('hs_active_session_id')||'humanschool_live_v4';this.listeners=new Set();this.bc=new BroadcastChannel('human-school-live-v4');this.bc.onmessage=e=>this.receive(e.data);this.connect()}
connect(i=0){if(i>=BROKERS.length)return;this.client=mqtt.connect(BROKERS[i],{clientId:this.id,clean:true,connectTimeout:5000,reconnectPeriod:3000});this.client.on('connect',()=>{this.connected=true;this.client.subscribe(`humanschool/${this.session}/#`)});this.client.on('message',(_,m)=>{try{this.receive(JSON.parse(m.toString()))}catch{}});this.client.on('error',()=>{this.connected=false;if(i+1<BROKERS.length){this.client.end(true);this.connect(i+1)}});this.client.on('close',()=>this.connected=false)}
setSessionId(s){if(!s||s===this.session)return;this.session=s;localStorage.setItem('hs_active_session_id',s);this.client?.end(true,()=>this.connect())}
publish(topic,data){let p={...data,sessionId:this.session,senderId:this.id,timestamp:Date.now()};this.bc.postMessage(p);if(this.connected)this.client.publish(`humanschool/${this.session}/${topic}`,JSON.stringify(p),{qos:0,retain:false})}
receive(p){if(p&&p.senderId!==this.id)this.listeners.forEach(f=>f(p))}
subscribe(f){this.listeners.add(f);return()=>this.listeners.delete(f)}}
export const realtimeSync=new Sync();
