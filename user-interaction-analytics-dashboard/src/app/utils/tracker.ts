import { supabase } from './supabaseClient';

export const trackInteraction = async (type: string, element: string) => {
  try {
    const { error } = await supabase.from('user_interactions').insert([
      { type, element, timestamp: new Date().toISOString() }
    ]);
    if (error) throw error;
    console.log('Interaction tracked:', type, element);
  } catch (err) {
    console.error('Error tracking interaction:', err);
  }
};
