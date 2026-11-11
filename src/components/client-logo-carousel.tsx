"use client";

import Image from "next/image";

const clients = [
  { name: "Dan Habu", src: "/logos/clients/dan%20habu.png" },
  { name: "JE Mall", src: "/logos/clients/je%20mall.png" },
  { name: "Purple", src: "/logos/clients/purple.png" },
  { name: "Shopinverse", src: "/logos/clients/shopinverse.png" },
  { name: "Tilden", src: "/logos/clients/tilden.png" },
  { name: "Zijela", src: "/logos/clients/zijela.png" },
];

function LogoGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="client-logo-group" aria-hidden={duplicate || undefined}>
      {clients.map((client) => (
        <div key={client.name} className="client-logo-item">
          <Image
            src={client.src}
            alt={duplicate ? "" : client.name}
            fill
            sizes="(max-width: 640px) 144px, 208px"
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export function ClientLogoCarousel() {
  return (
    <section className="section-pad overflow-hidden bg-white">
      <div className="container-shell">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-[-.045em] text-brand sm:text-4xl">
            Trusted by our clients
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
            We value the relationships behind every project and every successful delivery.
          </p>
        </div>
        <div className="client-logo-marquee mt-10" role="region" aria-label="Ratsonbase client logos">
          <div className="client-logo-track">
            <LogoGroup />
            <LogoGroup duplicate />
          </div>
        </div>
      </div>
    </section>
  );
}
