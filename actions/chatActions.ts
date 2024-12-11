'use server';
import {
  createServerSupabaseAdminClient,
  createServerSupabaseClient,
} from 'utils/supabase/server';
export async function getAllUsers() {
  const supabase = await createServerSupabaseAdminClient();
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) {
    return [];
  }
  return data.users;
}
export async function getUserById(userId) {
  const supabase = await createServerSupabaseAdminClient();
  const { data, error } = await supabase.auth.admin.getUserById(userId);
  if (error) {
    return null;
  }
  return data.user;
}

export async function sendMessage({ message, chatuserId }) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error && !session.user) {
    throw new Error('User is not authenticated');
  }

  const { data, error: sendMessageError } = await supabase
    .from('message')
    .insert({
      message,
      receiver: chatuserId,
      sender: session.user.id,
    });

  if (sendMessageError) {
    throw new Error(sendMessageError.message);
  }

  return data;
}
