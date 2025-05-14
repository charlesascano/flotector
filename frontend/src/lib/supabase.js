import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qgfkmpqawsqbiljkeqij.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnZmttcHFhd3NxYmlsamtlcWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2ODExMzIsImV4cCI6MjA2MjI1NzEzMn0.UsztQLtxvfY58Epo-d6BDA26K1wIB33qGh0AC3anJnI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)