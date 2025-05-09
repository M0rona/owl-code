import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal } from "lucide-react";
import { MensagemEnviada } from "./mensagemEnviada";
import { MensagemRecebida } from "./mensagemRecebida";

export function ChatJornada() {
  return (
    <section className="h-full w-full max-w-[26rem] bg-card rounded-xl p-6 flex flex-col">
      <h2 className="text-xl font-semibold text-center mb-6">
        Pergunte sobre a trilha 😁
      </h2>

      <div className="space-y-4 overflow-y-auto h-full max-h-[45vh]">
        <MensagemEnviada>Como posso começar esta trilha?</MensagemEnviada>

        <MensagemRecebida>
          Você pode começar pelos fundamentos básicos da linguagem. Vou te
          mostrar o primeiro módulo!
        </MensagemRecebida>
        <MensagemEnviada>Como posso começar esta trilha?</MensagemEnviada>

        <MensagemRecebida>
          Você pode começar pelos fundamentos básicos da linguagem. Vou te
          mostrar o primeiro módulo!
        </MensagemRecebida>
        <MensagemEnviada>Como posso começar esta trilha?</MensagemEnviada>

        <MensagemRecebida>
          Você pode começar pelos fundamentos básicos da linguagem. Vou te
          mostrar o primeiro módulo!
        </MensagemRecebida>
        <MensagemEnviada>Como posso começar esta trilha?</MensagemEnviada>

        <MensagemRecebida>
          Você pode começar pelos fundamentos básicos da linguagem. Vou te
          mostrar o primeiro módulo!
        </MensagemRecebida>
        <MensagemEnviada>Como posso começar esta trilha?</MensagemEnviada>

        <MensagemRecebida>
          Você pode começar pelos fundamentos básicos da linguagem. Vou te
          mostrar o primeiro módulo!
        </MensagemRecebida>
        <MensagemEnviada>Como posso começar esta trilha?</MensagemEnviada>

        <MensagemRecebida>
          Você pode começar pelos fundamentos básicos da linguagem. Vou te
          mostrar o primeiro módulo!
        </MensagemRecebida>
        <MensagemEnviada>Como posso começar esta trilha?</MensagemEnviada>

        <MensagemRecebida>
          Você pode começar pelos fundamentos básicos da linguagem. Vou te
          mostrar o primeiro módulo!
        </MensagemRecebida>
        <MensagemEnviada>Como posso começar esta trilha?</MensagemEnviada>

        <MensagemRecebida>
          Você pode começar pelos fundamentos básicos da linguagem. Vou te
          mostrar o primeiro módulo!
        </MensagemRecebida>
        <MensagemEnviada>Como posso começar esta trilha?</MensagemEnviada>

        <MensagemRecebida>
          Você pode começar pelos fundamentos básicos da linguagem. Vou te
          mostrar o primeiro módulo!
        </MensagemRecebida>
        <MensagemEnviada>Como posso começar esta trilha?</MensagemEnviada>

        <MensagemRecebida>
          Você pode começar pelos fundamentos básicos da linguagem. Vou te
          mostrar o primeiro módulo!
        </MensagemRecebida>
        <MensagemEnviada>Como posso começar esta trilha?</MensagemEnviada>

        <MensagemRecebida>
          Você pode começar pelos fundamentos básicos da linguagem. Vou te
          mostrar o primeiro módulo!
        </MensagemRecebida>
        <MensagemEnviada>Como posso começar esta trilha?</MensagemEnviada>

        <MensagemRecebida>
          Você pode começar pelos fundamentos básicos da linguagem. Vou te
          mostrar o primeiro módulo!
        </MensagemRecebida>
      </div>

      <div className="mt-6 flex gap-4 items-center">
        <Textarea
          className="h-18 resize-none"
          placeholder="Digite sua pergunta..."
        />
        <Button className="rounded-full size-12">
          <SendHorizonal />
        </Button>
      </div>
    </section>
  );
}
