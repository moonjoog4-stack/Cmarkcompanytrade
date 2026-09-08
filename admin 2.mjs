import { getPool } from "./_shared/db.mjs";
import { requireUser,isAdmin } from "./_shared/auth.mjs";
const out=(s,b)=>({statusCode:s,headers:{"content-type":"application/json"},body:JSON.stringify(b)});

export async function handler(event){
 try{
  const actor=requireUser(event);if(!isAdmin(actor))return out(403,{message:"Administrator access required"});
  const pool=getPool();
  if(event.httpMethod==="GET"){
   const [users,pending,stats]=await Promise.all([
    pool.query("SELECT id,full_name,email,role,status,created_at FROM users ORDER BY created_at DESC"),
    pool.query("SELECT t.*,u.full_name,u.email FROM transactions t JOIN users u ON u.id=t.user_id WHERE t.status='pending' ORDER BY t.created_at ASC"),
    pool.query("SELECT (SELECT COUNT(*) FROM users)::int users,(SELECT COUNT(*) FROM transactions WHERE status='pending')::int pending,(SELECT COUNT(*) FROM transactions)::int transactions")
   ]);
   return out(200,{users:users.rows,pending:pending.rows,stats:stats.rows[0]});
  }
  if(event.httpMethod!=="PUT")return out(405,{message:"Method not allowed"});
  const b=JSON.parse(event.body||"{}");if(!["approved","rejected"].includes(b.status)||!b.transactionId)return out(400,{message:"Invalid action"});
  const client=await pool.connect();
  try{
   await client.query("BEGIN");
   const tx=(await client.query("SELECT * FROM transactions WHERE id=$1 FOR UPDATE",[b.transactionId])).rows[0];
   if(!tx)throw new Error("Transaction not found");
   if(tx.status!=="pending")throw new Error("Transaction has already been processed");
   if(b.status==="approved"){
    if(tx.type==="deposit")await client.query("UPDATE wallets SET available_balance=available_balance+$1,updated_at=NOW() WHERE user_id=$2",[tx.amount,tx.user_id]);
    if(tx.type==="withdrawal"){
      const wallet=(await client.query("SELECT available_balance FROM wallets WHERE user_id=$1 FOR UPDATE",[tx.user_id])).rows[0];
      if(Number(wallet.available_balance)<Number(tx.amount))throw new Error("Insufficient available balance for withdrawal");
      await client.query("UPDATE wallets SET available_balance=available_balance-$1,updated_at=NOW() WHERE user_id=$2",[tx.amount,tx.user_id]);
    }
   }
   await client.query("UPDATE transactions SET status=$1,updated_at=NOW() WHERE id=$2",[b.status,tx.id]);
   await client.query("INSERT INTO notifications(user_id,title,message) VALUES($1,$2,$3)",[tx.user_id,`Request ${b.status}`,`Your ${tx.type} request of $${Number(tx.amount).toFixed(2)} was ${b.status}.`]);
   await client.query("INSERT INTO audit_logs(user_id,action,metadata) VALUES($1,$2,$3)",[actor.id,`transaction_${b.status}`,JSON.stringify({transactionId:tx.id})]);
   await client.query("COMMIT");return out(200,{message:`Transaction ${b.status}`});
  }catch(e){await client.query("ROLLBACK");throw e}finally{client.release()}
 }catch(e){return out(e.message==="Unauthorized"?401:400,{message:e.message||"Administration request failed"})}
}
