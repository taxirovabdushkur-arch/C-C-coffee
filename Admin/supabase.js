const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('[supabase] ВНИМАНИЕ: SUPABASE_URL или SUPABASE_SERVICE_ROLE_KEY не заданы!');
}

const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder',
  { auth: { persistSession: false } }
);

module.exports = supabase;
