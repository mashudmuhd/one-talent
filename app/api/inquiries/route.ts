import {getDb} from '../../../db';
import {inquiries} from '../../../db/schema';
import {and,eq,gt,count} from 'drizzle-orm';
import {services} from '../../../lib/content';
export async function POST(request:Request){
 const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return Response.json({error:'Please submit using this website.'},{status:403});
 if(!request.headers.get('content-type')?.includes('application/json'))return Response.json({error:'Invalid submission format.'},{status:415});
 try{const raw=await request.text();if(raw.length>14000)return Response.json({error:'Your submission is too long.'},{status:413});const b=JSON.parse(raw);if(!b||typeof b!=='object')throw new Error('validation');
 const value=(key:string,max:number)=>typeof b[key]==='string'?b[key].trim().slice(0,max):'';
 const type=value('type',20),name=value('name',120),email=value('email',180).toLowerCase(),phone=value('phone',30),company=value('company',180),service=value('service',100),message=value('message',4000),profile=value('profile',1000),date=value('date',10),n=value('count',8);
 const candidateAreas=['Hospitality','Corporate & professional services','Events','Temporary work','Other'];
 if(value('website',100)||!['candidate','employer'].includes(type)||name.length<2||!/^\S+@\S+\.\S+$/.test(email)||phone.length<7||!company||message.length<10||b.consent!=='on'||!(type==='employer'?services.some(s=>s.slug===service):candidateAreas.includes(service)))return Response.json({error:'Please check the required fields and privacy consent.'},{status:400});
 if(profile){try{const u=new URL(profile);if(!['https:','http:'].includes(u.protocol))throw 0}catch{return Response.json({error:'Please enter a valid CV or profile link.'},{status:400})}}
 if(n&&(!Number.isInteger(Number(n))||Number(n)<1||Number(n)>10000))return Response.json({error:'Enter a staff count between 1 and 10,000.'},{status:400});
 if(date&&(!/^\d{4}-\d{2}-\d{2}$/.test(date)||Number.isNaN(Date.parse(date))))return Response.json({error:'Please enter a valid date.'},{status:400});
 const db=getDb(),now=Date.now();const recent=await db.select({total:count()}).from(inquiries).where(and(eq(inquiries.email,email),gt(inquiries.createdAt,now-3600000)));if(recent[0].total>=5)return Response.json({error:'You have submitted several inquiries recently. Please try again in an hour.'},{status:429});
 const id='OT-'+crypto.randomUUID();await db.insert(inquiries).values({id,type,name,email,phone,company,service,message,profile:profile||null,staffCount:n?Number(n):null,startDate:date||null,createdAt:now});return Response.json({reference:id},{status:201});
 }catch(error){if(error instanceof SyntaxError||error instanceof Error&&error.message==='validation')return Response.json({error:'Invalid submission. Please check your details.'},{status:400});return Response.json({error:'We could not save your inquiry at the moment. Please try again later.'},{status:503});}
}
