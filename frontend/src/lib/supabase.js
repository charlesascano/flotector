import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vjnpdgsrrbdwbihdqqbu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqbnBkZ3NycmJkd2JpaGRxcWJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3ODUyODgsImV4cCI6MjA3NjM2MTI4OH0.V1dKAvyBfnSQadA38ZhRGKWLVA892h7_zfIrqRJ9Er0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)