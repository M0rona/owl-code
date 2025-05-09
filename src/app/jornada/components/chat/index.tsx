import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal } from "lucide-react";
import { MensagemEnviada } from "./mensagemEnviada";
import { MensagemRecebida } from "./mensagemRecebida";
import { useEffect, useRef } from "react";

export function ChatJornada() {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    formElement.reset();
  }

  return (
    <section className="size-full max-w-[26rem] bg-card rounded-xl p-6 flex flex-col">
      <h2 className="text-xl font-semibold text-center mb-6">
        Pergunte sobre a trilha 😁
      </h2>

      <div className="space-y-4 overflow-y-auto h-full max-h-[46vh]">
        {Array.from({ length: 10 }).map((_, index) => {
          return index % 2 === 0 ? (
            <MensagemEnviada key={index}>
              Como posso começar esta trilha?
            </MensagemEnviada>
          ) : (
            <MensagemRecebida key={index}>
              Você pode começar pelos fundamentos básicos da linguagem. Vou te
              mostrar o primeiro módulo!
            </MensagemRecebida>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      <form className="mt-6 flex gap-4 items-center" onSubmit={handleSubmit}>
        <Textarea
          className="h-18 resize-none"
          placeholder="Digite sua pergunta..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
        />
        <Button className="rounded-full size-12">
          <SendHorizonal />
        </Button>
      </form>
    </section>
  );
}
