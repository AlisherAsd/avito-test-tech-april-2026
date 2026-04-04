import type { AppDispatch } from "@/app/store";
import {
  selectAiChat,
  selectAiChatLoading,
  selectAiDescriptionLoading,
  selectAiPriceLoading,
} from "@/entities/ai/model/aiSelectors";
import { pushMessage } from "@/entities/ai/model/aiSlice";
import { fetchGenerateAnswer } from "@/entities/ai/model/aiThunk";
import type { Message } from "@/entities/ai/types";
import { Button, Input } from "@mui/material";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AIChat() {
  const chat = useSelector(selectAiChat);
  const loadingDescription = useSelector(selectAiDescriptionLoading);
  const loadingPrice = useSelector(selectAiPriceLoading);
  const loadingChat = useSelector(selectAiChatLoading);
  const dispatch = useDispatch<AppDispatch>();

  const [message, setMessage] = useState("");

  const isLoading = useMemo(
    () => loadingDescription || loadingPrice || loadingChat,
    [loadingDescription, loadingPrice, loadingChat]
  );

  function handleSendMessage() {
    dispatch(pushMessage({ message, from: "user" }));
    dispatch(fetchGenerateAnswer({ text: message }));
    setMessage("");
  }

  return (
    <div className="full-w flex-1 max-w-100 flex flex-col justify-center items-center border-l border-l-[#F0F0F0]">
      <h2 className="text-2xl font-medium leading-tight tracking-tight">Чат с AI</h2>
      <div className="w-full flex flex-col gap-2 h-[calc(100vh-250px)] overflow-y-auto mt-5">
        {chat.length > 0 ? (
          chat.map((item: Message) => {
            return (
              <div
                className={`flex w-full ${item.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="p-3 border rounded-xl w-full max-w-[70%]">{item.message}</div>
              </div>
            );
          })
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            Сообщений пока нет :(
          </div>
        )}
      </div>
      {isLoading && (
        <div className="flex flex-col items-center">
          <div className="w-7 h-7 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">AI генерирует ответ...</p>
        </div>
      )}
      <div className="flex w-full gap-5 justify-center items-end">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-4"
          placeholder="Введите сообщение"
        />
        <Button
          disabled={isLoading || !message.trim()}
          size="small"
          onClick={handleSendMessage}
          variant="outlined"
        >
          Отправить
        </Button>
      </div>
    </div>
  );
}
