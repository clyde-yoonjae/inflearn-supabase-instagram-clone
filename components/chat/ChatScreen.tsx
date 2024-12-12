'use client';

import Person from './Person';
import Message from './Message';
import { useRecoilValue } from 'recoil';
import {
  presenceState,
  selectedUserIdState,
  selectedUserIndexState,
} from 'utils/recoil/atoms';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllMessages, getUserById, sendMessage } from 'actions/chatActions';
import { useEffect, useState } from 'react';
import { Spinner } from '@material-tailwind/react';
import { createBrowserSupabaseClient } from 'utils/supabase/clients';

export default function ChatScreen({}) {
  const selectedUserId = useRecoilValue(selectedUserIdState);
  const selectedUserIndex = useRecoilValue(selectedUserIndexState);

  const [message, setMessage] = useState('');

  const presence = useRecoilValue(presenceState)

  const supabase = createBrowserSupabaseClient();

  const selectedUserQuery = useQuery({
    queryKey: ['user', selectedUserId],
    queryFn: () => getUserById(selectedUserId),
  });

  const sendMessageMutation = useMutation({
    mutationFn: async () => {
      return sendMessage({
        message,
        chatUserId: selectedUserId,
      });
    },
    onSuccess: () => {
      setMessage('');
      getAllMessageQuery.refetch();
    },
  });

  const getAllMessageQuery = useQuery({
    queryKey: ['messages', selectedUserId],
    queryFn: () => getAllMessages({ chatUserId: selectedUserId }),
  });

  useEffect(() => {
    const channel = supabase
      .channel('message_postgres_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'message',
        },
        (payload) => {
          if (payload.eventType === 'INSERT' && !payload.errors) {
            getAllMessageQuery.refetch();
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return selectedUserQuery.data !== null ? (
    <div className="flex h-screen w-full flex-col">
      {/* Active 유저 영역 */}
      <Person
        index={selectedUserIndex}
        isActive={false}
        name={selectedUserQuery.data?.email?.split('@')?.[0]}
        onChatScreen={true}
        onlineAt={presence?.[selectedUserId]?.[0].onlineAt}
        userId={selectedUserQuery.data?.id}
      />
      {/* 채팅 영역 */}
      <div className="flex w-full flex-1 flex-col gap-3 overflow-y-scroll p-4">
        {getAllMessageQuery.data?.map((message) => (
          <Message
            key={message.id}
            message={message.message}
            isFromMe={message.receiver === selectedUserId}
          />
        ))}
      </div>
      {/* 채팅창 영역 */}
      <div className="flex">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border-2 border-light-blue-600 p-3"
          placeholder="메시지를 입력하세요."
        />
        <button
          className="min-w-20 bg-light-blue-600 p-3 text-white"
          color="light-blue"
          onClick={() => sendMessageMutation.mutate()}
        >
          {sendMessageMutation.isPending ? <Spinner /> : <span>전송</span>}
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full"></div>
  );
}
